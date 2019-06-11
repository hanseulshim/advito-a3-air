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
const { targetLevelList } = require('./contract');
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
  targetLevelList,
  process
};
