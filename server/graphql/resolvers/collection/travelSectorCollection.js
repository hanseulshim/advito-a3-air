const { ApolloError } = require('apollo-server-lambda');
const {
  travelSectorCollectionList,
  travelSectorRegionList
} = require('../../../data/collection');

exports.travelSectorCollection = {
  Query: {
    travelSectorCollectionList: () =>
      travelSectorCollectionList.filter(collection => !collection.isDeleted),
    travelSectorRegionList: () => travelSectorRegionList
  },
  Mutation: {
    createTravelSectorCollection: (_, { id, name, description }) => {
      const maxId =
        Math.max(
          ...travelSectorCollectionList.map(collection => collection.id)
        ) + 1;
      const copyTravelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!copyTravelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      travelSectorCollectionList.forEach(collection => {
        collection.active = false;
      });
      const newTravelSectorCollection = {
        ...copyTravelSectorCollection,
        id: maxId,
        name,
        description,
        active: true,
        dateUpdated: new Date()
      };
      travelSectorCollectionList.push(newTravelSectorCollection);
      return newTravelSectorCollection;
    },
    editTravelSectorCollection: (_, { id, name, description }) => {
      const travelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!travelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      travelSectorCollection.name = name;
      travelSectorCollection.description = description;
      travelSectorCollection.dateUpdated = new Date();
      return travelSectorCollection;
    },
    deleteTravelSectorCollection: (_, { id }) => {
      const travelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!travelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      travelSectorCollection.isDeleted = true;
      if (travelSectorCollection.active) {
        const advitoStandard = travelSectorCollectionList.filter(
          collection => collection.id === 1
        )[0];
        advitoStandard.active = true;
        travelSectorCollection.active = false;
      }
      travelSectorCollection.dateUpdated = new Date();
      return id;
    },
    addTravelSector: (_, { id, name, shortName, geographyList }) => {
      const travelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!travelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      const maxId =
        Math.max(
          ...travelSectorCollection.sectorList.map(sector => sector.id)
        ) + 1;
      const geographyListCopy = geographyList.map(geography => {
        const origin = travelSectorRegionList.filter(
          region => region.id === geography.origin
        )[0];
        const destination = travelSectorRegionList.filter(
          region => region.id === geography.destination
        )[0];
        return {
          ...geography,
          origin,
          destination
        };
      });
      const sector = {
        id: maxId,
        name,
        shortName,
        geographyList: geographyListCopy
      };
      travelSectorCollection.sectorList.push(sector);
      return travelSectorCollection;
    }
    //   deleteRegion: (_, { id, collectionId }) => {
    //     const locationCollection = travelSectorCollectionList.filter(
    //       collection => collection.id === collectionId
    //     )[0];
    //     if (!locationCollection) {
    //       throw new ApolloError('Travel Sector Collection not found', 400);
    //     }
    //     const index = locationCollection.regionList.findIndex(
    //       region => region.id === id
    //     );
    //     if (index === -1) {
    //       throw new ApolloError('Region not found', 400);
    //     }
    //     const countryList = locationCollection.regionList[index].countryList;
    //     if (countryList.length !== 0) {
    //       throw new ApolloError('Cannot delete region', 400);
    //     }
    //     locationCollection.regionList.splice(index, 1);
    //     return locationCollection;
    //   },
    //   moveCountries: (_, { collectionId, id, countryList }) => {
    //     const locationCollection = travelSectorCollectionList.filter(
    //       collection => collection.id === collectionId
    //     )[0];
    //     if (!locationCollection) {
    //       throw new ApolloError('Travel Sector Collection not found', 400);
    //     }
    //     const regionList = locationCollection.regionList;
    //     const destinationRegion = regionList.filter(
    //       region => region.id === id
    //     )[0];
    //     countryList.forEach(country => {
    //       const originRegion = regionList.filter(
    //         region => region.id === country.regionId
    //       )[0];
    //       destinationRegion.countryList.push(country);
    //       const index = originRegion.countryList.findIndex(
    //         c => c.id === country.id
    //       );
    //       originRegion.countryList.splice(index, 1);
    //     });
    //     return locationCollection;
    //   }
  }
};
