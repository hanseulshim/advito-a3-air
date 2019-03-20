const { ApolloError } = require('apollo-server-lambda');
const { airlineGroupCollectionList } = require('../../../data/collection');

exports.airlineGroupCollection = {
  Query: {
    airlineGroupCollectionList: () =>
      airlineGroupCollectionList.filter(collection => !collection.isDeleted)
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
    }
    // addTravelSector: (_, { id, name, shortName, geographyList }) => {
    //   const travelSectorCollection = airlineGroupCollectionList.filter(
    //     collection => collection.id === id
    //   )[0];
    //   if (!travelSectorCollection) {
    //     throw new ApolloError('Airline Group Collection not found', 400);
    //   }
    //   const maxId =
    //     Math.max(
    //       ...travelSectorCollection.sectorList.map(sector => sector.id)
    //     ) + 1;
    //   const geographyListCopy = geographyList.map(geography => {
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
    //   const sector = {
    //     id: maxId,
    //     name,
    //     shortName,
    //     geographyList: geographyListCopy
    //   };
    //   travelSectorCollection.sectorList.push(sector);
    //   return travelSectorCollection;
    // },
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
