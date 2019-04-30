exports.process = {
  name: 'Process Queries',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'advitoValidToken' },
  query: `
  {
    process {
      contracts
      dataSets
      records
      recentProcessList {
        date
        contracts
        dataSets
        records
        processDuration
        status
        processedBy
      }
    }
  }`
};
