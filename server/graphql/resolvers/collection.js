const {
  locationCollectionList,
  travelSectorCollectionList,
  airlineGroupCollectionList
} = require('../../data/collection');

exports.collectionResolvers = {
  locationCollectionList: () => locationCollectionList,
  travelSectorCollectionList: () => travelSectorCollectionList,
  airlineGroupCollectionList: () => airlineGroupCollectionList
};
