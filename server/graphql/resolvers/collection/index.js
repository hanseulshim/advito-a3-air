const merge = require('lodash.merge');
const { locationCollection } = require('./locationCollection');
const { travelSectorCollection } = require('./travelSectorCollection');
const { airlineGroupCollection } = require('./airlineGroupCollection');
const { preferredAirlineCollection } = require('./preferredAirlineCollection');

exports.collection = {
  ...merge(
    locationCollection,
    travelSectorCollection,
    airlineGroupCollection,
    preferredAirlineCollection
  )
};
