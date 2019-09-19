import gql from 'graphql-tag';
import { SCENARIO } from '../constants';

export const CREATE_SCENARIO = gql`
  mutation createScenario(
    $projectId: Int!
    $name: String!
    $shortName: String!
    $description: String
    $initializationType: Int!
    $initializationProjectId: Int
    $initializationScenarioId: Int
  ) {
    createScenario(
      projectId: $projectId
      name: $name
      shortName: $shortName
      description: $description
      initializationType: $initializationType
      initializationProjectId: $initializationProjectId
      initializationScenarioId: $initializationScenarioId
    ){
        ${SCENARIO}
    }
  }
`;

export const UPDATE_SCENARIO = gql`
  mutation updateScenario(
    $id: Int!
    $name: String!
    $shortName: String!
    $description: String
  ) {
    updateScenario(
      id: $id
      name: $name
      shortName: $shortName
      description: $description
    ){
    ${SCENARIO}
    }
  }
`;

export const DELETE_SCENARIO = gql`
  mutation deleteScenario($id: Int!) {
    deleteScenario(id: $id)
  }
`;
