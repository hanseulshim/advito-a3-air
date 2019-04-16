const { clientList } = require('./client');
const { projectList } = require('./project');
const { projectData } = require('./projectData');
const {
  airlineGroupAirlineList,
  airlineGroupCollectionList,
  locationCollectionList,
  preferredAirlineCollectionList,
  preferredAirlineInfo,
  travelSectorCollectionList,
  travelSectorRegionList
} = require('./collection');
const { airportList, bookingClassList } = require('./library');
const { dataSet } = require('./dataSet');
const {
  contractList,
  contractTypeList,
  pricingTermList
} = require('./contract');

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
  preferredAirlineInfo,
  travelSectorCollectionList,
  travelSectorRegionList,
  contractList,
  contractTypeList,
  pricingTermList
};
