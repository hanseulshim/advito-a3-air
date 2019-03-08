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
  id: Int,
  name: String,
  shortName: String,
  geographyList: [Geography]
}
type Geography {
  origin: String,
  destination: String,
  exclude: Boolean
}
type AirlineGroupCollection {
  id: Int,
  name: String,
  airlineGroupList: [AirlineGroup]
  description: String,
  dateUpdated: Date,
  active: Boolean
}
type AirlineGroup {
  id: Int,
  name: String,
  effectiveStartDate: Date,
  effectiveEndDate: Date
  airlineList: [Airline]
}
type Airline {
  name: String
  effectiveStartDate: Date,
  effectiveEndDate: Date
}
`;

exports.collectionQuery = `
locationCollectionList: [LocationCollection] @auth
travelSectorCollectionList: [TravelSectorCollection] @auth
airlineGroupCollectionList: [AirlineGroupCollection] @auth
`;
