import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    user {
      id
      name
      email
    }
  }
`;

export const GET_USER_LIST = gql`
  query userList($clientId: Int) {
    userList(clientId: $clientId) {
      id
      name
      email
    }
  }
`;

export const GET_PROJECT_MANAGER_LIST = gql`
  query projectManagerList($clientId: Int) {
    projectManagerList(clientId: $clientId) {
      id
      name
      email
    }
  }
`;

export const GET_LEAD_ANALYST_LIST = gql`
  query leadAnalystList($clientId: Int) {
    leadAnalystList(clientId: $clientId) {
      id
      name
      email
    }
  }
`;

export const GET_DATA_SPECIALIST_LIST = gql`
  query dataSpecialistList($clientId: Int) {
    dataSpecialistList(clientId: $clientId) {
      id
      name
      email
    }
  }
`;
