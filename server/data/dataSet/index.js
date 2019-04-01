const { posTrendsCountryList, posTrendsColumnList } = require('./posTrends');
const {
  divisionTrendsList,
  divisionTrendsColumnList
} = require('./divisionTrends');
const {
  importErrorsCountryList,
  importErrorsColumnList
} = require('./importErrors');

exports.dataSet = {
  posTrendsCountryList,
  posTrendsColumnList,
  divisionTrendsList,
  divisionTrendsColumnList,
  importErrorsCountryList,
  importErrorsColumnList
};
