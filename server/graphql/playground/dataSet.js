exports.dataSet = {
  queries: {
    name: 'Data Set Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    {
      dataSetCountryList {
        id
        name
        ticketsTotal
        segmentsTotal
        farePaidTotal
        importedTicketsTotal
        errorTicketsTotal
        errorRatioTotal
      }
      dataSetDivisionList {
        id
        name
        ticketsTotal
        segmentsTotal
        farePaidTotal
      }
      dataSetColumnList {
        id
        name
        dateUpdated
        status
        posTrendList {
          id
          countryId
          name
          tickets
          segments
          farePaid
        }
        divisionTrendList {
          id
          divisionId
          name
          tickets
          segments
          farePaid
        }
        importErrorsList {
          id
          countryId
          name
          importedTickets
          errorTickets
          errorRatio
        }
      }
    }`
  },
  mutations: {
    name: 'Data Set Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    mutation {
      toggleDataSet(id: 1) {
        id
        name
        dateUpdated
        status
        posTrendList {
          id
          countryId
          name
          tickets
          segments
          farePaid
        }
        divisionTrendList {
          id
          divisionId
          name
          tickets
          segments
          farePaid
        }
        importErrorsList {
          id
          countryId
          name
          importedTickets
          errorTickets
          errorRatio
        }
      }
      deleteDataSet(id: 1)
    }
    `
  }
};
