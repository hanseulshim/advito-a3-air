exports.defaultDataDefs = `
type DataSet {
  id: Int
  ticketingTo: Date
  ticketingFrom: Date
  uploadDate: Date
  qc: Float
  records: Int
  status: String
}

extend type Query {
  dataSetList: [DataSet] @auth
}

extend type Mutation {
  acceptDataSet(id: Int!): DataSet @auth
  rejectDataSet(id: Int!): DataSet @auth
}
`;
