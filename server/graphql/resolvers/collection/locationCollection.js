const { ApolloError } = require('apollo-server-lambda');
const { locationCollectionList } = require('../../../data');

exports.locationCollection = {
  Query: {
    locationCollectionList: async (_, { projectId = null }, { db }) =>
      await db('location as l')
        .select({
          id: 'l.id',
          name: 'l.name',
          description: 'l.description',
          dateUpdated: 'l.created',
          regionCount: 0,
          active: 'l.isactive'
        })
        .innerJoin('projectdataref as pd', 'l.geosetid', 'pd.datarefid')
        .innerJoin('project as p', 'pd.projectid', 'p.id')
        .where('l.isdeleted', false)
        .andWhere('p.id', projectId)
        .orderBy('l.isstandard', 'desc')
  },
  Mutation: {
    copyLocationCollection: async (
      _,
      { projectId, id, name, description },
      { db }
    ) => {
      await db.raw(
        `SELECT location_collection_copy(
          ${projectId},
          ${id},
          '${name}',
          ${description ? `'${description}'` : null}
        )`
      );
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
    addRegion: (_, { id, name, code }) => {
      const locationCollection = locationCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!locationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      const checkNames = locationCollection.regionList.some(
        region => region.name === name || region.code === code
      );
      if (checkNames) {
        throw new ApolloError(
          'Region name/code already exists. Please input a unique region name/code.',
          400
        );
      }
      const maxId =
        Math.max(...locationCollection.regionList.map(region => region.id)) + 1;
      const region = {
        id: maxId,
        name,
        code,
        countryList: []
      };
      locationCollection.regionList.push(region);
      return locationCollection;
    },
    deleteRegion: (_, { id, collectionId }) => {
      const locationCollection = locationCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!locationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      const index = locationCollection.regionList.findIndex(
        region => region.id === id
      );
      if (index === -1) {
        throw new ApolloError('Region not found', 400);
      }
      const countryList = locationCollection.regionList[index].countryList;
      if (countryList.length !== 0) {
        throw new ApolloError('Cannot delete region', 400);
      }
      locationCollection.regionList.splice(index, 1);
      return locationCollection;
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
  const [locationCollection] = await db('location')
    .select({
      id: 'id',
      name: 'name',
      description: 'description',
      dateUpdated: 'created',
      regionCount: 0,
      active: 'isactive'
    })
    .where('id', id);
  return locationCollection;
};
