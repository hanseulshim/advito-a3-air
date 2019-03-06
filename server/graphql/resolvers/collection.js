const { locationCollectionList } = require('../../data/collection');

exports.collectionResolvers = {
  locationCollectionList: () => locationCollectionList
};
