exports.dataSet = {
  queries: {
    name: 'Data Set Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    {
      posTrendsCountryList {
        id
        name
        ticketsTotal
        segmentsTotal
        farePaidTotal
      }
      posTrendsColumnList {
        id
        name
        dateUpdated
        status
        data {
          id
          countryId
          name
          tickets
          segments
          farePaid
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
      togglePosTrend(id: 1) {
        id
        name
        dateUpdated
        status
        data {
          id
          countryId
          name
          tickets
          segments
          farePaid
        }
      }
    }
    `
  }
};
