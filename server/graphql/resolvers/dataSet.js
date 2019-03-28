const { dataSet } = require('../../data/dataSet');

exports.dataSetResolvers = {
  Query: {
    posTrendList: () => dataSet.posTrends,
    divisionTrendList: () => dataSet.divisionTrends,
    importErrorList: () => dataSet.importErrors
  }
  // Mutation: {
  //   acceptDataSet: (_, { id }) => {
  //     const dataSet = dataSetList.filter(dataSet => dataSet.id === id)[0];
  //     if (!dataSet) {
  //       throw new ApolloError('Project not found', 400);
  //     }
  //     dataSet.status = 'accept';
  //     return dataSet;
  //   },
  //   rejectDataSet: (_, { id }) => {
  //     const dataSet = dataSetList.filter(dataSet => dataSet.id === id)[0];
  //     if (!dataSet) {
  //       throw new ApolloError('Project not found', 400);
  //     }
  //     dataSet.status = 'reject';
  //     return dataSet;
  //   }
  // }
};
