const {
  locationCollectionList,
  travelSectorCollectionList
} = require('../../data/collection');

exports.collectionResolvers = {
  locationCollectionList: () => locationCollectionList,
  travelSectorCollectionList: () => travelSectorCollectionList
};
