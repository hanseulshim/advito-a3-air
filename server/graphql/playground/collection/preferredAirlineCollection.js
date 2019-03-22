exports.preferredAirlineCollection = {
  name: 'Preferred Airline Collection Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'advitoValidToken' },
  query: `
    mutation {
      editPreferredAirlineCollection(id: 1, name: "Updated Collection", description: "new description") {
        id
        name
        description
        dateUpdated
      }
      deletePreferredAirlineCollection(id: 1)
      addPreferredAirline(id: 1, airlineList: [
        {
          id: 1,
          posId: 1,
          preferenceLevelId: 1
        }
      ]) {
        id
        name
        description
        dateUpdated
        active
        airlineList {
          id
          name
          preferenceLevel
          effectiveStartDate
          effectiveEndDate
          pos
          active
        }
      }
      editPreferredAirline(id: 1, airlineList: [
        {
          id: 1,
          posId: 1,
          preferenceLevelId: 1
        }
      ]) {
        id
        name
        description
        dateUpdated
        active
        airlineList {
          id
          name
          preferenceLevel
          effectiveStartDate
          effectiveEndDate
          pos
          active
        }
      }
      deletePreferredAirline(id: 1, collectionId: 1) {
        id
        name
        description
        dateUpdated
        active
        airlineList {
          id
          name
          preferenceLevel
          effectiveStartDate
          effectiveEndDate
          pos
          active
        }
      }
    }
    `
};
