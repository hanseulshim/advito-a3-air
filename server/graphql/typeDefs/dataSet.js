exports.dataSet = `
type DataSetCountry {
  id: Int
  name: String
  ticketsTotal: Float
  segmentsTotal: Float
  farePaidTotal: Float
  importedTicketsTotal: Float
  errorTicketsTotal: Float
  errorRatioTotal: Float
  numberDatasets: Int
  annMonths: Int
}
type DataSetDivision {
  id: Int
  name: String
  ticketsTotal: Float
  segmentsTotal: Float
  farePaidTotal: Float
  numberDatasets: Int
  annMonths: Int
}
input DataSetAnnualization {
  id: Int
  annMonths: Int
}
type DataSetColumn {
  name: String
  dateUpdated: Date
  qc: Boolean
  countryData: [CountryData]
  divisionData: [DivisionData]
}
type CountryData {
  tickets: Float
  segments: Float
  farePaid: Float
  importedTickets: Float
  errorTickets: Float
  errorRatio: Float
}
type DivisionData {
  tickets: Float
  segments: Float
  farePaid: Float
}

extend type Query {
  dataSetCountryList(projectId: Int): [DataSetCountry] @auth
  dataSetDivisionList(projectId: Int): [DataSetDivision] @auth
  dataSetColumnList(projectId: Int): [DataSetColumn] @auth
}
extend type Mutation {
  toggleDataSet(projectId: Int!, month: Int!, year: Int!, qc: Boolean): Boolean @auth
  deleteDataSet(projectId: Int!, month: Int!, year: Int!): Int @auth
  setAnnualization(type: Int, annMonthsList: [DataSetAnnualization]!): Int @auth
}
`;
