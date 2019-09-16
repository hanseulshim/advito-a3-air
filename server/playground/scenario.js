import { SCENARIO } from '../constants';
export default {
  name: 'Scenario  Queries',
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
  }`
};
