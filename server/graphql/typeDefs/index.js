const { gql } = require('apollo-server-lambda');
const { projectDefs, projectQuery } = require('./projectDefs');
const { clientDefs, clientQuery } = require('./clientDefs');

exports.typeDefs = gql`
  ${projectDefs}
  ${clientDefs}
  type Query {
    ${projectQuery}
    ${clientQuery}
  }
`;
