import gql from 'graphql-tag';

export const GET_CLIENTS = gql`
  {
    clientList {
      id
      name
      gcn
    }
  }
`;

export const GET_CLIENT = gql`
  {
    client @client {
      id
      name
      gcn
    }
  }
`;
