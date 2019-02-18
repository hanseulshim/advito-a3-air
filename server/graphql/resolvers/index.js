const { projectResolvers } = require('./projectResolvers');
const { clientResolvers } = require('./clientResolvers');

exports.resolvers = {
  Query: {
    ...projectResolvers,
    ...clientResolvers
  }
};
