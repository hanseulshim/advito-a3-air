import gql from 'graphql-tag';

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
      shortName: $shortname
      description: $description
      initializationType: $initializationType
      initializationProjectId: $initializationProjectId
      initializationScenarioId: $initializationScenarioId
    )
  }
`;
