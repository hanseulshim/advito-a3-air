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
  description: String
  dateUpdated: Date
  sectorCount: Int
  standard: Boolean
  active: Boolean
}
type TravelSector {
  id: Int
  name: String
  shortName: String
  standard: Boolean
  sectorGeographyList: [SectorGeography]
}
type SectorGeography {
  id: Int
  originId: Int
  originName: String
  destinationId: Int
  destinationName: String
  exclude: Boolean
}
type AirlineGroupCollection {
  id: Int
  name: String
  description: String
  dateUpdated: Date
  effectiveStartDate: Date
  effectiveEndDate: Date
  active: Boolean
  standard: Boolean
  airlineGroupCount: Int
}
type AirlineGroup {
  id: Int
  name: String
  code: String
  effectiveStartDate: Date
  effectiveEndDate: Date
  standard: Boolean
  airlineGroupMemberList: [AirlineGroupMember]
}
type AirlineGroupMember {
  id: Int
  airlineId: Int
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
input SectorGeographyInput {
  id: Int
  origin: Int
  destination: Int
  exclude: Boolean
}
input GroupAirline {
  id: Int
  airlineId: Int
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
  travelSectorCollectionList(clientId: Int, projectId: Int): [TravelSectorCollection] @auth
  travelSectorCollection(projectId: Int!, id: Int!): TravelSectorCollection @auth
  travelSectorList(groupId: Int): [TravelSector] @auth
  airlineGroupCollectionList(clientId: Int, projectId: Int): [AirlineGroupCollection] @auth
  airlineGroupCollection(projectId: Int!, id: Int!): AirlineGroupCollection @auth
  airlineGroupList(collectionId: Int): [AirlineGroup] @auth
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

  copyTravelSectorCollection(clientId: Int!, projectId: Int!, id: Int!, name: String!, description: String): Int @auth
  editTravelSectorCollection(projectId: Int!, id: Int!, name: String!, description: String): TravelSectorCollection @auth
  deleteTravelSectorCollection(id: Int!, projectId: Int!): Int @auth
  toggleTravelSectorCollection(id: Int!, projectId: Int!): Int @auth
  addTravelSector(groupId: Int!, name: String!, shortName: String!, geographyList: [SectorGeographyInput]): Int @auth
  editTravelSector(sectorId: Int!, name: String!, shortName: String!, geographyList: [SectorGeographyInput]): Int @auth
  deleteTravelSector(id: Int!): Int @auth
  deleteSectorGeography(id: Int!): Int @auth

  editAirlineGroupCollection(projectId: Int!, id: Int!, name: String!, description: String, effectiveStartDate: Date!, effectiveEndDate: Date!): AirlineGroupCollection @auth
  deleteAirlineGroupCollection(projectId: Int!, id: Int!): Int @auth
  toggleAirlineGroupCollection(projectId: Int!, id: Int!): Int @auth
  addAirlineGroup(collectionId: Int!, name: String!, code: String!, effectiveStartDate: Date!, effectiveEndDate: Date!, airlineList: [GroupAirline]): Int @auth
  editAirlineGroup(carrierGroupId: Int!, name: String!, code: String!, effectiveStartDate: Date!, effectiveEndDate: Date!, airlineList: [GroupAirline]): Int @auth
  deleteAirlineGroup(id: Int!): Int @auth

  editPreferredAirlineCollection(id: Int!, name: String!, description: String): PreferredAirlineCollection @auth
  deletePreferredAirlineCollection(id: Int!): Int @auth
  togglePreferredAirlineCollection(id: Int!): [PreferredAirlineCollection] @auth
  addPreferredAirline(id: Int!, airlineList: [PreferredAirlineInput]): PreferredAirlineCollection @auth
  editPreferredAirline(id: Int!, airlineList: [PreferredAirlineInput]): PreferredAirlineCollection @auth
  deletePreferredAirline(id: Int!, collectionId: Int!): PreferredAirlineCollection @auth
}
`;
