exports.travelSectorCollection = {
  name: 'Travel Sector Collection Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'advitoValidToken' },
  query: `
    mutation {
      createTravelSectorCollection(id: 1, name: "Collection 1", description: "description") {
        id
        name
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
        description
        dateUpdated
        active
      }
      editTravelSectorCollection(id: 2, name: "Updated Collection", description: "new description") {
        id
        name
        description
        dateUpdated
      }
      deleteLocationCollection(id: 2)
    }
    `
};
