const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { projectResolvers, projectMutations } = require('./project');
const { clientResolvers } = require('./client');

exports.resolvers = {
  Query: {
    ...projectResolvers,
    ...clientResolvers
  },
  Mutation: {
    ...projectMutations
  },
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
