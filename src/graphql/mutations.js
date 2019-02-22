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
    $clientId: Int!
    $division: String!
    $projectTypeId: Int!
    $savingsTypeId: Int!
    $effectiveFrom: Date!
    $effectiveTo: Date!
    $description: String
    $projectManagerId: Int!
    $leadAnalystId: Int!
    $dataSpecialistId: Int!
  ) {
    addProject(
      sessionToken: $sessionToken
      clientId: $clientId
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

export const EDIT_PROJECT = gql`
  mutation editProject(
    $sessionToken: String!
    $id: Int!
    $division: String!
    $savingsTypeId: Int!
    $effectiveFrom: Date!
    $effectiveTo: Date!
    $description: String
    $projectManagerId: Int!
    $leadAnalystId: Int!
    $dataSpecialistId: Int!
  ) {
    editProject(
      sessionToken: $sessionToken
      id: $id
      division: $division
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

export const DELETE_PROJECT = gql`
  mutation deleteProject($sessionToken: String!, $id: Int!) {
    deleteProject(sessionToken: $sessionToken, id: $id) {
      success
      message
    }
  }
`;

export const TOGGLE_FAVORITE_PROJECT = gql`
  mutation toggleFavoriteProject($sessionToken: String!, $id: Int!) {
    toggleFavoriteProject(sessionToken: $sessionToken, id: $id) {
      success
      message
    }
  }
`;
