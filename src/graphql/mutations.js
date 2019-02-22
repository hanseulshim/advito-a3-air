import gql from 'graphql-tag';

export const UPDATE_CLIENT = gql`
  mutation updateClient($client: Client) {
    updateClient(client: $client) @client
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($project: Project) {
    updateProject(project: $project) @client
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject(
    $sessionToken: String!
    $client: String!
    $division: String!
    $projectTypeId: Int!
    $savingsTypeId: Int!
    $effectiveFrom: String!
    $effectiveTo: String!
    $description: String
    $projectManagerId: Int!
    $leadAnalystId: Int!
    $dataSpecialistId: Int!
  ) {
    addProject(
      sessionToken: $sessionToken
      client: $client
      division: $division
      projectTypeId: $projectTypeId
      savingsTypeId: $savingsTypeId
      effectiveFrom: $effectiveFrom
      effectiveTo: $effectiveTo
      description: $description
      projectManagerId: $projectManagerId
      leadAnalystId: $leadAnalystId
      dataSpecialistId: $dataSpecialistId
    ) {
      success
      message
    }
  }
`;
