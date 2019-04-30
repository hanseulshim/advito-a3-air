const { gql } = require('apollo-server-lambda');
const { project } = require('./project');
const { client } = require('./client');
const { collection } = require('./collection');
const { dataSet } = require('./dataSet');
const { library } = require('./library');
const { contract } = require('./contract');
const { user } = require('./user');
const { process } = require('./process');

exports.typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  ${project}
  ${client}
  ${collection}
  ${dataSet}
  ${library}
  ${contract}
  ${user}
  ${process}
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
