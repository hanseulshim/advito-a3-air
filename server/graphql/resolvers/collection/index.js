const merge = require('lodash.merge');
const { locationCollection } = require('./locationCollection');
const { travelSectorCollection } = require('./travelSectorCollection');

exports.collectionResolvers = {
  ...merge(locationCollection, travelSectorCollection)
};
