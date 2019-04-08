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
      const checkNames = preferredAirlineCollectionList.some(
        collection => collection.name === name && collection.id !== id
      );
      if (checkNames) {
        throw new ApolloError(
          'A duplicate collection name already exists. Please input a unique collection name.',
          400
        );
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
    togglePreferredAirlineCollection: (_, { id }) => {
      const preferredAirlineCollection = preferredAirlineCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!preferredAirlineCollection) {
        throw new ApolloError('Preferred Airline Collection not found', 400);
      }
      if (
        preferredAirlineCollection.active &&
        preferredAirlineCollection.id !== 1
      ) {
        const advitoStandard = preferredAirlineCollectionList.filter(
          collection => collection.id === 1
        )[0];
        advitoStandard.active = true;
        preferredAirlineCollection.active = false;
      } else {
        preferredAirlineCollectionList.forEach(collection => {
          collection.active = false;
        });
        preferredAirlineCollection.active = true;
      }
      return preferredAirlineCollectionList;
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
          effectiveStartDate: airline.effectiveStartDate,
          effectiveEndDate: airline.effectiveEndDate
            ? airline.effectiveEndDate
            : new Date('31 DEC 9999'),
          active: true
        });
      });
      return preferredAirlineCollection;
    },
    editPreferredAirline: (_, { id, airlineList }) => {
      const preferredAirlineCollection = preferredAirlineCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!preferredAirlineCollection) {
        throw new ApolloError('Preferred Airline Collection not found', 400);
      }
      preferredAirlineCollection.dateUpdated = new Date();
      const { posList, preferenceLevelList } = preferredAirlineInfo;
      const airlineListCopy = airlineList.map(airline => {
        const airlineCopyArray = preferredAirlineCollection.airlineList.filter(
          air => air.id === airline.id
        );
        const airlineCopy = airlineCopyArray.length
          ? airlineCopyArray[0]
          : null;
        const name = airlineGroupAirlineList.filter(
          air => air.id === airline.id
        )[0].name;
        const pos = posList.filter(p => p.id === airline.posId)[0].name;
        const preferenceLevel = preferenceLevelList.filter(
          p => p.id === airline.preferenceLevelId
        )[0].name;
        return airlineCopy
          ? {
              ...airlineCopy,
              name,
              pos,
              preferenceLevel,
              effectiveStartDate: airline.effectiveStartDate,
              effectiveEndDate: airline.effectiveEndDate
                ? airline.effectiveEndDate
                : new Date('31 DEC 9999')
            }
          : {
              id: airline.id,
              name,
              pos,
              preferenceLevel,
              active: true,
              effectiveStartDate: airline.effectiveStartDate,
              effectiveEndDate: airline.effectiveEndDate
                ? airline.effectiveEndDate
                : new Date('31 DEC 9999')
            };
      });
      preferredAirlineCollection.airlineList = airlineListCopy;
      return preferredAirlineCollection;
    },
    deletePreferredAirline: (_, { id, collectionId }) => {
      const preferredAirlineCollection = preferredAirlineCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!preferredAirlineCollection) {
        throw new ApolloError('Preferred Airline Collection not found', 400);
      }
      const index = preferredAirlineCollection.airlineList.findIndex(
        group => group.id === id
      );
      if (index === -1) {
        throw new ApolloError('Airline Group not found', 400);
      }
      preferredAirlineCollection.airlineList.splice(index, 1);
      return preferredAirlineCollection;
    }
  }
};
