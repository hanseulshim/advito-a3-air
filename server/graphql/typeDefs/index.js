const { gql } = require('apollo-server-lambda');
const { projectDefs } = require('./project');
const { clientDefs } = require('./client');
const { collectionDefs } = require('./collection');
const { defaultDataDefs } = require('./defaultData');

exports.typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  ${projectDefs}
  ${clientDefs}
  ${collectionDefs}
  ${defaultDataDefs}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
