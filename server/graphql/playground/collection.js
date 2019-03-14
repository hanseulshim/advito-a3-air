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
            origin
            destination
            exclude
          }
        }
      }
      airlineGroupCollectionList {
        id
        name
        description
        dateUpdated
        active
        airlineGroupList {
          id
          name
          effectiveStartDate
          effectiveEndDate
          airlineList {
            name
            effectiveStartDate
            effectiveEndDate
          }
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
          cabins
          pos
          active
        }
      }
    }`
  },
  mutations: {
    name: 'Collection Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    mutation {
      createLocationCollection(id: 1, name: "Collection 1", description: "Collection 1 description") {
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
      editLocationCollection(id: 2, name: "Updated Collection", description: "new description") {
        id
        name
        description
        dateUpdated
      }
      deleteLocationCollection(id: 2)
      addRegion(id: 1, name: "Region") {
        id
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
      deleteRegion(id: 1, collectionId: 1) {
        id
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
      moveCountries(collectionId: 1, id: 1, countryList: [
        {
          id: 1
          regionId: 2
          name: "French Southern Territories"
        }
      ]) {
        id
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
    }
    `
  }
};
