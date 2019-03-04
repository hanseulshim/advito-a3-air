const { gql } = require('apollo-server-lambda');
const { projectDefs, projectQuery, projectMutation } = require('./project');
const { clientDefs, clientQuery } = require('./client');

exports.typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  ${projectDefs}
  ${clientDefs}
  type Query {
    ${projectQuery}
    ${clientQuery}
  }
  type Mutation {
    ${projectMutation}
  }
`;
