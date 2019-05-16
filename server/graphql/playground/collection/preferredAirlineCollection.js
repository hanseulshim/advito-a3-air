exports.preferredAirlineCollection = {
  name: 'Preferred Airline Collection Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'MY^PR3TTYP0NY' },
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
          id: 104557,
          posIdList: [1, 2, 3, 4],
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
          id: 104557,
          posIdList: [2, 3],
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
