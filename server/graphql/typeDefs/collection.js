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
  id: Int
  name: String,
  countryList: [Country]
}
type Country {
  id: Int
  regionId: Int
  name: String
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
  origin: GeographyRegion,
  destination: GeographyRegion,
  exclude: Boolean
}
type GeographyRegion {
  id: Int,
  name: String
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
input MoveCountry {
  id: Int
  regionId: Int
  name: String
}
input SectorGeography {
  origin: Int,
  destination: Int,
  exclude: Boolean
}

extend type Query {
  locationCollectionList: [LocationCollection] @auth
  travelSectorCollectionList: [TravelSectorCollection] @auth
  travelSectorRegionList: [GeographyRegion] @auth
  airlineGroupCollectionList: [AirlineGroupCollection] @auth
  preferredAirlineCollectionList: [PreferredAirlineCollection] @auth
}

extend type Mutation {
  createLocationCollection(id: Int!, name: String!, description: String): LocationCollection @auth
  editLocationCollection(id: Int!, name: String!, description: String): LocationCollection @auth
  deleteLocationCollection(id: Int!): Int @auth
  addRegion(id: Int!, name: String!): LocationCollection @auth
  deleteRegion(id: Int!, collectionId: Int!): LocationCollection @auth
  moveCountries(id: Int!, collectionId: Int!, countryList: [MoveCountry]): LocationCollection @auth

  createTravelSectorCollection(id: Int!, name: String!, description: String): TravelSectorCollection @auth
  editTravelSectorCollection(id: Int!, name: String!, description: String): TravelSectorCollection @auth
  deleteTravelSectorCollection(id: Int!): Int @auth
  addTravelSector(id: Int!, name: String!, shortName: String!, geographyList: [SectorGeography]): TravelSectorCollection @auth
  editTravelSector(id: Int!, collectionId: Int! name: String!, shortName: String!, geographyList: [SectorGeography]): TravelSectorCollection @auth
  deleteTravelSector(id: Int!, collectionId: Int!): TravelSectorCollection @auth
}
`;
