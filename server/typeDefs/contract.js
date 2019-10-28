export const contract = `
type Contract {
  id: Int
  name: String
  typeId: Int
  typeName: String
  description: String
  round: String
  effectiveFrom: Date
  effectiveTo: Date
  qc: Float
  pricingTermCount: Int
  targetTermCount: Int
  pointOfSaleList: [String]
  pointOfOriginList: [String]
  airlineList: [String]
  divisionId: Int
}
type ContractType {
  id: Int
  name: String
}
type DivisionType {
  id: Int
  name: String
}
type PricingTerm {
  id: Int
  contractOrder: Int
  appliedOrder: Int
  name: String
  effectiveFrom: Date
  effectiveTo: Date
  qc: Boolean
  discountCount: Int
  pointOfSaleList: [String]
  pointOfOriginList: [String]
  airlineList: [String]
  ignore: Boolean
  noteImportant: Boolean
  noteContent: Boolean
  discountNoteCount: Int
}
type Discount {
  id: Int
  pricingTermId: Int
  contractOrder: Int
  appliedOrder: Int
  name: String
  effectiveFrom: Date
  effectiveTo: Date
  discountTypeId: Int
  discountTypeName: String
  discountValue: Float
  journeyTypeId: Int
  journeyTypeName: String
  directionTypeId: Int
  directionTypeName: String
  ruleCount: Int
  normalizationCount: Int
  noteImportant: Boolean
  noteContent: Boolean
}
type DiscountType {
  id: Int
  name: String
}
type JourneyType {
  id: Int
  name: String
}
type DirectionType {
  id: Int
  name: String
}

type Normalization {
  id: Int
  usageFrom: Date
  usageTo: Date
  effectiveFrom: Date
  effectiveTo: Date
  created: Date
  createdby: String
  marketCount: Int
}
type NormalizationMarket {
  id: Int
  marketA: String
  marketB: String
  farePaid: Float
  usageOverride: Float
  farePullDate: Date
  notes: String
  fareList: [NormalizationFare]
}
type NormalizationFare {
  id: Int
  fareType: Int
  fareBasis: String
  amount: Float
  currencyCode: String
  directionType: String
  advancePurchase: String
  minstay: String
}
input NormalizationFareInput {
  id: Int
  fareType: Int!
  fareBasis: String
  amount: Float!
  currencyCode: String!
  directionType: String!
  advancePurchase: String
  minstay: String
}

type TopMarket {
  name: String
  originMarket: String
  destMarket: String
  farePaid: Float
  idList: [Int]
}
type MarketAdvancedTicket {
  label: String
  value: Float
}
type MarketDeparture {
  label: String
  value: Float
}
type MarketFareBasis {
  fareBasis: String
  bookingClass: String
  usage: Float
}


type TargetTerm {
  id: Int
  name: String
  order: Int
  effectiveFrom: Date
  effectiveTo: Date
  timeframe: Int
  qc: Float
  targetTypeId: Int
  targetTypeName: String
  cabinF: Boolean
  cabinC: Boolean
  cabinP: Boolean
  cabinY: Boolean
  qsi: Float
  incentiveTypeId: Int
  incentiveTypeName: String
  currencyId: Int
  softTarget: Boolean
  internalTarget: Boolean
  targetAmount: Float
  levelCount: Int
  ruleCount: Int
  noteImportant: Boolean
  noteContent: Boolean
  dpmPrice: Float,
  dpmStartDate: Date,
  baselineDateFrom: Date,
  baselineDateTo: Date,
  goalDateFrom: Date,
  goalDateTo: Date,
  airlineGroupFrom: Date,
  airlineGroupTo: Date,
  fareCategoryFrom: Date,
  fareCategoryTo: Date
}
type TargetLevel {
  id: String
  targetTermId: Int
  targetAmount: Float
  scoringTarget: Boolean
  incentiveDescription: String
}
type TargetType {
  id: Int
  name: String
}
type IncentiveType {
  id: Int
  name: String
}
type BulkAction {
  id: Int,
  name: String
}
type Note {
  id: String
  text: String
  lastUpdate: Date
  assigneeId: Int
  assigneeName: String
  assignedToId: Int
  assignedToName: String
}
input NewAppliedOrder {
  id: Int
  appliedOrder: Int
  name: String
  contractOrder: Int
}

extend type Query {
  contractList(projectId: Int): [Contract] @auth
  contract(id: Int!): [Contract] @auth
  contractTypeList: [ContractType] @auth
  divisionTypeList(clientId: Int): [DivisionType] @auth
  bulkActionList(parentId: Int!): [BulkAction] @auth

  pricingTermList(contractId: Int): [PricingTerm] @auth
  pricingTerm(id: Int!): PricingTerm @auth

  discountList(pricingTermId: Int): [Discount] @auth
  discount(id: Int!): Discount @auth
  discountTypeList: [DiscountType] @auth
  journeyTypeList: [JourneyType] @auth
  directionTypeList: [DirectionType] @auth

  normalizationList(discountId: Int): [Normalization] @auth
  normalization(id: Int!): Normalization @auth
  normalizationMarketList(normalizationId: Int): [NormalizationMarket] @auth
  topMarketList(clientGcn: String, normalizationId: Int): [TopMarket] @auth
  marketAdvancedTicketList(idList: [Int]): [MarketAdvancedTicket] @auth
  marketDepartureList(idList: [Int]): [MarketDeparture] @auth
  marketFareBasis(idList: [Int]): [MarketFareBasis] @auth

  targetTermList(contractId: Int): [TargetTerm] @auth
  targetTerm(id: Int!): TargetTerm @auth
  targetLevelList(targetTermId: Int): [TargetLevel] @auth
  targetLevel(id: String!, targetTermId: Int!): TargetLevel @auth
  targetTypeList: [TargetType] @auth
  incentiveTypeList: [IncentiveType] @auth

  noteList(parentId: Int, parentTable: String!): [Note] @auth
}

extend type Mutation {
  createContract(
    name: String!
    projectId: Int!
    typeId: Int!
    round: Int
    divisionId: Int
    description: String
  ): Contract @auth
  copyContract(id: Int!, name: String!): Contract @auth
  editContract(
    id: Int!,
    name: String!
    typeId: Int!
    round: Int
    divisionId: Int
    description: String
  ): Contract @auth
  deleteContract(id: Int!): Int @auth

  createPricingTerm(contractId: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  copyPricingTerm(id: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  editPricingTerm(id: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  togglePricingTermQC(contractId: Int!, idList: [Int]!): [PricingTerm] @auth
  deletePricingTerms(contractId: Int!, idList: [Int]!): [Int] @auth
  updateAppliedOrder(
    updatePricingTermList: [NewAppliedOrder]!
  ): Int @auth

  createTargetTerm(
    contractId: Int!
    name: String!
    targetTypeId: Int!
    timeframe: Int
    cabinF: Boolean
    cabinC: Boolean
    cabinP: Boolean
    cabinY: Boolean
    incentiveTypeId: Int
    currencyId: Int
    softTarget: Boolean
    internalTarget: Boolean
    qsi: Float
    dpmPrice: Float
    dpmStartDate: Date
    baselineDateFrom: Date
    baselineDateTo: Date
    goalDateFrom: Date
    goalDateTo: Date
    airlineGroupFrom: Date
    airlineGroupTo: Date
    fareCategoryFrom: Date
    fareCategoryTo: Date
  ): TargetTerm @auth
  copyTargetTerm(id: Int!, name: String!): TargetTerm @auth
  editTargetTerm(
    id: Int!
    name: String!
    timeframe: Int
    cabinF: Boolean
    cabinC: Boolean
    cabinP: Boolean
    cabinY: Boolean
    currencyId: Int
    softTarget: Boolean
    internalTarget: Boolean
    qsi: Float
    dpmPrice: Float
    dpmStartDate: Date
    baselineDateFrom: Date
    baselineDateTo: Date
    goalDateFrom: Date
    goalDateTo: Date
    airlineGroupFrom: Date
    airlineGroupTo: Date
    fareCategoryFrom: Date
    fareCategoryTo: Date
  ): TargetTerm @auth
  toggleTargetTermQC(contractId: Int!, idList: [Int]!): [TargetTerm] @auth
  deleteTargetTerms(contractId: Int!, idList: [Int]!): [Int] @auth

  createTargetLevel(
    targetTermId: Int!
    targetAmount: Float!
    scoringTarget: Boolean!
    incentiveDescription: String
  ): Int @auth
  editTargetLevel(
    id: String!
    targetTermId: Int!
    targetAmount: Float!
    scoringTarget: Boolean!
    incentiveDescription: String
  ): [TargetLevel] @auth
  toggleTargetLevel(id: String!, targetTermId: Int!): [TargetLevel] @auth
  deleteTargetLevel(id: String!, targetTermId: Int!): String @auth

  createDiscount(
    pricingTermId: Int!
    name: String!
    discountTypeId: Int
    discountValue: Float!
    journeyTypeId: Int
    directionTypeId: Int
  ): Discount @auth
  copyDiscount(
    id: Int!
    name: String!
    discountTypeId: Int
    discountValue: Float!
    journeyTypeId: Int
    directionTypeId: Int
  ): Discount @auth
  editDiscount(
    id: Int!
    name: String!
    discountTypeId: Int
    discountValue: Float!
    journeyTypeId: Int
    directionTypeId: Int
  ): Discount @auth
  deleteDiscounts(pricingTermId: Int!, idList: [Int]!): [Int] @auth
  updateDiscountAppliedOrder(
    updateDiscountList: [NewAppliedOrder]!
  ): Int @auth


  createNormalization(
    discountId: Int!
    usageFrom: Date!
    usageTo: Date!
    effectiveFrom: Date!
    effectiveTo: Date!
  ): Normalization @auth
  updateNormalization(
    id: Int!
    usageFrom: Date!
    usageTo: Date!
    effectiveFrom: Date!
    effectiveTo: Date!
  ): Normalization @auth
  deleteNormalization(id: Int!): Int @auth
  copyNormalization(id: Int!): Normalization @auth
  createNormalizationMarket(
    normalizationId: Int!
    marketA: String!
    marketB: String!
    farePaid: Float!
    usageOverride: Float
    farePullDate: Date!
    notes: String
    fareList: [NormalizationFareInput]
  ): NormalizationMarket  @auth
  updateNormalizationMarket(
    marketId: Int!
    marketA: String!
    marketB: String!
    farePaid: Float!
    usageOverride: Float
    farePullDate: Date!
    notes: String
    fareList: [NormalizationFareInput]
  ): NormalizationMarket  @auth
  deleteNormalizationMarket(
    id: Int!
  ): Int @auth
  
  addNote(
    parentId: Int!
    parentTable: String!
    important: Boolean!
    text: String
    assignedToId: Int!
  ): Note @auth
  editNote(
    parentId: Int!
    parentTable: String!
    important: Boolean!
    text: String
    assignedToId: Int!
    noteId: String!
  ): Note @auth
  deleteNote(
    parentId: Int!
    parentTable: String!
    resetImportant: Boolean!
    important: Boolean!
    noteId: String!
  ): String @auth
}
`;
