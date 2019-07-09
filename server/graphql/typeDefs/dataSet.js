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
  annMonths: Int
}
type DataSetDivision {
  id: Int
  name: String
  ticketsTotal: Int
  segmentsTotal: Int
  farePaidTotal: Int
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
  tickets: Int
  segments: Int
  farePaid: Int
  importedTickets: Int
  errorTickets: Int
  errorRatio: Int
}
type DivisionData {
  tickets: Int
  segments: Int
  farePaid: Int
}

extend type Query {
  dataSetCountryList: [DataSetCountry] @auth
  dataSetDivisionList: [DataSetDivision] @auth
  dataSetColumnList: [DataSetColumn] @auth
}
extend type Mutation {
  toggleDataSet(month: Int!, year: Int!, qc: Boolean): Boolean @auth
  deleteDataSet(month: Int!, year: Int!): Int @auth
  setAnnualization(type: Int, annMonthsList: [DataSetAnnualization]!): Int @auth
}
`;
