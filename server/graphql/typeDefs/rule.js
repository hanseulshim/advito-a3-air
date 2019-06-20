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

type TravelDate {
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

type PointOfOrigin {
  id: Int
  ruleContainerId: String
  countryCode: String
  isDeleted: Boolean
}

type GeographyRule {
  code: String,
  name: String
}

type Market {
  id: Int
  ruleContainerId: String
  origin: String
  originType: Int
  arrival: String
  arrivalType: Int
  isDeleted: Boolean
}

type FareBasis {
  id: Int
  ruleContainerId: String
  name: String
  type: Int
  isDeleted: Boolean
}

type BookingClass {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  type: Int
  bookingClass: String
  isDeleted: Boolean
}

type Airline {
  id: Int
  ruleContainerId: String
  exclude: Boolean
  type: Int
  carrierCode: String
  isDeleted: Boolean
}

type TicketDesignator {
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

type AdvancedTicketing {
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
  dayOfWeekRecurrence: Int
  isDeleted: Boolean
}

type MaxStay {
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

type Stops {
  id: Int
  ruleContainerId: String
  minstops: Int
  maxstops: Int
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

type Blackout {
  id: Int
  ruleContainerId: String
  startDate: Date
  endDate: Date
  origin: String
  originType: Int
  arrival: String
  arrivalType: Int
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

type Cabin {
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

extend type Query {
  ruleList(parentId: Int, parentType: Int): [Int] @auth
  geographyRuleList: [GeographyRule] @auth
  ticketingDateList(parentId: Int, parentType: Int): [TicketingDate] @auth
  travelDateList(parentId: Int, parentType: Int): [TravelDate] @auth
  pointOfSaleList(parentId: Int, parentType: Int): [PointOfSale] @auth
  pointOfOriginList(parentId: Int, parentType: Int): [PointOfOrigin] @auth
  marketList(parentId: Int, parentType: Int): [Market] @auth
  fareBasisList(discountId: Int): [FareBasis] @auth
  bookingClassList(discountId: Int): [BookingClass] @auth
  airlineList(parentId: Int, parentType: Int): [Airline] @auth
  ticketDesignatorList(discountId: Int): [TicketDesignator] @auth
  tourCodeList(discountId: Int): [TourCode] @auth
  advancedTicketingList(discountId: Int): [AdvancedTicketing] @auth
  minStayList(discountId: Int): [MinStay] @auth
  maxStayList(discountId: Int): [MaxStay] @auth
  dayOfWeekList(discountId: Int): [DayOfWeek] @auth
  stopsList(discountId: Int): [Stops] @auth
  connectionPointList(discountId: Int): [ConnectionPoint] @auth
  flightNumberList(discountId: Int): [FlightNumber] @auth
  blackoutList(discountId: Int): [Blackout] @auth
  distanceList(discountId: Int): [Distance] @auth
  cabinList(discountId: Int): [Cabin] @auth
  fareCategoryList(discountId: Int): [FareCategory] @auth
}

extend type Mutation {
  updateTicketingDates(parentId: Int!, parentType: Int, ticketingDateList: [TicketingDateInput]): [TicketingDate] @auth
  deleteTicketingDate(id: Int!): Int @auth
  updateTravelDates(parentId: Int!, parentType: Int, travelDateList: [TravelDateInput]): [TravelDate] @auth
  deleteTravelDate(id: Int!): Int @auth
}

`;
