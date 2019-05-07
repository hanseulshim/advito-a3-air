const { PROCESS } = require('../constants');

exports.process = {
  queries: {
    name: 'Process Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
  {
    process {
      ${PROCESS}
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
        ${PROCESS}
      }
      stopProcess {
        ${PROCESS}
      }
    }
    `
  }
};
