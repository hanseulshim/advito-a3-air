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

extend type Query {
  contractList: [Contract] @auth
  contractTypeList: [ContractType] @auth
}

extend type Mutation {
  createContract(
    name: String!
    typeId: Int!
    round: Int
    effectiveStartDate: Date!
    effectiveEndDate: Date
    description: String
    division: String
  ): Contract @auth

  copyContract(
    id: Int!
    name: String!
  ): Contract @auth
}
`;
