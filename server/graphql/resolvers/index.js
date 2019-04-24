const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const merge = require('lodash.merge');
const { project } = require('./project');
const { client } = require('./client');
const { collection } = require('./collection');
const { dataSet } = require('./dataSet');
const { library } = require('./library');
const { contract } = require('./contract');
const { user } = require('./user');

exports.resolvers = {
  ...merge(project, client, collection, dataSet, library, contract, user),
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return new Date(value).getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    }
  })
};
