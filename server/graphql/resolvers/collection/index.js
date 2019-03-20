const merge = require('lodash.merge');
const { locationCollection } = require('./locationCollection');
const { travelSectorCollection } = require('./travelSectorCollection');
const { airlineGroupCollection } = require('./airlineGroupCollection');

exports.collectionResolvers = {
  ...merge(locationCollection, travelSectorCollection, airlineGroupCollection)
};
