export const scenario = `
type Scenario {
  scenarioId: Int
  projectId: Int
  scenarioSeq: Int
  shortName: String
  name: String
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
  influenceLevelCd: Int
  priceInfluenceLevelCd: Int
  servedMarketThreshold: Float
  overlapThreshold: Float
  segmentIncrease: Float
  fareIncrease: Float
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
  useHistoricalShare: Boolean
  biasOverride: Int
  ignoresSmallQsi: Boolean
  smallQsiThreshold: Float
  useHistoricalFares: Boolean
  description: String
}
extend type Query {
  scenarioList(projectId: Int): [Scenario] @auth
}
`;
