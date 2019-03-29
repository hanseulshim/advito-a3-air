const { posTrendsCountryList, posTrendsColumnList } = require('./posTrends');
const { divisionTrends } = require('./divisionTrends');
const { importErrors } = require('./importErrors');

exports.dataSet = {
  posTrendsCountryList,
  posTrendsColumnList,
  divisionTrends,
  importErrors
};
