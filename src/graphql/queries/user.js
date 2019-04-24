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
