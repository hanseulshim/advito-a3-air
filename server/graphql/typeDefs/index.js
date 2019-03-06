const { gql } = require('apollo-server-lambda');
const { projectDefs, projectQuery, projectMutation } = require('./project');
const { clientDefs, clientQuery } = require('./client');
const { collectionDefs, collectionQuery } = require('./collection');

exports.typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  ${projectDefs}
  ${clientDefs}
  ${collectionDefs}
  type Query {
    ${projectQuery}
    ${clientQuery}
    ${collectionQuery}
  }
  type Mutation {
    ${projectMutation}
  }
`;
