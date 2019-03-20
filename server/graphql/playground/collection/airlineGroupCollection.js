exports.airlineGroupCollection = {
  name: 'Airline Group Collection Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'advitoValidToken' },
  query: `
    mutation {
      editAirlineGroupCollection(id: 2, name: "Updated Collection", description: "new description") {
        id
        name
        description
        dateUpdated
      }
      deleteAirlineGroupCollection(id: 2)
    }
    `
};
