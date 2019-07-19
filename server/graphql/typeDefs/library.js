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

type Airline {
  id: Int,
  code: String,
  name: String
}

type Currency {
  id: Int,
  name: String,
  code: String
}

type DistanceUnit {
  id: Int,
  name: String
}

type Geography {
  id: Int
  code: String
  name: String
  locationType: Int
}

type Location {
  id: Int,
  locationType: Int,
  code: String,
  name: String
}

extend type Query {
  airlineList: [Airline] @auth
  airportList: [Airport] @auth
  bookingClassLibraryList: [BookingClassLibrary] @auth
  countryList: [Geography] @auth
  currencyList: [Currency] @auth
  geographyList: [Geography] @auth
  marketList: [Geography] @auth
  distanceUnitList: [DistanceUnit] @auth
}
`;
