import gql from 'graphql-tag';

export const GET_CLIENTS = gql`
  query clientList($clientId: Int!, $sessionToken: String!) {
    clientList(clientId: $clientId, sessionToken: $sessionToken) {
      id
      name
    }
  }
`;

export const GET_PROJECTS = gql`
  query projectList($clientId: Int!, $sessionToken: String!) {
    projectList(clientId: $clientId, sessionToken: $sessionToken) {
      id
      clientId
      clientName
      name
      description
      isDeleted
      projectTypeId
      projectType
      savingsTypeId
      savingsType
      effectiveFrom
      effectiveTo
      projectManagerId
      projectManager
      leadAnalystId
      leadAnalyst
      dataSpecialistId
      dataSpecialistString
      favorite
    }
  }
`;
