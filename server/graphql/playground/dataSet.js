const { DATA_SET } = require('../constants');
exports.dataSet = {
  queries: {
    name: 'Data Set Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
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
        ${DATA_SET}
      }
    }`
  },
  mutations: {
    name: 'Data Set Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      toggleDataSet(id: 1) {
        ${DATA_SET}
      }
      deleteDataSet(id: 1)
    }
    `
  }
};
