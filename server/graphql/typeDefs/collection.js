exports.collectionDefs = `
type LocationCollection {
  id: Int,
  name: String,
  regionList: [Region]
  description: String,
  dateUpdated: Date,
  active: Boolean
}
type Region {
  name: String,
  countryList: [String]
}
`;

exports.collectionQuery = `
locationCollectionList: [LocationCollection] @auth
`;
