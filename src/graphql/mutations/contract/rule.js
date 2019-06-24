import gql from 'graphql-tag';

export const DELETE_RULE = gql`
  mutation deleteRule($id: Int!, $ruleType: Int!) {
    deleteRule(id: $id, ruleType: $ruleType)
  }
`;

export const UPDATE_TICKETING_DATES = gql`
  mutation updateTicketingDate(
    $parentId: Int!
    $parentType: Int
    $ticketingDateList: [TicketingDateInput]!
  ) {
    updateTicketingDate(
      parentId: $parentId
      parentType: $parentType
      ticketingDateList: $ticketingDateList
    ) {
      id
      ruleContainerId
      startDate
      endDate
      isDeleted
    }
  }
`;

export const UPDATE_TRAVEL_DATES = gql`
  mutation updateTravelDate(
    $parentId: Int!
    $parentType: Int
    $travelDateList: [TravelDateInput]!
  ) {
    updateTravelDate(
      parentId: $parentId
      parentType: $parentType
      travelDateList: $travelDateList
    ) {
      id
      ruleContainerId
      startDate
      endDate
      isDeleted
    }
  }
`;

export const UPDATE_POINT_OF_SALE = gql`
  mutation updatePointOfSale(
    $parentId: Int!
    $parentType: Int
    $pointOfSaleList: [PointOfSaleInput]!
  ) {
    updatePointOfSale(
      parentId: $parentId
      parentType: $parentType
      pointOfSaleList: $pointOfSaleList
    ) {
      id
      ruleContainerId
      countryCode
      isDeleted
    }
  }
`;

export const UPDATE_POINT_OF_ORIGIN = gql`
  mutation updatePointOfOrigin(
    $parentId: Int!
    $parentType: Int
    $pointOfOriginList: [PointOfOriginInput]!
  ) {
    updatePointOfOrigin(
      parentId: $parentId
      parentType: $parentType
      pointOfOriginList: $pointOfOriginList
    ) {
      id
      ruleContainerId
      countryCode
      isDeleted
    }
  }
`;

export const UPDATE_MARKET = gql`
  mutation updateMarket(
    $parentId: Int!
    $parentType: Int
    $marketList: [MarketInput]!
  ) {
    updateMarket(
      parentId: $parentId
      parentType: $parentType
      marketList: $marketList
    ) {
      id
      ruleContainerId
      origin
      originType
      arrival
      arrivalType
      exclude
      isDeleted
    }
  }
`;

export const UPDATE_BOOKING_CLASS = gql`
  mutation updateBookingClass(
    $parentId: Int!
    $bookingClassType: Int!
    $bookingClassList: [BookingClassInput]!
  ) {
    updateBookingClass(
      parentId: $parentId
      bookingClassType: $bookingClassType
      bookingClassList: $bookingClassList
    ) {
      id
      ruleContainerId
      exclude
      bookingClassType
      bookingClass
      isDeleted
    }
  }
`;

export const UPDATE_AIRLINE = gql`
  mutation updateAirline(
    $parentId: Int!
    $airlineType: Int!
    $airlineList: [AirlineInput]!
  ) {
    updateAirline(
      parentId: $parentId
      airlineType: $airlineType
      airineList: $airineList
    ) {
      id
      ruleContainerId
      exclude
      ruleType
      carrierCode
      isDeleted
    }
  }
`;
