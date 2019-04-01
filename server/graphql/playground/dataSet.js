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
      divisionTrendsList {
        id
        name
        ticketsTotal
        segmentsTotal
        farePaidTotal
      }
      divisionTrendsColumnList {
        id
        name
        dateUpdated
        status
        data {
          id
          divisionId
          name
          tickets
          segments
          farePaid
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
      toggleDivisionTrend(id: 1) {
        id
        name
        dateUpdated
        status
        data {
          id
          divisionId
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
