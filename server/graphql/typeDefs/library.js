exports.library = `
type Airport {
  countryName: String,
  cityCode: String,
  cityName: String,
  airportCode: String,
  airportName: String
}
type BookingClassLibrary {
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

type Currency {
  id: Int,
  name: String,
  code: String
}

type Location {
  id: Int,
  locationType: Int,
  code: String,
  name: String
}

type DistanceUnit {
  id: Int,
  name: String
}

extend type Query {
  airportList: [Airport] @auth
  bookingClassLibraryList: [BookingClassLibrary] @auth
  currencyList: [Currency] @auth
  locationList: [Location] @auth
  distanceUnitList: [DistanceUnit] @auth
}
`;
