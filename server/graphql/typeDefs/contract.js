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
  discountList: [Discount]
  pointOfSaleList: [String]
  pointOfOriginList: [String]
  airlineList: [String]
  ignore: Boolean
  isDeleted: Boolean
  note: Note
}
type Discount {
  id: Int
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
  note: String
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
  author: User
  message: String
  date: Date
  assignee: User
}

extend type Query {
  contractList: [Contract] @auth
  contractTypeList: [ContractType] @auth
  pricingTermList: [PricingTerm] @auth
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

  createPricingTerm(name: String!, ignore: Boolean!): PricingTerm @auth
  copyPricingTerm(id: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  editPricingTerm(id: Int!, name: String!, ignore: Boolean!): PricingTerm @auth
  togglePricingTermQC(id: Int!): PricingTerm @auth
  deletePricingTerms(idList: [Int]!): [Int] @auth

  createDiscount(
    id: Int!
    name: String!
    discountTypeId: Int
    discountValue: Float!
    journeyTypeId: Int
    directionTypeId: Int
  ): Discount @auth
  copyDiscount(
    pricingTermId: Int!
    id: Int!
    name: String!
    discountTypeId: Int
    discountValue: Float!
    journeyTypeId: Int
    directionTypeId: Int
  ): Discount @auth
  editDiscount(
    pricingTermId: Int!
    id: Int!
    name: String!
    discountTypeId: Int
    discountValue: Float!
    journeyTypeId: Int
    directionTypeId: Int
  ): Discount @auth
  deleteDiscounts(pricingTermId: Int!, idList: [Int]!): [Int] @auth

  saveNote(
    pricingTermId: Int!
    important: Boolean
    message: String
    assigneeId: Int!
  ): Note
}
`;
