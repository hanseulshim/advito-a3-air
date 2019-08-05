const { ApolloError } = require('apollo-server-lambda');
const {
  travelSectorCollectionList,
  travelSectorRegionList
} = require('../../../data');

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
            .leftJoin('location as l2', 's.fromlocation', 'l2.id')
            .where('s.travelsectorid', travelSector.id);
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
    addTravelSector: (_, { id, name, shortName, geographyList }) => {
      const travelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!travelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      const maxId =
        Math.max(
          ...travelSectorCollection.sectorList.map(sector => sector.id)
        ) + 1;
      const geographyListCopy = geographyList.map(geography => {
        const origin = travelSectorRegionList.filter(
          region => region.id === geography.origin
        )[0];
        const destination = travelSectorRegionList.filter(
          region => region.id === geography.destination
        )[0];
        return {
          ...geography,
          origin,
          destination
        };
      });
      const sector = {
        id: maxId,
        name,
        shortName,
        geographyList: geographyListCopy
      };
      travelSectorCollection.sectorList.push(sector);
      return travelSectorCollection;
    },
    editTravelSector: (
      _,
      { id, collectionId, name, shortName, geographyList }
    ) => {
      const travelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!travelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      const travelSector = travelSectorCollection.sectorList.filter(
        sector => sector.id === id
      )[0];
      if (!travelSector) {
        throw new ApolloError('Travel Sector not found', 400);
      }
      travelSector.name = name;
      travelSector.shortName = shortName;
      travelSector.geographyList = geographyList.map(geography => {
        const origin = travelSectorRegionList.filter(
          region => region.id === geography.origin
        )[0];
        const destination = travelSectorRegionList.filter(
          region => region.id === geography.destination
        )[0];
        return {
          ...geography,
          origin,
          destination
        };
      });
      return travelSectorCollection;
    },
    deleteTravelSector: (_, { id, collectionId }) => {
      const travelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!travelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      const index = travelSectorCollection.sectorList.findIndex(
        sector => sector.id === id
      );
      if (index === -1) {
        throw new ApolloError('Travel Sector not found', 400);
      }
      travelSectorCollection.sectorList.splice(index, 1);
      return travelSectorCollection;
    },
    deleteBidirection: (_, { id, collectionId, index }) => {
      const travelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!travelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      const travelSector = travelSectorCollection.sectorList.filter(
        sector => sector.id === id
      )[0];
      if (!travelSector) {
        throw new ApolloError('Travel Sector not found', 400);
      }
      travelSector.geographyList.splice(index, 1);
      return travelSectorCollection;
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
