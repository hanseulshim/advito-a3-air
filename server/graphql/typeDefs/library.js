exports.library = `
type Airport {
  countryName: String
  cityCode: String
  cityName: String
  airportCode: String
  airportName: String
}
type BookingClass {
  id: Int
  code: String
  name: String
  mappingCount: Int
}
type AirlineMapping {
  id: Int
  code: String
  name: String
  ticketingDate: Date
  travelDate: Date
  exceptionCount: Int
}

type Exception {
  id: Int
  order: Int
  originCode: String
  destinationCode: String
  overrideFareCategory: String
}

type Airline {
  id: Int
  code: String
  name: String
}

type Currency {
  id: Int
  name: String
  code: String
}

type DistanceUnit {
  id: Int
  name: String
}

type Geography {
  id: Int
  code: String
  name: String
  standard: Boolean
  locationType: Int
}

extend type Query {
  airlineList: [Airline] @auth
  airportList: [Airport] @auth
  bookingClassList: [BookingClass] @auth
  airlineMappingList(bookingClassId: Int!): [AirlineMapping] @auth
  exceptionList(exceptionId: Int!): [Exception] @auth
  countryList: [Geography] @auth
  currencyList: [Currency] @auth
  geographyList: [Geography] @auth
  marketList: [Geography] @auth
  distanceUnitList: [DistanceUnit] @auth
}
`;
