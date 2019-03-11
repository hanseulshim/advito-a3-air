const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { projectResolvers } = require('./project');
const { clientResolvers } = require('./client');
const { collectionResolvers } = require('./collection');

exports.resolvers = {
  ...projectResolvers,
  ...clientResolvers,
  ...collectionResolvers,
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
