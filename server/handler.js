const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
const requireAuthDirective = require('./graphql/directives');
const { playground } = require('./graphql/playground');
const {
  AuthenticationService,
  ContractService
} = require('./graphql/services');
const { knex, blopsKnex } = require('./db/knexApi');

// Creates services which will be passed into the context
const services = {
  contractService: new ContractService(knex)
};

// Creates authorization service
const authenticationService = new AuthenticationService(blopsKnex);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ event }) => {
    const sessionToken = event.headers.sessiontoken || '';
    const user = await authenticationService.authenticate(sessionToken);
    return { sessionToken, user, services };
  },
  schemaDirectives: {
    auth: requireAuthDirective
  },
  playground
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
});
