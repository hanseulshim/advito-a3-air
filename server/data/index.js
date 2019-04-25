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
const { dataSet } = require('./dataSet');
const {
  contractList,
  contractTypeList,
  pricingTermList,
  discountTypeList,
  journeyTypeList,
  directionTypeList
} = require('./contract');
const { userList } = require('./user');

module.exports = {
  clientList,
  projectList,
  projectData,
  airportList,
  bookingClassList,
  dataSet,
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
  discountTypeList,
  journeyTypeList,
  directionTypeList,
  userList
};
