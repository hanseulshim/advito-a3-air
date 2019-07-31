exports.collection = `
type LocationCollection {
  id: Int
  name: String
  description: String
  dateUpdated: Date
  regionCount: Int
  standard: Boolean
  active: Boolean
}
type Region {
  id: Int
  name: String
  code: String
  standard: Boolean
  countryList: [Geography]
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
  geographyList: [Geography1]
}
type Geography1 {
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
  code: String
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
  pos: [String]
  active: Boolean
}
type PreferredAirlinePos {
  id: Int
  name: String
}
type PreferredAirlinePreference {
  id: Int
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
  posIdList: [Int]
  preferenceLevelId: Int
  effectiveStartDate: Date
  effectiveEndDate: Date
}

extend type Query {
  locationCollectionList(clientId: Int, projectId: Int): [LocationCollection] @auth
  locationCollection(projectId: Int!, id: Int!): LocationCollection @auth
  regionList(geoSetId: Int): [Region] @auth
  travelSectorCollectionList: [TravelSectorCollection] @auth
  travelSectorRegionList: [GeographyRegion] @auth
  airlineGroupCollectionList: [AirlineGroupCollection] @auth
  airlineGroupAirlineList: [AirlineGroupAirline] @auth
  preferredAirlineCollectionList: [PreferredAirlineCollection] @auth
  posList: [PreferredAirlinePos]
  preferenceLevelList: [PreferredAirlinePreference] @auth
}

extend type Mutation {
  copyLocationCollection(clientId: Int!, projectId: Int!, id: Int!, name: String!, description: String): Int @auth
  editLocationCollection(projectId: Int!, id: Int!, name: String!, description: String): LocationCollection @auth
  deleteLocationCollection(id: Int!, projectId: Int!): Int @auth
  toggleLocationCollection(id: Int!, projectId: Int!): Int @auth
  addRegion(geoSetId: Int!, name: String!, code: String!): Int @auth
  deleteRegion(id: Int!): Int @auth
  moveCountries(geoSetId: Int!, regionId: Int!, countryList: [Int]): Int @auth

  createTravelSectorCollection(id: Int!, name: String!, description: String): TravelSectorCollection @auth
  editTravelSectorCollection(id: Int!, name: String!, description: String): TravelSectorCollection @auth
  deleteTravelSectorCollection(id: Int!): Int @auth
  toggleTravelSectorCollection(id: Int!): [TravelSectorCollection] @auth
  addTravelSector(id: Int!, name: String!, shortName: String!, geographyList: [SectorGeography]): TravelSectorCollection @auth
  editTravelSector(id: Int!, collectionId: Int!, name: String!, shortName: String!, geographyList: [SectorGeography]): TravelSectorCollection @auth
  deleteTravelSector(id: Int!, collectionId: Int!): TravelSectorCollection @auth
  deleteBidirection(id: Int!, collectionId: Int!, index: Int!): TravelSectorCollection @auth

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
