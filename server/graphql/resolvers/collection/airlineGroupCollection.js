const { ApolloError } = require('apollo-server-lambda');
const {
  airlineGroupAirlineList,
  airlineGroupCollectionList
} = require('../../../data/collection');

exports.airlineGroupCollection = {
  Query: {
    airlineGroupCollectionList: () =>
      airlineGroupCollectionList.filter(collection => !collection.isDeleted),
    airlineList: () => airlineGroupAirlineList
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
      console.log(effectiveStartDate, effectiveEndDate, airlineList);
      const airline = {
        id: maxId,
        name,
        effectiveStartDate: new Date(effectiveStartDate),
        effectiveEndDate: new Date(effectiveEndDate),
        airlineList: airlineListCopy
      };
      airlineGroupCollection.airlineGroupList.push(airline);
      return airlineGroupCollection;
    }
    // editTravelSector: (
    //   _,
    //   { id, collectionId, name, shortName, geographyList }
    // ) => {
    //   const travelSectorCollection = airlineGroupCollectionList.filter(
    //     collection => collection.id === collectionId
    //   )[0];
    //   if (!travelSectorCollection) {
    //     throw new ApolloError('Airline Group Collection not found', 400);
    //   }
    //   const travelSector = travelSectorCollection.sectorList.filter(
    //     sector => sector.id === id
    //   )[0];
    //   if (!travelSector) {
    //     throw new ApolloError('Travel Sector not found', 400);
    //   }
    //   travelSector.name = name;
    //   travelSector.shortName = shortName;
    //   travelSector.geographyList = geographyList.map(geography => {
    //     const origin = travelSectorRegionList.filter(
    //       region => region.id === geography.origin
    //     )[0];
    //     const destination = travelSectorRegionList.filter(
    //       region => region.id === geography.destination
    //     )[0];
    //     return {
    //       ...geography,
    //       origin,
    //       destination
    //     };
    //   });
    //   return travelSectorCollection;
    // },
    // deleteTravelSector: (_, { id, collectionId }) => {
    //   const travelSectorCollection = airlineGroupCollectionList.filter(
    //     collection => collection.id === collectionId
    //   )[0];
    //   if (!travelSectorCollection) {
    //     throw new ApolloError('Airline Group Collection not found', 400);
    //   }
    //   const index = travelSectorCollection.sectorList.findIndex(
    //     sector => sector.id === id
    //   );
    //   if (index === -1) {
    //     throw new ApolloError('Travel Sector not found', 400);
    //   }
    //   travelSectorCollection.sectorList.splice(index, 1);
    //   return travelSectorCollection;
    // }
  }
};
