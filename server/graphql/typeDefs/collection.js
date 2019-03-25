exports.collectionDefs = `
type LocationCollection {
  id: Int
  name: String
  regionList: [Region]
  description: String
  dateUpdated: Date
  active: Boolean
}
type Region {
  id: Int
  name: String
  countryList: [Country]
}
type Country {
  id: Int
  regionId: Int
  name: String
}
type TravelSectorCollection {
  id: Int
  name: String
  sectorList: [Sector]
  description: String
  dateUpdated: Date
  active: Boolean
}
type Sector {
  id: Int
  name: String
  shortName: String
  geographyList: [Geography]
}
type Geography {
  origin: GeographyRegion
  destination: GeographyRegion
  exclude: Boolean
}
type GeographyRegion {
  id: Int
  name: String
}
type AirlineGroupCollection {
  id: Int
  name: String
  airlineGroupList: [AirlineGroup]
  description: String
  dateUpdated: Date
  effectiveStartDate: Date
  effectiveEndDate: Date
  active: Boolean
}
type AirlineGroup {
  id: Int
  name: String
  effectiveStartDate: Date
  effectiveEndDate: Date
  airlineList: [AirlineGroupAirline]
}
type AirlineGroupAirline {
  id: Int
  name: String
  effectiveStartDate: Date
  effectiveEndDate: Date
}
type PreferredAirlineCollection {
  id: Int
  name: String
  airlineList: [PreferredAirline]
  description: String
  dateUpdated: Date
  active: Boolean
}
type PreferredAirline {
  id: Int
  name: String
  preferenceLevel: String
  effectiveStartDate: Date
  effectiveEndDate: Date
  pos: String
  active: Boolean
}
type PreferredAirlineInfo {
  posList: [PreferredAirlinePos]
  preferenceLevelList: [PreferredAirlinePreference]
}
type PreferredAirlinePos {
  id: Int
  name: String
}
type PreferredAirlinePreference {
  id: Int
  name: String
}
input MoveCountry {
  id: Int
  regionId: Int
  name: String
}
input SectorGeography {
  origin: Int
  destination: Int
  exclude: Boolean
}
input GroupAirline {
  id: Int
  effectiveStartDate: Date
  effectiveEndDate: Date
}
input PreferredAirlineInput {
  id: Int
  posId: Int
  preferenceLevelId: Int
}

extend type Query {
  locationCollectionList: [LocationCollection] @auth
  travelSectorCollectionList: [TravelSectorCollection] @auth
  travelSectorRegionList: [GeographyRegion] @auth
  airlineGroupCollectionList: [AirlineGroupCollection] @auth
  airlineGroupAirlineList: [AirlineGroupAirline] @auth
  preferredAirlineCollectionList: [PreferredAirlineCollection] @auth
  preferredAirlineInfo: PreferredAirlineInfo @auth
}

extend type Mutation {
  createLocationCollection(id: Int!, name: String!, description: String): LocationCollection @auth
  editLocationCollection(id: Int!, name: String!, description: String): LocationCollection @auth
  deleteLocationCollection(id: Int!): Int @auth
  toggleLocationCollection(id: Int!): [LocationCollection] @auth
  addRegion(id: Int!, name: String!): LocationCollection @auth
  deleteRegion(id: Int!, collectionId: Int!): LocationCollection @auth
  moveCountries(id: Int!, collectionId: Int!, countryList: [MoveCountry]): LocationCollection @auth

  createTravelSectorCollection(id: Int!, name: String!, description: String): TravelSectorCollection @auth
  editTravelSectorCollection(id: Int!, name: String!, description: String): TravelSectorCollection @auth
  deleteTravelSectorCollection(id: Int!): Int @auth
  toggleTravelSectorCollection(id: Int!): [TravelSectorCollection] @auth
  addTravelSector(id: Int!, name: String!, shortName: String!, geographyList: [SectorGeography]): TravelSectorCollection @auth
  editTravelSector(id: Int!, collectionId: Int!, name: String!, shortName: String!, geographyList: [SectorGeography]): TravelSectorCollection @auth
  deleteTravelSector(id: Int!, collectionId: Int!): TravelSectorCollection @auth

  editAirlineGroupCollection(id: Int!, name: String!, description: String, effectiveStartDate: Date, effectiveEndDate: Date): AirlineGroupCollection @auth
  deleteAirlineGroupCollection(id: Int!): Int @auth
  toggleAirlineGroupCollection(id: Int!): [AirlineGroupCollection] @auth
  addAirlineGroup(id: Int!, name: String!, effectiveStartDate: Date, effectiveEndDate: Date, airlineList: [GroupAirline]): AirlineGroupCollection @auth
  editAirlineGroup(id: Int!, collectionId: Int!, name: String!, effectiveStartDate: Date, effectiveEndDate: Date, airlineList: [GroupAirline]): AirlineGroupCollection @auth
  deleteAirlineGroup(id: Int!, collectionId: Int!): AirlineGroupCollection @auth

  editPreferredAirlineCollection(id: Int!, name: String!, description: String): PreferredAirlineCollection @auth
  deletePreferredAirlineCollection(id: Int!): Int @auth
  togglePreferredAirlineCollection(id: Int!): [PreferredAirlineCollection] @auth
  addPreferredAirline(id: Int!, airlineList: [PreferredAirlineInput]): PreferredAirlineCollection @auth
  editPreferredAirline(id: Int!, airlineList: [PreferredAirlineInput]): PreferredAirlineCollection @auth
  deletePreferredAirline(id: Int!, collectionId: Int!): PreferredAirlineCollection @auth
}
`;
