import gql from 'graphql-tag';

export const UPDATE_CLIENT = gql`
  mutation updateClient($id: Int!, $name: String!) {
    updateClient(id: $id, name: $name) @client
  }
`;
