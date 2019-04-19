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
}
type DataSetDivision {
  id: Int
  name: String
  ticketsTotal: Int
  segmentsTotal: Int
  farePaidTotal: Int
}
type TrendCategory {
  id: Int
  name: String
  ticketsTotal: Int
  segmentsTotal: Int
  farePaidTotal: Int
}
type PosTrendColumn {
  id: Int
  name: String
  dateUpdated: Date
  status: String
  data: [PosTrend]
}
type PosTrend {
  id: Int
  countryId: Int
  name: String
  tickets: Int
  segments: Int
  farePaid: Int
}
type DivisionTrendColumn {
  id: Int
  name: String
  dateUpdated: Date
  status: String
  data: [DivisionTrend]
}
type DivisionTrend {
  id: Int
  divisionId: Int
  name: String
  tickets: Int
  segments: Int
  farePaid: Int
}
type ImportErrorCategory {
  id: Int
  name: String
  importedTicketsTotal: Int
  errorTicketsTotal: Int
  errorRatioTotal: Int
}
type ImportErrorColumn {
  id: Int
  name: String
  dateUpdated: Date
  status: String
  data: [ImportError]
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
  posTrendsCountryList: [TrendCategory] @auth
  posTrendsColumnList: [PosTrendColumn] @auth
  divisionTrendsList: [TrendCategory] @auth
  divisionTrendsColumnList: [DivisionTrendColumn] @auth
  importErrorsCountryList: [ImportErrorCategory] @auth
  importErrorsColumnList: [ImportErrorColumn] @auth
}
extend type Mutation {
  togglePosTrend(id: Int!, status: String): PosTrendColumn @auth
  toggleDivisionTrend(id: Int!, status: String): DivisionTrendColumn @auth
  toggleImportError(id: Int!, status: String): ImportErrorColumn @auth
  deletePosTrend(id: Int!): Int @auth
  deleteDivisionTrend(id: Int!): Int @auth
  deleteImportError(id: Int!): Int @auth
}
`;
