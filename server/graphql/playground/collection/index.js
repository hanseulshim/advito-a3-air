const { locationCollection } = require('./locationCollection');
const { travelSectorCollection } = require('./travelSectorCollection');
const { airlineGroupCollection } = require('./airlineGroupCollection');
const { preferredAirlineCollection } = require('./preferredAirlineCollection');
exports.collection = {
  queries: {
    name: 'Collection Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    {
      locationCollectionList {
        id
        name
        description
        dateUpdated
        active
        regionList {
          id
          name
          countryList {
            id
            regionId
            name
          }
        }
      }
      travelSectorCollectionList {
        id
        name
        description
        dateUpdated
        active
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
      }
      travelSectorRegionList {
        id
        name
      }
      airlineGroupCollectionList {
        id
        name
        description
        dateUpdated
        effectiveStartDate
        effectiveEndDate
        active
        airlineGroupList {
          id
          name
          effectiveStartDate
          effectiveEndDate
          airlineList {
            id
            name
            effectiveStartDate
            effectiveEndDate
          }
        }
      }
      airlineGroupAirlineList {
        id
        name
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
      preferredAirlineInfo {
        posList {
          id
          name
        }
        preferenceLevelList {
          id
          name
        }
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
