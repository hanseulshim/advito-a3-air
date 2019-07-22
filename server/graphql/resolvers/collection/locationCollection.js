const { ApolloError } = require('apollo-server-lambda');
const {
  locationCollectionList,
  preferredAirlineCollectionList
} = require('../../../data');

exports.locationCollection = {
  Query: {
    locationCollectionList: async (_, __, { db }) =>
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
        .andWhere('p.id', 17)
        .orderBy('l.isstandard', 'desc'),
    preferredAirlineCollectionList: () => preferredAirlineCollectionList
  },
  Mutation: {
    createLocationCollection: (_, { id, name, description }) => {
      const locationCollection = locationCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!locationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      const checkNames = locationCollectionList.some(
        collection => collection.name === name
      );
      if (checkNames) {
        throw new ApolloError(
          'A duplicate collection name already exists. Please input a unique collection name.',
          400
        );
      }
      const maxId =
        Math.max(...locationCollectionList.map(collection => collection.id)) +
        1;
      locationCollectionList.forEach(collection => {
        collection.active = false;
      });
      const newLocationCollection = {
        ...locationCollection,
        id: maxId,
        name,
        description,
        active: true,
        dateUpdated: new Date()
      };
      locationCollectionList.push(newLocationCollection);
      return newLocationCollection;
    },
    editLocationCollection: (_, { id, name, description }) => {
      const locationCollection = locationCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!locationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      const checkNames = locationCollectionList.some(
        collection => collection.name === name && collection.id !== id
      );
      if (checkNames) {
        throw new ApolloError(
          'A duplicate collection name already exists. Please input a unique collection name.',
          400
        );
      }
      locationCollection.name = name;
      locationCollection.description = description;
      locationCollection.dateUpdated = new Date();
      return locationCollection;
    },
    deleteLocationCollection: (_, { id }) => {
      const locationCollection = locationCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!locationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      locationCollection.isDeleted = true;
      if (locationCollection.active) {
        const advitoStandard = locationCollectionList.filter(
          collection => collection.id === 1
        )[0];
        advitoStandard.active = true;
        locationCollection.active = false;
      }
      locationCollection.dateUpdated = new Date();
      return id;
    },
    toggleLocationCollection: (_, { id }) => {
      const locationCollection = locationCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!locationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      if (locationCollection.active && locationCollection.id !== 1) {
        const advitoStandard = locationCollectionList.filter(
          collection => collection.id === 1
        )[0];
        advitoStandard.active = true;
        locationCollection.active = false;
      } else {
        locationCollectionList.forEach(collection => {
          collection.active = false;
        });
        locationCollection.active = true;
      }
      locationCollection.dateUpdated = new Date();
      return locationCollectionList;
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
