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
  division: String
  isDeleted: Boolean
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
  divisionTypeList: [DivisionType] @auth
  pricingTermList: [PricingTerm] @auth
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
