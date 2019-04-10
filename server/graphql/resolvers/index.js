const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const merge = require('lodash.merge');
const { projectResolvers } = require('./project');
const { clientResolvers } = require('./client');
const { collectionResolvers } = require('./collection');
const { dataSetResolvers } = require('./dataSet');
const { libraryResolvers } = require('./library');
const { contractResolvers } = require('./contract');

exports.resolvers = {
  ...merge(
    projectResolvers,
    clientResolvers,
    collectionResolvers,
    dataSetResolvers,
    libraryResolvers,
    contractResolvers
  ),
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
