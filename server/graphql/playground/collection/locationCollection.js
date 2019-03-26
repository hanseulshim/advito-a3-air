exports.locationCollection = {
  name: 'Location Collection Mutations',
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
      addRegion(id: 1, name: "Region", code: "RE") {
        id
        regionList {
          id
          name
          code
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
};
