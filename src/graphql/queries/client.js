import gql from 'graphql-tag';

export const GET_CLIENTS = gql`
  {
    clientList {
      id
      name
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
