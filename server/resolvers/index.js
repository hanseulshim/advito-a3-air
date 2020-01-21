import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import merge from 'lodash/merge';
import { project } from './project';
import { client } from './client';
import { collection } from './collection';
import { dataSet } from './dataSet';
import { library } from './library';
import { contract } from './contract';
import { user } from './user';
import { process } from './process';
import { scenario } from './scenario';
import moment from 'moment';

export const resolvers = {
  ...merge(
    project,
    client,
    collection,
    dataSet,
    library,
    contract,
    user,
    process,
    scenario
  ),
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return moment.utc(value);
    },
    serialize(value) {
      console.log(moment.utc(value).format());
      return moment.utc(value).valueOf();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    }
  })
};
