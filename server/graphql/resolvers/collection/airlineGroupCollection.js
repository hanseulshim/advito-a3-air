const { ApolloError } = require('apollo-server-lambda');
const {
  airlineGroupAirlineList,
  airlineGroupCollectionList
} = require('../../../data/collection');

exports.airlineGroupCollection = {
  Query: {
    airlineGroupCollectionList: () =>
      airlineGroupCollectionList.filter(collection => !collection.isDeleted),
    airlineGroupAirlineList: () => airlineGroupAirlineList
  },
  Mutation: {
    editAirlineGroupCollection: (_, { id, name, description }) => {
      const airGroupCollection = airlineGroupCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!airGroupCollection) {
        throw new ApolloError('Airline Group Collection not found', 400);
      }
      airGroupCollection.name = name;
      airGroupCollection.description = description;
      airGroupCollection.dateUpdated = new Date();
      return airGroupCollection;
    },
    deleteAirlineGroupCollection: (_, { id }) => {
      const airGroupCollection = airlineGroupCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!airGroupCollection) {
        throw new ApolloError('Airline Group Collection not found', 400);
      }
      airGroupCollection.isDeleted = true;
      if (airGroupCollection.active) {
        const advitoStandard = airlineGroupCollectionList.filter(
          collection => collection.id === 1
        )[0];
        advitoStandard.active = true;
        airGroupCollection.active = false;
      }
      airGroupCollection.dateUpdated = new Date();
      return id;
    },
    addAirlineGroup: (
      _,
      { id, name, effectiveStartDate, effectiveEndDate, airlineList }
    ) => {
      const airlineGroupCollection = airlineGroupCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!airlineGroupCollection) {
        throw new ApolloError('Airline Group Collection not found', 400);
      }
      const maxId =
        Math.max(
          ...airlineGroupCollection.airlineGroupList.map(group => group.id)
        ) + 1;
      const airlineListCopy = airlineList.map(airline => {
        const name = airlineGroupAirlineList.filter(
          air => air.id === airline.id
        )[0].name;
        return {
          ...airline,
          name
        };
      });
      const airline = {
        id: maxId,
        name,
        effectiveStartDate: new Date(effectiveStartDate),
        effectiveEndDate: new Date(effectiveEndDate),
        airlineList: airlineListCopy
      };
      airlineGroupCollection.airlineGroupList.push(airline);
      return airlineGroupCollection;
    },
    editAirlineGroup: (
      _,
      {
        id,
        collectionId,
        name,
        effectiveStartDate,
        effectiveEndDate,
        airlineList
      }
    ) => {
      const airlineGroupCollection = airlineGroupCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!airlineGroupCollection) {
        throw new ApolloError('Airline Group Collection not found', 400);
      }
      const airlineGroup = airlineGroupCollection.airlineGroupList.filter(
        airline => airline.id === id
      )[0];
      if (!airlineGroup) {
        throw new ApolloError('Airline Group not found', 400);
      }
      airlineGroup.name = name;
      airlineGroup.effectiveStartDate = effectiveStartDate;
      airlineGroup.effectiveEndDate = effectiveEndDate;
      airlineGroup.airlineList = airlineList.map(airline => {
        const air = airlineGroupAirlineList.filter(
          line => line.id === airline.id
        )[0];
        return {
          ...airline,
          name: air.name
        };
      });
      return airlineGroupCollection;
    },
    deleteAirlineGroup: (_, { id, collectionId }) => {
      const airlineGroupCollection = airlineGroupCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!airlineGroupCollection) {
        throw new ApolloError('Airline Group Collection not found', 400);
      }
      const index = airlineGroupCollection.airlineGroupList.findIndex(
        group => group.id === id
      );
      if (index === -1) {
        throw new ApolloError('Airline Group not found', 400);
      }
      airlineGroupCollection.airlineGroupList.splice(index, 1);
      return airlineGroupCollection;
    }
  }
};
