exports.contract = `
type Contract {
  id: Int
  name: String
  typeId: Int
  typeName: String
  description: String
  round: Int
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
  discountTypeId: Int
  discountTypeName: String
  discountValue: Float
  journeyTypeId: Int
  journeyTypeName: String
  directionTypeId: Int
  directionTypeName: String
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
  cabinB: Boolean
  cabinP: Boolean
  cabinE: Boolean
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
  id: Int
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
  contractList: [Contract] @auth
  contract(id: Int!): [Contract] @auth
  contractTypeList: [ContractType] @auth
  divisionTypeList: [DivisionType] @auth

  pricingTermList(contractId: Int): [PricingTerm] @auth
  pricingTerm(id: Int!): PricingTerm @auth

  discountList(pricingTermId: Int): [Discount] @auth
  discount(id: Int!): Discount @auth
  discountTypeList: [DiscountType] @auth
  journeyTypeList: [JourneyType] @auth
  directionTypeList: [DirectionType] @auth

  targetTermList(contractId: Int): [TargetTerm] @auth
  targetTerm(id: Int!): TargetTerm @auth
  targetLevelList(targetTermId: Int): [TargetLevel] @auth
  targetLevel(id: Int!, targetTermId: Int!): TargetLevel @auth
  targetTypeList: [TargetType] @auth
  incentiveTypeList: [IncentiveType] @auth

  noteList(parentId: Int, parentTable: String!): [Note] @auth
}

extend type Mutation {
  createContract(
    name: String!
    typeId: Int!
    round: Int
    effectiveFrom: Date!
    effectiveTo: Date
    divisionId: Int
    description: String
  ): Contract @auth
  copyContract(id: Int!, name: String!): Contract @auth
  editContract(
    id: Int!,
    name: String!
    typeId: Int!
    round: Int
    effectiveFrom: Date!
    effectiveTo: Date
    divisionId: Int
    description: String
  ): Contract @auth
  deleteContract(id: Int!): Int @auth

  createPricingTerm(contractId: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  copyPricingTerm(id: Int!, contractId: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  editPricingTerm(id: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  togglePricingTermQC(id: Int!): PricingTerm @auth
  deletePricingTerms(contractId: Int!, idList: [Int]!): [Int] @auth
  updateAppliedOrder(
    updatePricingTermList: [NewAppliedOrder]!
  ): [PricingTerm] @auth

  createTargetTerm(
    contractId: Int!
    name: String!
    targetTypeId: Int!
    timeframe: Int
    cabinF: Boolean
    cabinB: Boolean
    cabinP: Boolean
    cabinE: Boolean
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
    cabinB: Boolean
    cabinP: Boolean
    cabinE: Boolean
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
  toggleTargetTermQC(id: Int!): TargetTerm @auth
  deleteTargetTerms(idList: [Int]!): [Int] @auth

  createTargetLevel(
    targetTermId: Int!
    targetAmount: Float!
    scoringTarget: Boolean!
    incentiveDescription: String
  ): TargetLevel @auth
  editTargetLevel(
    id: Int!
    targetAmount: Float!
    scoringTarget: Boolean!
    incentiveDescription: String
  ): TargetLevel @auth
  toggleTargetLevel(id: Int!, targetTermId: Int!): [TargetLevel] @auth
  deleteTargetLevel(id: Int!, targetTermId: Int!): Int @auth

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
  ): [Discount] @auth
  
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
