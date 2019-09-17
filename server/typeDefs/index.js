import { gql } from 'apollo-server-lambda';
import { project } from './project';
import { client } from './client';
import { collection } from './collection';
import { dataSet } from './dataSet';
import { library } from './library';
import { contract } from './contract';
import { user } from './user';
import { rule } from './rule';
import { process } from './process';
import { scenario } from './scenario';

export const typeDefs = gql`
  scalar Date
  directive @auth on FIELD_DEFINITION
  ${project}
  ${client}
  ${collection}
  ${dataSet}
  ${library}
  ${contract}
  ${user}
  ${process}
  ${rule}
  ${scenario}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
