const { ApolloServer, AuthenticationError } = require('apollo-server-lambda');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
const { authenticateUser } = require('./graphql/auth');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ event }) => {
    const sessionToken = event.headers.sessiontoken || '';
    const user = await authenticateUser(sessionToken);
    if (!user) throw new AuthenticationError('you must be logged in ');
    return { sessionToken, user };
  }
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
});
