import gql from 'graphql-tag';

export const UPDATE_CLIENT = gql`
  mutation updateClient($client: Client) {
    updateClient(client: $client) @client
  }
`;
