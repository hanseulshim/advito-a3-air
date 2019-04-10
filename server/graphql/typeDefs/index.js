const { gql } = require('apollo-server-lambda');
const { project } = require('./project');
const { client } = require('./client');
const { collection } = require('./collection');
const { dataSet } = require('./dataSet');
const { library } = require('./library');

exports.typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  ${project}
  ${client}
  ${collection}
  ${dataSet}
  ${library}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
