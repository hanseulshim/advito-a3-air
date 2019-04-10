const { ApolloError } = require('apollo-server-lambda');
const { dataSet } = require('../../data');

exports.dataSet = {
  Query: {
    posTrendsCountryList: () => dataSet.posTrendsCountryList,
    posTrendsColumnList: () =>
      dataSet.posTrendsColumnList.filter(col => !col.isDeleted),
    divisionTrendsList: () => dataSet.divisionTrendsList,
    divisionTrendsColumnList: () =>
      dataSet.divisionTrendsColumnList.filter(col => !col.isDeleted),
    importErrorsCountryList: () => dataSet.importErrorsCountryList,
    importErrorsColumnList: () =>
      dataSet.importErrorsColumnList.filter(col => !col.isDeleted)
  },
  Mutation: {
    togglePosTrend: (_, { id, status }) => {
      const posTrend = dataSet.posTrendsColumnList.filter(
        trend => trend.id === id
      )[0];
      if (!posTrend) {
        throw new ApolloError('Pos Trend not found', 400);
      }
      posTrend.status = status;
      return posTrend;
    },
    deletePosTrend: (_, { id }) => {
      const posTrend = dataSet.posTrendsColumnList.filter(
        trend => trend.id === id
      )[0];
      if (!posTrend) {
        throw new ApolloError('Pos Trend not found', 400);
      }
      posTrend.isDeleted = true;
      return id;
    },
    toggleDivisionTrend: (_, { id, status }) => {
      const divisionTrend = dataSet.divisionTrendsColumnList.filter(
        trend => trend.id === id
      )[0];
      if (!divisionTrend) {
        throw new ApolloError('Division not found', 400);
      }
      divisionTrend.status = status;
      return divisionTrend;
    },
    deleteDivisionTrend: (_, { id }) => {
      const divisionTrend = dataSet.divisionTrendsColumnList.filter(
        trend => trend.id === id
      )[0];
      if (!divisionTrend) {
        throw new ApolloError('Division not found', 400);
      }
      divisionTrend.isDeleted = true;
      return id;
    },
    toggleImportError: (_, { id, status }) => {
      const importError = dataSet.importErrorsColumnList.filter(
        err => err.id === id
      )[0];
      if (!importError) {
        throw new ApolloError('Import Error not found', 400);
      }
      importError.status = status;
      return importError;
    },
    deleteImportError: (_, { id }) => {
      const importError = dataSet.importErrorsColumnList.filter(
        trend => trend.id === id
      )[0];
      if (!importError) {
        throw new ApolloError('Import Error not found', 400);
      }
      importError.isDeleted = true;
      return id;
    }
  }
};
