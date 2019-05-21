const { ApolloServer } = require('apollo-server-lambda');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
const requireAuthDirective = require('./graphql/directives');
const { playground } = require('./graphql/playground');
const { authenticateUser } = require('./graphql/helper');

require('dotenv').config();
const db = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.AIR_DB_DATABASE
  }
});
const advitoDb = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.ADVITO_DB_DATABASE
  }
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ event }) => {
    const sessionToken = event.headers.sessiontoken || '';
    const user = await authenticateUser(sessionToken, advitoDb);
    return { user, db };
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
