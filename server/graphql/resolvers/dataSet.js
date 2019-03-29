const { ApolloError } = require('apollo-server-lambda');
const { dataSet } = require('../../data/dataSet');

exports.dataSetResolvers = {
  Query: {
    posTrendsCountryList: () => dataSet.posTrendsCountryList,
    posTrendsColumnList: () => dataSet.posTrendsColumnList,
    divisionTrendList: () => dataSet.divisionTrends,
    importErrorList: () => dataSet.importErrors
  },
  Mutation: {
    togglePosTrend: (_, { id }) => {
      const posTrend = dataSet.posTrendsColumnList.filter(
        trend => trend.id === id
      )[0];
      if (!posTrend) {
        throw new ApolloError('Project not found', 400);
      }
      if (posTrend.status === null || posTrend.status === 'reject') {
        posTrend.status = 'accept';
      } else if (posTrend.status === 'accept') {
        posTrend.status = 'reject';
      }
      return posTrend;
    }
  }
};
