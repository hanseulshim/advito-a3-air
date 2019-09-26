import { PROCESS } from '../constants';

export default {
  queries: {
    name: 'Process Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
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
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
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
