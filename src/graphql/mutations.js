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
      message
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation editProject(
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
      message
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: Int!) {
    deleteProject(id: $id) {
      message
    }
  }
`;

export const TOGGLE_FAVORITE_PROJECT = gql`
  mutation toggleFavoriteProject($id: Int!) {
    toggleFavoriteProject(id: $id) {
      message
    }
  }
`;
