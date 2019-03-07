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
type TravelSectorCollection {
  id: Int,
  name: String,
  sectorList: [Sector]
  description: String,
  dateUpdated: Date,
  active: Boolean
}
type Sector {
  name: String,
  shortName: String,
  geographyList: [Geography]
}
type Geography {
  origin: String,
  destination: String,
  exclude: Boolean
}
`;

exports.collectionQuery = `
locationCollectionList: [LocationCollection] @auth
travelSectorCollectionList: [TravelSectorCollection] @auth
`;
