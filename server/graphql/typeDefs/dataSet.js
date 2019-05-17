exports.dataSet = `
type DataSetCountry {
  id: Int
  name: String
  ticketsTotal: Int
  segmentsTotal: Int
  farePaidTotal: Int
  importedTicketsTotal: Int
  errorTicketsTotal: Int
  errorRatioTotal: Int
  numberDatasets: Int
}
type DataSetDivision {
  id: Int
  name: String
  ticketsTotal: Int
  segmentsTotal: Int
  farePaidTotal: Int
}
type DataSetColumn {
  id: Int
  name: String
  dateUpdated: Date
  status: String
  posTrendList: [PosTrend]
  divisionTrendList: [DivisionTrend]
  importErrorsList: [ImportError]
}
type PosTrend {
  id: Int
  countryId: Int
  name: String
  tickets: Int
  segments: Int
  farePaid: Int
}
type DivisionTrend {
  id: Int
  divisionId: Int
  name: String
  tickets: Int
  segments: Int
  farePaid: Int
}
type ImportError {
  id: Int
  countryId: Int
  name: String
  importedTickets: Int
  errorTickets: Int
  errorRatio: Int
}
extend type Query {
  dataSetCountryList: [DataSetCountry] @auth
  dataSetDivisionList: [DataSetDivision] @auth
  dataSetColumnList: [DataSetColumn] @auth
}
extend type Mutation {
  toggleDataSet(id: Int!, status: String): DataSetColumn @auth
  deleteDataSet(id: Int!): Int @auth
}
`;
