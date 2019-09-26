import gql from 'graphql-tag';
import { SCENARIO } from '../constants';

export const GET_SCENARIO_LIST = gql`
  query scenarioList($projectId: Int) {
    scenarioList(projectId: $projectId) {
      ${SCENARIO}
    }
  }
`;

export const GET_SCENARIO = gql`
  query scenario($id: Int!) {
    scenario(id: $id) {
      ${SCENARIO}
    }
  }
`;
export const GET_SCENARIO_TYPE_LIST = gql`
  query scenarioTypeList {
    scenarioTypeList {
      id
      name
    }
  }
`;

export const GET_SCENARIO_CONTRACT_LIST = gql`
  query scenarioContractList($scenarioId: Int!) {
    scenarioContractList(scenarioId: $scenarioId)
  }
`;

export const GET_SCENARIO_PARAMETERS = gql`
  query scenarioParameters {
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
  }
`;
