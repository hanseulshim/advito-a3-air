import { CONTRACT } from '../../constants';

export default {
  queries: {
    name: 'Contract Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      contractList {
        ${CONTRACT}
      }
      contract(id: 134) {
        ${CONTRACT}
      }
      contractTypeList {
        id
        name
      }
      divisionTypeList {
        id
        name
      }
      userList {
        id
        name
        email
      }
    }`
  },
  mutations: {
    name: 'Contract Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      createContract(name: "test", typeId: 2, round: 5, effectiveFrom: 2534032400000, effectiveTo: null, description: "description", divisionId: 2) {
        ${CONTRACT}
      }
      copyContract(id: 1, name: "copy contract") {
        ${CONTRACT}
      }
      editContract(id: 1, name: "Test 1 - edit", typeId: 2, round: 5, effectiveFrom: 2534032400000, effectiveTo: null, description: "description", divisionId: 2) {
        ${CONTRACT}
      }
    }
    `
  }
};
