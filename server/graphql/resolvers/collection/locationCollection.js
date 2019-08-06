const { LOCATION_LOOKUP } = require('../../constants');

exports.locationCollection = {
  Query: {
    locationCollectionList: async (
      _,
      { clientId = null, projectId = null },
      { db }
    ) =>
      await db('location as l')
        .select({
          id: 'id',
          name: 'name',
          description: 'description',
          dateUpdated: 'created',
          regionCount: db.raw(
            `(SELECT COUNT(*) FROM location WHERE geosetid = l.id AND isdeleted = FALSE AND locationtype = ${
              LOCATION_LOOKUP.REGION
            })`
          ),
          standard: 'isstandard',
          active: db.raw(
            `COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = l.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 1) = 1, FALSE)`
          )
        })
        .where('isdeleted', false)
        .andWhere(function() {
          this.where('clientid', clientId).orWhere('isstandard', true);
        })
        .andWhere('locationtype', LOCATION_LOOKUP.COLLECTION)
        .orderBy('isstandard', 'desc'),
    locationCollection: async (_, { id, projectId = null }, { db }) =>
      await getLocationCollection(db, id, projectId),
    regionList: async (_, { geoSetId = null }, { db }) => {
      const regionList = await db('location')
        .select({
          id: 'id',
          code: 'code',
          name: 'name',
          standard: 'isstandard'
        })
        .where('isdeleted', false)
        .andWhere('locationtype', LOCATION_LOOKUP.REGION)
        .andWhere('geosetid', geoSetId);
      const countryRequests = regionList.map(async region => {
        const countryList = await db('locationmapping as l1')
          .select({
            id: 'l2.id',
            code: 'l2.code',
            name: 'l2.name'
          })
          .leftJoin('location as l2', 'l1.childid', 'l2.id')
          .where('l1.parentid', region.id)
          .orderBy('code');
        region.countryList = countryList;
      });
      await Promise.all(countryRequests);
      return regionList;
    }
  },
  Mutation: {
    copyLocationCollection: async (
      _,
      { clientId, projectId, id, name, description },
      { db }
    ) => {
      const { rows } = await db.raw(
        `SELECT location_collection_copy(
          ${clientId},
          ${projectId},
          ${id},
          '${name}',
          ${description ? `'${description}'` : null}
        )`
      );
      const [{ location_collection_copy: newId }] = rows;
      return newId;
    },
    editLocationCollection: async (
      _,
      { projectId, id, name, description },
      { db }
    ) => {
      await db.raw(
        `SELECT location_collection_update(
          ${id},
          '${name}',
          ${description ? `'${description}'` : null}
        )`
      );
      return await getLocationCollection(db, id, projectId);
    },
    deleteLocationCollection: async (_, { id, projectId }, { db }) => {
      await db.raw(`SELECT location_collection_delete(${id}, ${projectId})`);
    },
    toggleLocationCollection: async (_, { id, projectId }, { db }) => {
      await db.raw(`SELECT location_collection_toggle(${id}, ${projectId})`);
    },
    addRegion: async (_, { geoSetId, name, code }, { db }) => {
      await db.raw(
        `SELECT region_create(
          ${geoSetId},
          '${name}',
          '${code}'
        )`
      );
    },
    deleteRegion: async (_, { id }, { db }) => {
      await db.raw(`SELECT region_delete(${id})`);
      return id;
    },
    moveCountries: async (_, { geoSetId, regionId, countryList }, { db }) => {
      const queries = countryList.map(childId =>
        db.raw(`
        SELECT region_move_country(${geoSetId}, ${childId}, ${regionId})
      `)
      );
      await Promise.all(queries);
    }
  }
};

const getLocationCollection = async (db, id, projectId) => {
  const [locationCollection] = await db('location as l')
    .select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'created',
      regionCount: db.raw(
        `(SELECT COUNT(*) FROM location WHERE geosetid = l.id AND isdeleted = FALSE AND locationtype = ${
          LOCATION_LOOKUP.REGION
        })`
      ),
      standard: 'isstandard',
      active: db.raw(
        `COALESCE((SELECT COUNT(*) FROM projectdataref as p WHERE p.datarefid = l.id AND p.projectid = ${projectId} AND status = 1 AND datareftype = 1) = 1, FALSE)`
      )
    })
    .where('id', id);
  return locationCollection;
};
