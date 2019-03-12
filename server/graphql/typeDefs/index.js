const { gql } = require('apollo-server-lambda');
const { projectDefs } = require('./project');
const { clientDefs } = require('./client');
const { collectionDefs } = require('./collection');
const { dataSetDefs } = require('./dataSet');

exports.typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  ${projectDefs}
  ${clientDefs}
  ${collectionDefs}
  ${dataSetDefs}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
