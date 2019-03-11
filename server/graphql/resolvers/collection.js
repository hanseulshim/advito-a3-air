const {
  locationCollectionList,
  travelSectorCollectionList,
  airlineGroupCollectionList,
  preferredAirlineCollectionList
} = require('../../data/collection');

exports.collectionResolvers = {
  Query: {
    locationCollectionList: () => locationCollectionList,
    travelSectorCollectionList: () => travelSectorCollectionList,
    airlineGroupCollectionList: () => airlineGroupCollectionList,
    preferredAirlineCollectionList: () => preferredAirlineCollectionList
  }
};
