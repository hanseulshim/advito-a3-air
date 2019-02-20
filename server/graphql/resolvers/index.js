const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { projectResolvers } = require('./projectResolvers');
const { clientResolvers } = require('./clientResolvers');

exports.resolvers = {
  Query: {
    ...projectResolvers,
    ...clientResolvers
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
