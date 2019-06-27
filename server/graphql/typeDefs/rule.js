exports.rule = `
type TicketingDate {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

input TicketingDateInput {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

 TravelDate {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

input TravelDateInput {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

type PointOfSale {
  id: Int
  ruleContainerId: String
  countryCode: String
  isDeleted: Boolean
}

input PointOfSaleInput {
  id: Int
  ruleContainerId: String
  countryCode: String
  isDeleted: Boolean
}

type PointOfOrigin {
  id: Int
  ruleContainerId: String
  countryCode: String
  isDeleted: Boolean
}

input PointOfOriginInput {
  id: Int
  ruleContainerId: String
  countryCode: String
  isDeleted: Boolean
}

type GeographyRule {
  code: String
  name: String
  locationType: Int
}

type Market {
  id: Int
  ruleContainerId: String
  origin: String
  originType: Int
  arrival: String
  arrivalType: Int
  exclude: Boolean
  isDeleted: Boolean
}

input MarketInput {
  id: Int
  ruleContainerId: String
  origin: String
  originType: Int
  arrival: String
  arrivalType: Int
  exclude: Boolean
  isDeleted: Boolean
}

type FareBasis {
  id: Int
  ruleContainerId: String
  name: String
  type: Int
  basisType: Int
  matchExclude: Boolean
  matchValue: String
  endsWithExclude: Boolean
  endsWithValue: String
  startsWithExclude: Boolean
  startsWithValue: String
  containsExclude: Boolean
  containsValue: String
  containsPosition: Int
  containsMultipleExclude: Boolean
  containsMultipleValue: String
  containsMultiplePosition: Int
  isDeleted: Boolean
}

input FareBasisInput {
  id: Int
  ruleContainerId: String
  name: String
  type: Int
  basisType: Int
  matchExclude: Boolean
  matchValue: String
  endsWithExclude: Boolean
  endsWithValue: String
  startsWithExclude: Boolean
  startsWithValue: String
  containsExclude: Boolean
  containsValue: String
  containsPosition: Int
  containsMultipleExclude: Boolean
  containsMultipleValue: String
  containsMultiplePosition: Int
  isDeleted: Boolean
}

type FareBasisUnit {
  id: Int
  name: String
}

type BookingClass {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  bookingClassType: Int
  bookingClass: String
  isDeleted: Boolean
}

type BookingClassCode {
  fareCategoryId: Int
  code: String
}

input BookingClassInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  bookingClassType: Int
  bookingClass: String
  isDeleted: Boolean
}

type Airline {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  ruleType: Int
  carrierCode: String
  isDeleted: Boolean
}

input AirlineInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  ruleType: Int
  carrierCode: String
  isDeleted: Boolean
}

type AirlineCode {
  code: String
  name: String
}

type TicketDesignator {
  id: Int
  ruleContainerId: String
  ticketDesignator: String
  isDeleted: Boolean
}

input TicketDesignatorInput {
  id: Int
  ruleContainerId: String
  ticketDesignator: String
  isDeleted: Boolean
}

type TourCode {
  id: Int
  ruleContainerId: String
  tourCode: String
  isDeleted: Boolean
}

input TourCodeInput {
  id: Int
  ruleContainerId: String
  tourCode: String
  isDeleted: Boolean
}

type AdvancedTicketing {
  id: Int
  ruleContainerId: String
  unit: Int
  startRange: Int
  endRange: Int
  isDeleted: Boolean
}

input AdvancedTicketingInput {
  id: Int
  ruleContainerId: String
  unit: Int
  startRange: Int
  endRange: Int
  isDeleted: Boolean
}

type MinStay {
  id: Int
  ruleContainerId: String
  unit: Int
  value: Int
  dayOfWeekInclusion: Int
  isDeleted: Boolean
}

input MinStayInput {
  id: Int
  ruleContainerId: String
  unit: Int
  value: Int
  dayOfWeekInclusion: Int
  isDeleted: Boolean
}

type MaxStay {
  id: Int
  ruleContainerId: String
  unit: Int
  value: Int
  isDeleted: Boolean
}

input MaxStayInput {
  id: Int
  ruleContainerId: String
  unit: Int
  value: Int
  isDeleted: Boolean
}

type DayOfWeek {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  startDay: Int
  startTime: String
  endDay: Int
  endTime: String
  isDeleted: Boolean
}

input DayOfWeekInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  startDay: Int
  startTime: String
  endDay: Int
  endTime: String
  isDeleted: Boolean
}

type Stops {
  id: Int
  ruleContainerId: String
  minStops: Int
  maxStops: Int
  isDeleted: Boolean
}

input StopsInput {
  id: Int
  ruleContainerId: String
  minStops: Int
  maxStops: Int
  isDeleted: Boolean
}

type ConnectionPoint {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  connection: String
  connectionGeoType: Int
  isDeleted: Boolean
}

input ConnectionPointInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  connection: String
  connectionGeoType: Int
  isDeleted: Boolean
}

type FlightNumber {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  segmentType: Int
  carrierCode: String
  startRange: Int
  endRange: Int
  isDeleted: Boolean
}

input FlightNumberInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  segmentType: Int
  carrierCode: String
  startRange: Int
  endRange: Int
  isDeleted: Boolean
}

type Blackout {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

input BlackoutInput {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  isDeleted: Boolean
}

type Distance {
  id: Int
  ruleContainerId: String
  distanceUnit: Int
  minDistance: Int
  maxDistance: Int
  isDeleted: Boolean
}

input DistanceInput {
  id: Int
  ruleContainerId: String
  distanceUnit: Int
  minDistance: Int
  maxDistance: Int
  isDeleted: Boolean
}

type Cabin {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  cabin: String
  isDeleted: Boolean
}

input CabinInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  cabin: String
  isDeleted: Boolean
}

type FareCategory {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  fareCategory: Int
  isDeleted: Boolean
}

type FareCategoryUnit {
  id: Int
  cabinId: Int
  code: String
  name: String
  shortName: String
}

input FareCategoryInput {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  fareCategory: Int
  isDeleted: Boolean
}

type DayUnit {
  id: Int
  name: String
}

type DayOfWeekUnit {
  id: Int
  name: String
}

extend type Query {
  ruleList(parentId: Int, parentType: Int): [Int] @auth
  geographyRuleList: [GeographyRule] @auth
  marketGeoList: [GeographyRule] @auth
  dayUnitList: [DayUnit] @auth
  dayOfWeekUnitList: [DayOfWeekUnit] @auth
  fareCategoryUnitList: [FareCategoryUnit] @auth
  fareBasisUnitList: [FareBasisUnit] @auth
  ticketingDateList(parentId: Int, parentType: Int): [TicketingDate] @auth
  travelDateList(parentId: Int, parentType: Int): [TravelDate] @auth
  pointOfSaleList(parentId: Int, parentType: Int): [PointOfSale] @auth
  pointOfOriginList(parentId: Int, parentType: Int): [PointOfOrigin] @auth
  marketList(parentId: Int, parentType: Int): [Market] @auth
  fareBasisList(parentId: Int): [FareBasis] @auth
  bookingClassList(parentId: Int, bookingClassType: Int): [BookingClass] @auth
  bookingClassCodeList: [BookingClassCode] @auth
  airlineList(parentId: Int, airlineType: Int): [Airline] @auth
  airlineCodeList: [AirlineCode] @auth
  ticketDesignatorList(parentId: Int): [TicketDesignator] @auth
  tourCodeList(parentId: Int): [TourCode] @auth
  advancedTicketingList(parentId: Int): [AdvancedTicketing] @auth
  minStayList(parentId: Int): [MinStay] @auth
  maxStayList(parentId: Int): [MaxStay] @auth
  dayOfWeekList(parentId: Int): [DayOfWeek] @auth
  stopsList(parentId: Int): [Stops] @auth
  connectionPointList(parentId: Int): [ConnectionPoint] @auth
  flightNumberList(parentId: Int): [FlightNumber] @auth
  blackoutList(parentId: Int): [Blackout] @auth
  distanceList(parentId: Int): [Distance] @auth
  cabinList(parentId: Int): [Cabin] @auth
  fareCategoryList(parentId: Int): [FareCategory] @auth
}

extend type Mutation {
  updateTicketingDate(parentId: Int!, parentType: Int, ticketingDateList: [TicketingDateInput]!): [TicketingDate] @auth
  updateTravelDate(parentId: Int!, parentType: Int, travelDateList: [TravelDateInput]!): [TravelDate] @auth
  updatePointOfSale(parentId: Int!, parentType: Int, pointOfSaleList: [PointOfSaleInput]!): [PointOfSale] @auth
  updatePointOfOrigin(parentId: Int!, parentType: Int, pointOfOriginList: [PointOfOriginInput]!): [PointOfOrigin] @auth
  updateMarket(parentId: Int!, parentType: Int, marketList: [MarketInput]!): [Market] @auth
  updateBookingClass(parentId: Int!, bookingClassType: Int, bookingClassList: [BookingClassInput]!): [BookingClass] @auth
  updateAirline(parentId: Int!, airlineType: Int, airlineList: [AirlineInput]!): [Airline] @auth
  updateTicketDesignator(parentId: Int! ticketDesignatorList: [TicketDesignatorInput]!): [TicketDesignator] @auth
  updateTourCode(parentId: Int! tourCodeList: [TourCodeInput]!): [TourCode] @auth
  updateStops(parentId: Int! stopsList: [StopsInput]!): [Stops] @auth
  updateAdvancedTicketing(parentId: Int! advancedTicketingList: [AdvancedTicketingInput]!): [AdvancedTicketing] @auth
  updateMinStay(parentId: Int! minStayList: [MinStayInput]!): [MinStay] @auth
  updateMaxStay(parentId: Int! maxStayList: [MaxStayInput]!): [MaxStay] @auth
  updateDayOfWeek(parentId: Int! dayOfWeekList: [DayOfWeekInput]!): [DayOfWeek] @auth
  updateConnectionPoint(parentId: Int! connectionPointList: [ConnectionPointInput]!): [ConnectionPoint] @auth
  updateFlightNumber(parentId: Int! flightNumberList: [FlightNumberInput]!): [FlightNumber] @auth
  updateDistance(parentId: Int! distanceList: [DistanceInput]!): [Distance] @auth
  updateCabin(parentId: Int! cabinList: [CabinInput]!): [Cabin] @auth
  updateFareCategory(parentId: Int! fareCategoryList: [FareCategoryInput]!): [FareCategory] @auth
  updateBlackout(parentId: Int! blackoutList: [BlackoutInput]!): [Blackout] @auth
  updateFareBasis(parentId: Int!, fareBasisType: Int, fareBasisList: [FareBasisInput]!): [FareBasis] @auth
  deleteRule(id: Int!, ruleType: Int!): Int @auth
}

`;
