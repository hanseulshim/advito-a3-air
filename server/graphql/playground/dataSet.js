exports.dataSet = {
  queries: {
    name: 'Data Set Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    {
      posTrendList {
        id
        name
        ticketsTotal
        segmentsTotal
        farePaidTotal
        columns {
          id
          name
          tickets
          segments
          farePaid
          dateUpdated
          status
        }
      }
      divisionTrendList {
        id
        name
        ticketsTotal
        segmentsTotal
        farePaidTotal
        columns {
          id
          name
          tickets
          segments
          farePaid
          dateUpdated
          status
        }
      }
      importErrorList {
        id
        name
        importedTicketsTotal
        errorTicketsTotal
        errorRatioTotal
        columns {
          id
          name
          importedTickets
          errorTickets
          errorRatio
          dateUpdated
          status
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
      acceptDataSet(id: 52933) {
        id
        status
      }
      rejectDataSet(id: 52933) {
        id
        status
      }
    }
    `
  }
};
