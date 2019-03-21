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
      addAirlineGroup(id: 2, name: "USA", effectiveStartDate: "01 Jan 2018", effectiveEndDate: "01 Jan 2018", airlineList: [
        {
          id: 1,
          effectiveStartDate: "01 Jan 2018",
          effectiveEndDate: "01 Jan 2018"
        }
      ]) {
        id
        name
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
      editAirlineGroup(id: 2, collectionId: 2, name: "USA", effectiveStartDate: "01 Jan 2018", effectiveEndDate: "01 Jan 2018", airlineList: [
        {
          id: 1,
          effectiveStartDate: "01 Jan 2018",
          effectiveEndDate: "01 Jan 2018"
        }
      ]) {
        id
        name
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
      deleteAirlineGroup(id: 1, collectionId: 1) {
        id
        name
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
    }
    `
};
