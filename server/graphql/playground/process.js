exports.process = {
  queries: {
    name: 'Process Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
  {
    process {
      contracts
      dataSets
      records
      processing
      processStartDate
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
  },
  mutations: {
    name: 'Process Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    mutation {
      startProcess {
        contracts
        dataSets
        records
        processing
        processStartDate
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
      stopProcess {
        contracts
        dataSets
        records
        processing
        processStartDate
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
    }
    `
  }
};
