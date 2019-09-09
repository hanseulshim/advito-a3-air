export const locationCollection = {
  name: 'Location Collection Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'MY^PR3TTYP0NY' },
  query: `
    mutation {
      copyLocationCollection(clientId: 43, projectId: 17, id: 1, name: "Collection 1", description: "Collection 1 description")
      editLocationCollection(id: 2, name: "Updated Collection", description: "new description") {
        id
        name
        description
        dateUpdated
      }
      deleteLocationCollection(id: 2)
      addRegion(geoSetId: 124271, name: "Region", code: "RE")
      deleteRegion(id: 1)
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
