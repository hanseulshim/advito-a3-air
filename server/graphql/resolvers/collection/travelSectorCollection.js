exports.travelSectorCollection = {
  Query: {
    travelSectorCollectionList: async (
      _,
      { clientId = null, projectId = null },
      { db }
    ) =>
      await db('sectorgroup as s')
        .select({
          id: 'id',
          name: 'name',
          description: 'description',
          dateUpdated: 'updated',
          sectorCount: db.raw(
            `(SELECT COUNT(*) FROM travelsector WHERE groupid = s.id AND isdeleted = FALSE)`
          ),
          standard: 'isstandard',
          active: db.raw(
            `COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = s.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 2) = 1, FALSE)`
          )
        })
        .where('isdeleted', false)
        .andWhere(function() {
          this.where('clientid', clientId).orWhere('isstandard', true);
        })
        .orderBy('isstandard', 'desc'),
    travelSectorCollection: async (_, { id, projectId = null }, { db }) =>
      await getTravelSectorCollection(db, id, projectId),
    travelSectorList: async (_, { groupId }, { db }) => {
      const travelSectorList = await db('travelsector')
        .select({
          id: 'id',
          name: 'name',
          shortName: 'shortname',
          standard: 'isstandard'
        })
        .where('isdeleted', false)
        .andWhere('groupid', groupId);
      const sectorGeographyRequests = travelSectorList.map(
        async travelSector => {
          const sectorGeographyList = await db('sectorgeography as s')
            .select({
              id: 's.id',
              originId: 's.fromlocation',
              originName: 'l1.name',
              destinationId: 's.tolocation',
              destinationName: 'l2.name',
              exclude: 's.excluded'
            })
            .leftJoin('location as l1', 's.fromlocation', 'l1.id')
            .leftJoin('location as l2', 's.tolocation', 'l2.id')
            .where('s.travelsectorid', travelSector.id)
            .andWhere('s.isdeleted', false);
          travelSector.sectorGeographyList = sectorGeographyList;
        }
      );
      await Promise.all(sectorGeographyRequests);
      return travelSectorList;
    }
  },
  Mutation: {
    copyTravelSectorCollection: async (
      _,
      { clientId, projectId, id, name, description },
      { db }
    ) => {
      const { rows } = await db.raw(
        `SELECT travel_sector_collection_copy(
          ${clientId},
          ${projectId},
          ${id},
          '${name}',
          ${description ? `'${description}'` : null}
        )`
      );
      const [{ travel_sector_collection_copy: newId }] = rows;
      return newId;
    },
    editTravelSectorCollection: async (
      _,
      { projectId, id, name, description },
      { db }
    ) => {
      await db.raw(
        `SELECT travel_sector_collection_update(
          ${id},
          '${name}',
          ${description ? `'${description}'` : null}
        )`
      );
      return await getTravelSectorCollection(db, id, projectId);
    },
    deleteTravelSectorCollection: async (_, { id, projectId }, { db }) => {
      await db.raw(
        `SELECT travel_sector_collection_delete(${id}, ${projectId})`
      );
    },
    toggleTravelSectorCollection: async (_, { id, projectId }, { db }) => {
      await db.raw(
        `SELECT travel_sector_collection_toggle(${id}, ${projectId})`
      );
    },
    addTravelSector: async (
      _,
      { projectId, groupId, name, shortName, geographyList },
      { db }
    ) => {
      const { rows } = await db.raw(
        `SELECT travel_sector_create(${groupId}, '${name}', '${shortName}')`
      );
      const [{ travel_sector_create: newId }] = rows;
      const sectorGeographyRequests = geographyList.map(
        ({ origin, destination, exclude }) =>
          db.raw(
            `SELECT sector_geography_create(${newId}, ${origin}, ${destination}, ${exclude})`
          )
      );
      await Promise.all(sectorGeographyRequests);
      return await getTravelSectorCollection(db, newId, projectId);
    },
    editTravelSector: async (
      _,
      { sectorId, name, shortName, geographyList },
      { db }
    ) => {
      await db.raw(
        `SELECT travel_sector_update(${sectorId}, '${name}', '${shortName}')`
      );
      const sectorGeographyRequests = geographyList.map(
        ({ id, origin, destination, exclude }) =>
          db.raw(
            `SELECT sector_geography_update(${sectorId}, ${id}, ${origin}, ${destination}, ${exclude})`
          )
      );
      await Promise.all(sectorGeographyRequests);
    },
    deleteTravelSector: async (_, { id }, { db }) => {
      await db.raw(`SELECT travel_sector_delete(${id})`);
    },
    deleteSectorGeography: async (_, { id }, { db }) => {
      await db.raw(`SELECT sector_geography_delete(${id})`);
    }
  }
};

const getTravelSectorCollection = async (db, id, projectId) => {
  const [travelSectorCollection] = await db('sectorgroup as s')
    .select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'updated',
      sectorCount: db.raw(
        `(SELECT COUNT(*) FROM travelsector WHERE groupid = s.id AND isdeleted = FALSE)`
      ),
      standard: 'isstandard',
      active: db.raw(
        `COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = s.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 2) = 1, FALSE)`
      )
    })
    .where('id', id);
  return travelSectorCollection;
};
