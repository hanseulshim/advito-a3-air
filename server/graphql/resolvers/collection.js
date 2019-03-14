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
    }
  }
};
