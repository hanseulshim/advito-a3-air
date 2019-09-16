export const scenario = `
type Scenario {
  scenarioId: Int
  projectId: Int
  shortName: String
  name: String
  description: String
  airlineContracts: Boolean
  contractTargets: Boolean
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
  initScenarioid: Int
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
extend type Query {
  scenarioList(projectId: Int): [Scenario] @auth
  scenario(id: Int!): Scenario @auth
}
`;
