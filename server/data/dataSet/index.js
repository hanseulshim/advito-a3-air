const { posTrendsCountryList, posTrendsColumnList } = require('./posTrends');
const {
  divisionTrendsList,
  divisionTrendsColumnList
} = require('./divisionTrends');
const { importErrors } = require('./importErrors');

exports.dataSet = {
  posTrendsCountryList,
  posTrendsColumnList,
  divisionTrendsList,
  divisionTrendsColumnList,
  importErrors
};
