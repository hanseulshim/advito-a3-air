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
      projectManagerName
      projectManagerEmail
      leadAnalystId
      leadAnalystName
      leadAnalystEmail
      dataSpecialistId
      dataSpecialistName
      dataSpecialistEmail
      favorite
    }
  }
`;

export const GET_USER = gql`
  {
    user @client {
      name
      email
      clientId
      sessionToken
    }
  }
`;

export const GET_CLIENT = gql`
  {
    client @client {
      id
      name
    }
  }
`;
