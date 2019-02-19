import gql from 'graphql-tag';

export const GET_CLIENTS = gql`
  query getClients($clientId: Int!, $sessionToken: String!) {
    getClients(clientId: $clientId, sessionToken: $sessionToken) {
      id
      name
    }
  }
`;
