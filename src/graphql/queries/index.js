import gql from 'graphql-tag';
export * from './client';
export * from './collection';
export * from './project';

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
