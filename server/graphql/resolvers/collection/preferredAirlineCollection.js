const { ApolloError } = require('apollo-server-lambda');
const {
  preferredAirlineCollectionList,
  preferredAirlineInfo,
  airlineGroupAirlineList
} = require('../../../data/collection');

exports.preferredAirlineCollection = {
  Query: {
    preferredAirlineCollectionList: () =>
      preferredAirlineCollectionList.filter(
        collection => !collection.isDeleted
      ),
    preferredAirlineInfo: () => preferredAirlineInfo
  },
  Mutation: {
    editPreferredAirlineCollection: (_, { id, name, description }) => {
      const preferredAirlineCollection = preferredAirlineCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!preferredAirlineCollection) {
        throw new ApolloError('Preferred Airline Collection not found', 400);
      }
      preferredAirlineCollection.name = name;
      preferredAirlineCollection.description = description;
      preferredAirlineCollection.dateUpdated = new Date();
      return preferredAirlineCollection;
    },
    deletePreferredAirlineCollection: (_, { id }) => {
      const preferredAirlineCollection = preferredAirlineCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!preferredAirlineCollection) {
        throw new ApolloError('Preferred Airline Collection not found', 400);
      }
      preferredAirlineCollection.isDeleted = true;
      preferredAirlineCollection.dateUpdated = new Date();
      return id;
    },
    addPreferredAirline: (_, { id, airlineList }) => {
      const preferredAirlineCollection = preferredAirlineCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!preferredAirlineCollection) {
        throw new ApolloError('Preferred Airline Collection not found', 400);
      }
      preferredAirlineCollection.dateUpdated = new Date();
      const { posList, preferenceLevelList } = preferredAirlineInfo;
      airlineList.forEach(airline => {
        const maxId =
          Math.max(
            ...preferredAirlineCollection.airlineList.map(airline => airline.id)
          ) + 1;
        const name = airlineGroupAirlineList.filter(
          air => air.id === airline.id
        )[0].name;
        const pos = posList.filter(p => p.id === airline.posId)[0].name;
        const preferenceLevel = preferenceLevelList.filter(
          p => p.id === airline.preferenceLevelId
        )[0].name;
        preferredAirlineCollection.airlineList.push({
          id: maxId,
          name,
          pos,
          preferenceLevel,
          effectiveStartDate: null,
          effectiveEndDate: null,
          active: true
        });
      });
      return preferredAirlineCollection;
    }
    // editAirlineGroup: (
    //   _,
    //   {
    //     id,
    //     collectionId,
    //     name,
    //     effectiveStartDate,
    //     effectiveEndDate,
    //     airlineList
    //   }
    // ) => {
    //   const airlineGroupCollection = preferredAirlineCollectionList.filter(
    //     collection => collection.id === collectionId
    //   )[0];
    //   if (!airlineGroupCollection) {
    //     throw new ApolloError('Preferred Airline Collection not found', 400);
    //   }
    //   const airlineGroup = airlineGroupCollection.airlineGroupList.filter(
    //     airline => airline.id === id
    //   )[0];
    //   if (!airlineGroup) {
    //     throw new ApolloError('Airline Group not found', 400);
    //   }
    //   airlineGroup.name = name;
    //   airlineGroup.effectiveStartDate = effectiveStartDate;
    //   airlineGroup.effectiveEndDate = effectiveEndDate;
    //   airlineGroup.airlineList = airlineList.map(airline => {
    //     const air = airlineGroupAirlineList.filter(
    //       line => line.id === airline.id
    //     )[0];
    //     return {
    //       ...airline,
    //       name: air.name
    //     };
    //   });
    //   return airlineGroupCollection;
    // },
    // deleteAirlineGroup: (_, { id, collectionId }) => {
    //   const airlineGroupCollection = preferredAirlineCollectionList.filter(
    //     collection => collection.id === collectionId
    //   )[0];
    //   if (!airlineGroupCollection) {
    //     throw new ApolloError('Preferred Airline Collection not found', 400);
    //   }
    //   const index = airlineGroupCollection.airlineGroupList.findIndex(
    //     group => group.id === id
    //   );
    //   if (index === -1) {
    //     throw new ApolloError('Airline Group not found', 400);
    //   }
    //   airlineGroupCollection.airlineGroupList.splice(index, 1);
    //   return airlineGroupCollection;
    // }
  }
};
