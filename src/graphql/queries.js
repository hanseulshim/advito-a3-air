import gql from 'graphql-tag';

export const GET_CLIENTS = gql`
  {
    clientList {
      id
      name
    }
  }
`;

export const GET_PROJECTS = gql`
  query projectList($clientId: Int) {
    projectList(clientId: $clientId) {
      id
      clientId
      clientName
      name
      description
      division
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
      progress
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

export const GET_PROJECT = gql`
  {
    project @client {
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
      progress
      favorite
    }
  }
`;
