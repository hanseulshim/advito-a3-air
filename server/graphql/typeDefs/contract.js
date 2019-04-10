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
`;
