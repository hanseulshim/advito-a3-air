export const scenario = `
type Scenario {
  scenarioId: Int
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

extend type Query {
  scenarioList(projectId: Int): [Scenario] @auth
  scenario(id: Int!): Scenario @auth
  scenarioTypeList: [ScenarioType] @auth
  scenarioParameters: ScenarioParameters @auth
  scenarioContractList(scenarioId: Int): [Int] @auth
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
    scenarioId: Int!
    name: String!
    shortName: String!
    description: String
  ): Scenario @auth
  deleteScenario(
    scenarioId: Int!
  ): Int @auth
  updateScenarioParameters(
    scenarioId: Int!
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
    contractId: Int!
  ): Int @auth
}
`;
