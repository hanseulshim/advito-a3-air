export const scenario = `
type Scenario {
  id: Int
  projectId: Int
  shortName: String
  name: String
  description: String
  airlineContracts: Boolean
  preferredAirlines: Boolean
  useHistoricalShare: Boolean
  tripDistribution: Boolean
  effectiveSavings: Float
  influenceLevelCd: Int
  priceInfluenceLevelCd: Int
  biasOverride: Int
  servedMarketThreshold: Float
  overlapThreshold: Float
  segmentIncrease: Float
  fareIncrease: Float
  useHistoricalFares: Boolean
  ignoresSmallQsi: Boolean
  smallQsiThreshold: Float
  scenarioSeq: Int
  dateTimeCreated: Date
  dateTimeAccessed: Date
  hidden: Boolean
  deleted: Boolean
  initType: Int
  initScenarioId: Int
  preferredCarriersSet: Boolean
  contractsSet: Boolean
  overridesSet: Boolean
  scenarioRun: Boolean
  scenarioDataExported: Boolean
  fromDate: Date
  toDate: Date
  segments: Float
  contractSegments: Float
  publishedFare: Float
  publishedCommissions: Float
  publishedOverrides: Float
  farePaid: Float
  commissions: Float
  backend: Float
  overrides: Float
  coverageSegments: Float
  coverageNetOutlays: Float
  overlapSegments: Float
  overlapMarkets: Float
  overlapNetOutlays: Float
  contractsEvaluated: Boolean
  overlapEvaluated: Boolean
  wizardInProgress: Boolean
  wizardCurrentStep: Int
  wizardContractOverride: Boolean
  wizardOverrideOverride: Boolean
  initializationType: Int
  initializationProjectId: Int
  initializationScenarioId: Int
  scenarioParametersSet: Boolean
}
type ScenarioType {
  id: Int
  name: String
}
type InfluenceLevelType {
  id: Int
  name: String
}
type PriceInfluenceLevelType {
  id: Int
  name: String
}
type BiasOverride {
  id: Int
  name: String
}
type ScenarioParameters {
  influenceLevelList: [InfluenceLevelType]
  priceInfluenceLevelList: [PriceInfluenceLevelType]
  biasOverrideList: [BiasOverride]
}
type ScenarioPreferredCarrier {
  id: Int
  scenarioId: Int
  sectorId: Int
  carrierCode: String
  tier: Int
}
input ScenarioPreferredCarrierInput {
  id: Int
  scenarioId: Int
  sectorId: Int
  carrierCode: String
  tier: Int
}
type ScenarioPreferredCarrierTier {
  id: Int
  name: String
}
type ScenarioMarket {
  name: String
  travelSector: String
  idList: [Int]
}
type ScenarioTripDistribution {
  id: Int
  scenarioId: Int
  tripDistribution: Float
  airlineName: String
  fareCategory: String
  posCountryName: String
  fQsi: Float
  hQsi: Float
}
input ScenarioTripDistributionInput {
  id: Int
  scenarioId: Int
  cityPair: String
  carrierCode: String
  tripDistribution: Float
}

extend type Query {
  scenarioList(projectId: Int): [Scenario] @auth
  scenario(id: Int!): Scenario @auth
  scenarioTypeList: [ScenarioType] @auth
  scenarioParameters: ScenarioParameters @auth
  scenarioContractList(scenarioId: Int): [Int] @auth
  scenarioPreferredContractCarrierList(projectId: Int): [String] @auth
  scenarioPreferredCarrierList(scenarioId: Int): [ScenarioPreferredCarrier] @auth
  scenarioPreferredCarrierTierList: [ScenarioPreferredCarrierTier] @auth
  scenarioMarketList(clientGcn: String, projectId: Int): [ScenarioMarket] @auth
  scenarioTripDistributionList(idList: [Int], scenarioId: Int!, projectId: Int!): [ScenarioTripDistribution] @auth
  scenarioTravelSectorList(projectId: Int!): [TravelSector] @auth
}
extend type Mutation {
  createScenario(
    projectId: Int!
    name: String!
    shortName: String!
    description: String
    initializationType: Int!
    initializationProjectId: Int
    initializationScenarioId: Int
  ): Scenario @auth
  updateScenario(
    id: Int!
    name: String!
    shortName: String!
    description: String
  ): Scenario @auth
  deleteScenario(
    id: Int!
  ): Int @auth
  updateScenarioParameters(
    id: Int!
    influenceLevelCd: Int!
    priceInfluenceLevelCd: Int!
    biasOverride: Int!
    servedMarketThreshold: Float
    overlapThreshold: Float
    segmentIncrease: Float
    fareIncrease: Float
    useHistoricalShare: Boolean!
    useHistoricalFares: Boolean!
    ignoresSmallQsi: Boolean!
    smallQsiThreshold: Float
  ): Scenario @auth
  toggleScenarioContract(
    scenarioId: Int!
    contractIdList: [Int]!
  ): Int @auth
  updateScenarioPreferredCarriers(carrierList: [ScenarioPreferredCarrierInput]): Int @auth
  updateScenarioTripDistributions(tripDistributionList: [ScenarioTripDistributionInput]): Int @auth
}
`;
