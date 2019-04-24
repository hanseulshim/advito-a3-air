import gql from 'graphql-tag';
export * from './client';
export * from './collection';
export * from './project';
export * from './dataSet';
export * from './library';
export * from './contract';

export const GET_USER = gql`
  {
    user {
      id
      name
      email
    }
  }
`;
