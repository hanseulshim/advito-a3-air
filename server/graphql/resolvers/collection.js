const {
  locationCollectionList,
  travelSectorCollectionList,
  airlineGroupCollectionList,
  preferredAirlineCollectionList
} = require('../../data/collection');

exports.collectionResolvers = {
  locationCollectionList: () => locationCollectionList,
  travelSectorCollectionList: () => travelSectorCollectionList,
  airlineGroupCollectionList: () => airlineGroupCollectionList,
  preferredAirlineCollectionList: () => preferredAirlineCollectionList
};
