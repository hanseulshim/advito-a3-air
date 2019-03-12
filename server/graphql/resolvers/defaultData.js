const { ApolloError } = require('apollo-server-lambda');
const { dataSetList } = require('../../data/defaultData');

exports.defaultDataResolvers = {
  Query: {
    dataSetList: () => dataSetList
  },
  Mutation: {
    acceptDataSet: (_, { id }) => {
      const dataSet = dataSetList.filter(dataSet => dataSet.id === id)[0];
      if (!dataSet) {
        throw new ApolloError('Project not found', 400);
      }
      dataSet.status = 'accept';
      return dataSet;
    },
    rejectDataSet: (_, { id }) => {
      const dataSet = dataSetList.filter(dataSet => dataSet.id === id)[0];
      if (!dataSet) {
        throw new ApolloError('Project not found', 400);
      }
      dataSet.status = 'reject';
      return dataSet;
    }
  }
};
