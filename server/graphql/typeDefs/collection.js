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
type PreferredAirlineCollection {
  id: Int,
  name: String,
  airlineList: [Airline]
  description: String,
  dateUpdated: Date,
  active: Boolean
}
type Airline {
  name: String
  preferenceLevel: String
  effectiveStartDate: Date,
  effectiveEndDate: Date,
  cabins: String,
  pos: String,
  active: Boolean
}
input RegionInput {
  name: String,
  countryList: [String]
}

extend type Query {
  locationCollectionList: [LocationCollection] @auth
  travelSectorCollectionList: [TravelSectorCollection] @auth
  airlineGroupCollectionList: [AirlineGroupCollection] @auth
  preferredAirlineCollectionList: [PreferredAirlineCollection] @auth
}

extend type Mutation {
  createLocationCollection(id: Int!, name: String!, description: String): LocationCollection @auth
  editLocationCollection(id: Int!, name: String!, description: String): LocationCollection @auth
  deleteLocationCollection(id: Int!): Int @auth
  addRegion(id: Int!, name: String!): LocationCollection @auth
  deleteRegion(id: Int!, name: String!): LocationCollection @auth
  moveCountries(id: Int!, destination: String!, origin: [RegionInput]): LocationCollection @auth
}
`;
