const { ApolloError } = require('apollo-server-lambda');
const { dataSet } = require('../../data/dataSet');

exports.dataSetResolvers = {
  Query: {
    posTrendsCountryList: () => dataSet.posTrendsCountryList,
    posTrendsColumnList: () => dataSet.posTrendsColumnList,
    divisionTrendsList: () => dataSet.divisionTrendsList,
    divisionTrendsColumnList: () => dataSet.divisionTrendsColumnList,
    importErrorsCountryList: () => dataSet.importErrorsCountryList,
    importErrorsColumnList: () => dataSet.importErrorsColumnList
  },
  Mutation: {
    togglePosTrend: (_, { id }) => {
      const posTrend = dataSet.posTrendsColumnList.filter(
        trend => trend.id === id
      )[0];
      if (!posTrend) {
        throw new ApolloError('Pos Trend not found', 400);
      }
      if (posTrend.status === null || posTrend.status === 'reject') {
        posTrend.status = 'accept';
      } else if (posTrend.status === 'accept') {
        posTrend.status = 'reject';
      }
      return posTrend;
    },
    toggleDivisionTrend: (_, { id }) => {
      const divisionTrend = dataSet.divisionTrendsColumnList.filter(
        trend => trend.id === id
      )[0];
      if (!divisionTrend) {
        throw new ApolloError('Division not found', 400);
      }
      if (divisionTrend.status === null || divisionTrend.status === 'reject') {
        divisionTrend.status = 'accept';
      } else if (divisionTrend.status === 'accept') {
        divisionTrend.status = 'reject';
      }
      return divisionTrend;
    },
    toggleImportError: (_, { id }) => {
      const importError = dataSet.importErrorsColumnList.filter(
        err => err.id === id
      )[0];
      if (!importError) {
        throw new ApolloError('Import Error not found', 400);
      }
      if (importError.status === null || importError.status === 'reject') {
        importError.status = 'accept';
      } else if (importError.status === 'accept') {
        importError.status = 'reject';
      }
      return importError;
    }
  }
};
