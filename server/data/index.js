const { clientList } = require('./client');
const { projectList } = require('./project');
const { projectData } = require('./projectData');
const {
  airlineGroupAirlineList,
  airlineGroupCollectionList,
  locationCollectionList,
  preferredAirlineCollectionList,
  preferenceLevelList,
  posList,
  travelSectorCollectionList,
  travelSectorRegionList
} = require('./collection');
const { airportList, bookingClassList } = require('./library');
const {
  dataSet,
  dataSetCountryList,
  dataSetDivisionList,
  dataSetColumnList
} = require('./dataSet');
const {
  contractList,
  contractTypeList,
  pricingTermList,
  targetTermList,
  targetTypeList,
  incentiveTypeList,
  discountList,
  discountTypeList,
  journeyTypeList,
  directionTypeList
} = require('./contract');
const { userList } = require('./user');
const { process } = require('./process');

module.exports = {
  clientList,
  projectList,
  projectData,
  airportList,
  bookingClassList,
  dataSet,
  dataSetCountryList,
  dataSetDivisionList,
  dataSetColumnList,
  airlineGroupAirlineList,
  airlineGroupCollectionList,
  locationCollectionList,
  preferredAirlineCollectionList,
  preferenceLevelList,
  posList,
  travelSectorCollectionList,
  travelSectorRegionList,
  contractList,
  contractTypeList,
  pricingTermList,
  targetTermList,
  targetTypeList,
  incentiveTypeList,
  discountList,
  discountTypeList,
  journeyTypeList,
  directionTypeList,
  userList,
  process
};
