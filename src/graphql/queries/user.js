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
  {
    userList {
      id
      name
      email
    }
  }
`;

export const GET_PROJECT_MANAGER_LIST = gql`
  {
    projectManagerList {
      id
      name
      email
    }
  }
`;

export const GET_LEAD_ANALYST_LIST = gql`
  {
    leadAnalystList {
      id
      name
      email
    }
  }
`;

export const GET_DATA_SPECIALIST_LIST = gql`
  {
    dataSpecialistList {
      id
      name
      email
    }
  }
`;
