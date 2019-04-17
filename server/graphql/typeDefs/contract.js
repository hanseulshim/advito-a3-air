exports.contract = `
type Contract {
  id: Int
  name: String
  type: String
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
  discountList: Int
  pointOfSaleList: [String]
  pointOfOriginList: [String]
  airlineList: [String]
  ignore: Boolean
  isDeleted: Boolean
  note: String
}

extend type Query {
  contractList: [Contract] @auth
  contractTypeList: [ContractType] @auth
  pricingTermList: [PricingTerm] @auth
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

  deletePricingTerms(idList: [Int]!): [Int] @auth
}
`;
