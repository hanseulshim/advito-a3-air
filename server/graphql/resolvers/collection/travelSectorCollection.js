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
    toggleTravelSectorCollection: (_, { id }) => {
      const travelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === id
      )[0];
      if (!travelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      if (travelSectorCollection.active && travelSectorCollection.id !== 1) {
        const advitoStandard = travelSectorCollectionList.filter(
          collection => collection.id === 1
        )[0];
        advitoStandard.active = true;
        travelSectorCollection.active = false;
      } else {
        travelSectorCollectionList.forEach(collection => {
          collection.active = false;
        });
        travelSectorCollection.active = true;
      }
      travelSectorCollection.dateUpdated = new Date();
      return travelSectorCollectionList;
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
    },
    editTravelSector: (
      _,
      { id, collectionId, name, shortName, geographyList }
    ) => {
      const travelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!travelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      const travelSector = travelSectorCollection.sectorList.filter(
        sector => sector.id === id
      )[0];
      if (!travelSector) {
        throw new ApolloError('Travel Sector not found', 400);
      }
      travelSector.name = name;
      travelSector.shortName = shortName;
      travelSector.geographyList = geographyList.map(geography => {
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
      return travelSectorCollection;
    },
    deleteTravelSector: (_, { id, collectionId }) => {
      const travelSectorCollection = travelSectorCollectionList.filter(
        collection => collection.id === collectionId
      )[0];
      if (!travelSectorCollection) {
        throw new ApolloError('Travel Sector Collection not found', 400);
      }
      const index = travelSectorCollection.sectorList.findIndex(
        sector => sector.id === id
      );
      if (index === -1) {
        throw new ApolloError('Travel Sector not found', 400);
      }
      travelSectorCollection.sectorList.splice(index, 1);
      return travelSectorCollection;
    }
  }
};
