const { ApolloError } = require('apollo-server-lambda');
const {
  dataSetCountryList,
  dataSetDivisionList,
  dataSetColumnList
} = require('../../data');

exports.dataSet = {
  Query: {
    dataSetCountryList: () => dataSetCountryList,
    dataSetDivisionList: () => dataSetDivisionList,
    dataSetColumnList: () => dataSetColumnList.filter(col => !col.isDeleted)
  },
  Mutation: {
    toggleDataSet: (_, { id, status }) => {
      const dataSet = dataSetColumnList.filter(set => set.id === id)[0];
      if (!dataSet) {
        throw new ApolloError('Data Set not found', 400);
      }
      dataSet.status = status;
      return dataSet;
    },
    deleteDataSet: (_, { id }) => {
      const dataSet = dataSetColumnList.filter(set => set.id === id)[0];
      if (!dataSet) {
        throw new ApolloError('Data Set not found', 400);
      }
      dataSet.isDeleted = true;
      return id;
    }
  }
};
