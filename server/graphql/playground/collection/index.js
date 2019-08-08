const { locationCollection } = require('./locationCollection');
const { travelSectorCollection } = require('./travelSectorCollection');
const { airlineGroupCollection } = require('./airlineGroupCollection');
const { preferredAirlineCollection } = require('./preferredAirlineCollection');
const {
  LOCATION_COLLECTION,
  TRAVEL_SECTOR_COLLECTION,
  AIRLINE_GROUP_COLLECTION
} = require('../../constants');
exports.collection = {
  queries: {
    name: 'Collection Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      locationCollectionList(clientId: 5, projectId: 17) {
        ${LOCATION_COLLECTION}
      }
      regionList(geoSetId: null) {
        id
        code
        name
        standard
      }
      travelSectorCollectionList(clientId: null, projectId: null) {
        ${TRAVEL_SECTOR_COLLECTION}
      }
      travelSectorList(groupId: null) {
        id
        name
        shortName
        standard
        sectorGeographyList {
          id
          originId
          originName
          destinationId
          destinationName
          exclude
        }
      }
      airlineGroupCollectionList(clientId: null, projectId: null) {
        ${AIRLINE_GROUP_COLLECTION}
      }
      airlineGroupList(collectionId: null) {
        id
        name
        effectiveStartDate
        effectiveEndDate
        standard
        airlineGroupMemberList {
          id
          airlineId
          name
          code
          effectiveStartDate
          effectiveEndDate
        }
      }
      preferredAirlineCollectionList {
        id
        name
        description
        dateUpdated
        active
        airlineList {
          name
          preferenceLevel
          effectiveStartDate
          effectiveEndDate
          pos
          active
        }
      }
      posList {
        id
        name
      }
      preferenceLevelList {
        id
        name
      }
    }`
  },
  mutations: [
    locationCollection,
    travelSectorCollection,
    airlineGroupCollection,
    preferredAirlineCollection
  ]
};
