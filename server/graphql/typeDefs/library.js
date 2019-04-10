exports.library = `
type Airport {
  countryName: String,
  cityCode: String,
  cityName: String,
  airportCode: String,
  airportName: String
}
type BookingClass {
  class: String,
  defaultFareCategory: String,
  dateUpdated: Date,
  airlineMappingList: [AirlineMapping]
}
type AirlineMapping {
  code: String,
  name: String,
  ticketingDate: Date,
  travelDate: Date,
  exceptionList: [AirlineMappingException]
}

type AirlineMappingException {
  recordOrder: Int,
  originCode: String,
  destinationCode: String,
  overrideFareCategory: String
}

extend type Query {
  airportList: [Airport] @auth
  bookingClassList: [BookingClass] @auth
}
`;
