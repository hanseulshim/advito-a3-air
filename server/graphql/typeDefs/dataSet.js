exports.dataSetDefs = `
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
type ImportError {
  id: Int
  name: String
  importedTicketsTotal: Int
  errorTicketsTotal: Int
  errorRatioTotal: Int
  columns: [ImportErrorColumn]
}
type ImportErrorColumn {
  id: Int
  name: String
  importedTickets: Int
  errorTickets: Int
  errorRatio: Int
  dateUpdated: Date
  status: String
}
extend type Query {
  posTrendsCountryList: [TrendCategory] @auth
  posTrendsColumnList: [PosTrendColumn] @auth
  divisionTrendsList: [TrendCategory] @auth
  divisionTrendsColumnList: [DivisionTrendColumn] @auth
  importErrorList: [ImportError] @auth
}
extend type Mutation {
  togglePosTrend(id: Int!): PosTrendColumn @auth
  toggleDivisionTrend(id: Int!): DivisionTrendColumn @auth
}
`;
