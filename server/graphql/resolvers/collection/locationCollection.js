const { ApolloError } = require('apollo-server-lambda');
const { locationCollectionList } = require('../../../data');
const { LOCATION_LOOKUP } = require('../../constants');

exports.locationCollection = {
  Query: {
    locationCollectionList: async (_, { projectId = null }, { db }) =>
      await db('location as l')
        .select({
          id: 'id',
          name: 'name',
          description: 'description',
          dateUpdated: 'created',
          regionCount: db.raw(
            `(SELECT COUNT(*) FROM location WHERE geosetid = l.id AND isdeleted = FALSE)`
          ),
          standard: 'isstandard',
          active: 'isactive'
        })
        .where('isdeleted', false)
        .andWhere('projectid', projectId)
        .andWhere('locationtype', LOCATION_LOOKUP.COLLECTION)
        .orderBy('isstandard', 'desc'),
    locationCollection: async (_, { id }, { db }) =>
      await getLocationCollection(db, id),
    regionList: async (_, { geoSetId = null }, { db }) =>
      await db('location')
        .select({
          id: 'id',
          code: 'code',
          name: 'name',
          standard: 'isstandard',
          locationType: 'locationtype'
        })
        .where('isdeleted', false)
        .andWhere('locationtype', LOCATION_LOOKUP.REGION)
        .andWhere('geosetid', geoSetId)
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
    editLocationCollection: async (_, { id, name, description }, { db }) => {
      await db.raw(
        `SELECT location_collection_update(
          ${id},
          '${name}',
          ${description ? `'${description}'` : null}
        )`
      );
      return await getLocationCollection(db, id);
    },
    deleteLocationCollection: async (_, { id }, { db }) => {
      await db.raw(`SELECT location_collection_delete(${id})`);
    },
    toggleLocationCollection: async (_, { id }, { db }) => {
      await db.raw(`SELECT location_collection_toggle(${id})`);
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
    moveCountries: (_, { collectionId, id, countryList }) => {
      const locationCollection = locationCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!locationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      const regionList = locationCollection.regionList;
      const destinationRegion = regionList.filter(
        region => region.id === id
      )[0];
      countryList.forEach(country => {
        const originRegion = regionList.filter(
          region => region.id === country.regionId
        )[0];
        destinationRegion.countryList.push(country);
        const index = originRegion.countryList.findIndex(
          c => c.id === country.id
        );
        originRegion.countryList.splice(index, 1);
      });
      destinationRegion.countryList.sort((a, b) => a.id - b.id);
      return locationCollection;
    }
  }
};

const getLocationCollection = async (db, id) => {
  const [locationCollection] = await db('location as l')
    .select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'created',
      regionCount: db.raw(
        `(SELECT COUNT(*) FROM location WHERE geosetid = l.id AND isdeleted = FALSE)`
      ),
      standard: 'isstandard',
      active: 'isactive'
    })
    .where('id', id);
  return locationCollection;
};
