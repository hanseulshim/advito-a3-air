import { SCENARIO } from '../constants';
export default {
  queries: {
    name: 'Scenario Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
  {
    scenarioList(projectId: null) {
      ${SCENARIO}
    }
    scenario(id: null) {
      ${SCENARIO}
    }
    scenarioTypeList {
      id
      name
    }
    scenarioParameters {
      influenceLevelList {
        id
        name
      }
      priceInfluenceLevelList {
        id
        name
      }
      biasOverrideList {
        id
        name
      }
    }
  }`
  },
  mutations: {
    name: 'Scenario Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      createScenario(
        projectId: null
        name: ""
        shortName: ""
        description: ""
        initType: 92
        initScenarioId: null
      ) {
        ${SCENARIO}
      }
    }`
  }
};
