exports.dataSetDefs = `
type PosTrend {
  id: Int
  name: String
  ticketsTotal: Int
  segmentsTotal: Int
  farePaidTotal: Int
  columns: [PosTrendColumn]
}
type PosTrendColumn {
  id: Int
  name: String
  tickets: Int
  segments: Int
  farePaid: Int
  dateUpdated: Date
  status: String
}
type DivisionTrend {
  id: Int
  name: String
  ticketsTotal: Int
  segmentsTotal: Int
  farePaidTotal: Int
  columns: [DivisionTrendColumn]
}
type DivisionTrendColumn {
  id: Int
  name: String
  tickets: Int
  segments: Int
  farePaid: Int
  dateUpdated: Date
  status: String
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
  posTrendList: [PosTrend] @auth
  divisionTrendList: [DivisionTrend] @auth
  importErrorList: [ImportError] @auth
}
`;
