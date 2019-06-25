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
      airlineList: $airlineList
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

export const UPDATE_TICKETING_DESIGNATOR = gql`
  mutation updateTicketDesignator(
    $parentId: Int!
    $ticketDesignatorList: [TicketDesignatorInput]!
  ) {
    updateTicketDesignator(
      parentId: $parentId
      ticketDesignatorList: $ticketDesignatorList
    ) {
      id
      ruleContainerId
      ticketDesignator
      isDeleted
    }
  }
`;

export const UPDATE_TOUR_CODE_LIST = gql`
  mutation updateTourCode($parentId: Int!, $tourCodeList: [TourCodeInput]!) {
    updateTourCode(parentId: $parentId, tourCodeList: $tourCodeList) {
      id
      ruleContainerId
      tourCode
      isDeleted
    }
  }
`;

export const UPDATE_STOPS_LIST = gql`
  mutation updateStops($parentId: Int!, $stopsList: [StopsInput]!) {
    updateStops(parentId: $parentId, stopsList: $stopsList) {
      id
      ruleContainerId
      minStops
      maxStops
      isDeleted
    }
  }
`;

export const UPDATE_ADVANCED_TICKETING_LIST = gql`
  mutation updateAdvancedTicketing(
    $parentId: Int!
    $advancedTicketingList: [AdvancedTicketingInput]!
  ) {
    updateAdvancedTicketing(
      parentId: $parentId
      advancedTicketingList: $advancedTicketingList
    ) {
      id
      ruleContainerId
      unit
      startRange
      endRange
      isDeleted
    }
  }
`;

export const UPDATE_MIN_STAY_LIST = gql`
  mutation updateMinStay($parentId: Int!, $minStayList: [MinStayInput]!) {
    updateMinStay(parentId: $parentId, minStayList: $minStayList) {
      id
      ruleContainerId
      unit
      value
      dayOfWeekInclusion
      isDeleted
    }
  }
`;

export const UPDATE_MAX_STAY_LIST = gql`
  mutation updateMaxStay($parentId: Int!, $maxStayList: [MaxStayInput]!) {
    updateMaxStay(parentId: $parentId, maxStayList: $maxStayList) {
      id
      ruleContainerId
      unit
      value
      isDeleted
    }
  }
`;

export const UPDATE_FLIGHT_NUMBER_LIST = gql`
  mutation updateFlightNumber(
    $parentId: Int!
    $flightNumberList: [FlightNumberInput]!
  ) {
    updateFlightNumber(
      parentId: $parentId
      flightNumberList: $flightNumberList
    ) {
      id
      ruleContainerId
      exclude
      segmentType
      carrierCode
      startRange
      endRange
      isDeleted
    }
  }
`;

export const UPDATE_CONNECTION_POINT_LIST = gql`
  mutation updateConnectionPoint(
    $parentId: Int!
    $connectionPointList: [ConnectionPointInput]!
  ) {
    updateConnectionPoint(
      parentId: $parentId
      connectionPointList: $connectionPointList
    ) {
      id
      ruleContainerId
      exclude
      connection
      connectionGeoType
      isDeleted
    }
  }
`;
