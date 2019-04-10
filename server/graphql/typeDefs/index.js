const { gql } = require('apollo-server-lambda');
const { projectDefs } = require('./project');
const { clientDefs } = require('./client');
const { collectionDefs } = require('./collection');
const { dataSetDefs } = require('./dataSet');
const { libraryDefs } = require('./library');
const { contractDefs } = require('./contract');

exports.typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  ${projectDefs}
  ${clientDefs}
  ${collectionDefs}
  ${dataSetDefs}
  ${libraryDefs}
  ${contractDefs}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
