exports.contractDefs = `
type Contract {
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

extend type Query {
  contractList: [Contract] @auth
}
`;
