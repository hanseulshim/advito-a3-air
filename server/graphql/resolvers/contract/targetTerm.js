const { ApolloError } = require('apollo-server-lambda');
const {
  targetTermList,
  targetTypeList,
  incentiveTypeList
} = require('../../../data');

exports.targetTerm = {
  Query: {
    targetTermList: () => targetTermList.filter(term => !term.isDeleted),
    targetTypeList: () => targetTypeList,
    incentiveTypeList: () => incentiveTypeList
  }
};
