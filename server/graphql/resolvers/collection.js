const { ApolloError } = require('apollo-server-lambda');
const {
  locationCollectionList,
  travelSectorCollectionList,
  airlineGroupCollectionList,
  preferredAirlineCollectionList
} = require('../../data/collection');

exports.collectionResolvers = {
  Query: {
    locationCollectionList: () =>
      locationCollectionList.filter(collection => !collection.isDeleted),
    travelSectorCollectionList: () => travelSectorCollectionList,
    airlineGroupCollectionList: () => airlineGroupCollectionList,
    preferredAirlineCollectionList: () => preferredAirlineCollectionList
  },
  Mutation: {
    createLocationCollection: (_, { id, name, description }) => {
      const maxId =
        Math.max(...locationCollectionList.map(collection => collection.id)) +
        1;
      const copyLocationCollection = locationCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!copyLocationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      locationCollectionList.forEach(collection => {
        collection.active = false;
      });
      const newLocationCollection = {
        ...copyLocationCollection,
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
    addRegion: (_, { id, name }) => {
      const locationCollection = locationCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!locationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      const region = {
        name,
        countryList: []
      };
      locationCollection.regionList.push(region);
      return locationCollection;
    },
    deleteRegion: (_, { id, name }) => {
      const locationCollection = locationCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!locationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      const index = locationCollection.regionList.findIndex(
        region => region.name === name
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
    moveCountries: (_, { id, destination, origin }) => {
      const locationCollection = locationCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!locationCollection) {
        throw new ApolloError('Location Collection not found', 400);
      }
      const regionList = locationCollection.regionList;
      const destinationRegion = regionList.filter(
        region => region.name === destination
      )[0];
      origin.forEach(originRegion => {
        const foundRegion = regionList.filter(
          region => region.name === originRegion.name
        )[0];
        originRegion.countryList.forEach(country => {
          const index = foundRegion.countryList.indexOf(country);
          foundRegion.countryList.splice(index, 1);
          destinationRegion.countryList.push(country);
        });
      });
      return locationCollection;
    }
  }
};
