exports.dataSet = {
  queries: {
    name: 'Data Set Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    {
      dataSetList {
        id
        ticketingTo
        ticketingFrom
        uploadDate
        qc
        records
        status
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
