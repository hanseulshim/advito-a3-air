exports.contract = `
type Contract {
  id: Int
  name: String
  type: ContractType
  description: String
  round: Int
  effectiveStartDate: Date
  effectiveEndDate: Date
  qc: Float
  pricingTermTotal: Int
  targetTermTotal: Int
  pointOfSaleList: [String]
  pointOfOriginList: [String]
  airlineList: [String]
  division: String
  isDeleted: Boolean
}
type ContractType {
  id: Int
  name: String
}
type PricingTerm {
  id: Int
  contractOrder: Int
  appliedOrder: Int
  name: String
  effectiveStartDate: Date
  effectiveEndDate: Date
  qc: Float
  discountTotal: Int
  pointOfSaleList: [String]
  pointOfOriginList: [String]
  airlineList: [String]
  ignore: Boolean
  isDeleted: Boolean
  note: Note
}
type Discount {
  id: Int
  pricingTermId: Int
  contractOrder: Int
  appliedOrder: Int
  name: String
  effectiveStartDate: Date
  effectiveEndDate: Date
  discountType: DiscountType
  discountValue: Float
  journeyType: JourneyType
  directionType: DirectionType
  normalizationList: Int
  note: Note
  isDeleted: Boolean
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
  id: Int,
  name: String,
  effectiveStartDate: Date,
  effectiveEndDate: Date,
  timeframe: String,
  qc: Float,
  targetType: String,
  cabinF: Boolean
  cabinB: Boolean
  cabinP: Boolean
  cabinE: Boolean
  qsi: Float
  incentiveType: String
  softTarget: Boolean,
  internalTarget: Boolean,
  targetAmount: Float,
  levelTotal: Int,
  ruleTotal: Int,
  note: Note,
  order: Int,
  isDeleted: Boolean
}
type TargetType {
  id: Int,
  name: String
}
type IncentiveType {
  id: Int
  name: String
}
type Note {
  important: Boolean
  noteList: [NoteContent]
}
type NoteContent {
  id: Int
  author: User
  message: String
  date: Date
  assignee: User
}
input NewAppliedOrder {
  id: Int
  appliedOrder: Int
  name: String
  contractOrder: Int
}

extend type Query {
  contractList: [Contract] @auth
  contractTypeList: [ContractType] @auth
  pricingTermList: [PricingTerm] @auth
  targetTermList: [TargetTerm] @auth
  targetTypeList: [TargetType] @auth
  incentiveTypeList: [IncentiveType] @auth
  discountList(pricingTermId: Int): [Discount] @auth
  discountTypeList: [DiscountType] @auth
  journeyTypeList: [JourneyType] @auth
  directionTypeList: [DirectionType] @auth
}

extend type Mutation {
  createContract(
    name: String!
    typeId: Int!
    round: Int
    effectiveStartDate: Date!
    effectiveEndDate: Date
    division: String
    description: String
  ): Contract @auth
  copyContract(id: Int!, name: String!): Contract @auth
  editContract(
    id: Int!,
    name: String!
    typeId: Int!
    round: Int
    effectiveStartDate: Date!
    effectiveEndDate: Date
    division: String
    description: String
  ): Contract @auth
  deleteContract(id: Int!): Int @auth

  updateAppliedOrder(
    updatePricingTermList: [NewAppliedOrder]!
  ): [PricingTerm] @auth

  createPricingTerm(name: String!, ignore: Boolean!): PricingTerm @auth
  copyPricingTerm(id: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  editPricingTerm(id: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  togglePricingTermQC(id: Int!): PricingTerm @auth
  deletePricingTerms(idList: [Int]!): [Int] @auth

  updateDiscountAppliedOrder(
    updateDiscountList: [NewAppliedOrder]!
  ): [Discount] @auth

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
  deleteDiscounts(idList: [Int]!): [Int] @auth

  saveNote(
    id: Int!
    important: Boolean!
    message: String
    assigneeId: Int!
    noteId: Int
  ): Note
  deleteNote(
    id: Int!
    noteId: Int!
  ): Note
  saveDiscountNote(
    id: Int!
    important: Boolean!
    message: String
    assigneeId: Int!
    noteId: Int
  ): Note
  deleteDiscountNote(
    id: Int!
    noteId: Int!
  ): Note
}
`;
