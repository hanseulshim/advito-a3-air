import gql from 'graphql-tag';

export const GET_RULE_LIST = gql`
  query ruleList($parentId: Int, $parentType: Int) {
    ruleList(parentId: $parentId, parentType: $parentType)
  }
`;

export const GET_GEO_LIST = gql`
  query geographyRuleList {
    geographyRuleList {
      code
      name
      locationType
    }
  }
`;

export const GET_MARKET_LIST = gql`
  query marketList {
    marketList {
      code
      name
      locationType
    }
  }
`;

export const GET_TICKETING_DATE_LIST = gql`
  query ticketingDateList($parentId: Int, $parentType: Int) {
    ticketingDateList(parentId: $parentId, parentType: $parentType) {
      id
      ruleContainerId
      startDate
      endDate
      isDeleted
    }
  }
`;

export const GET_TRAVEL_DATE_LIST = gql`
  query travelDateList($parentId: Int, $parentType: Int) {
    travelDateList(parentId: $parentId, parentType: $parentType) {
      id
      ruleContainerId
      startDate
      endDate
      isDeleted
    }
  }
`;

export const GET_POINT_OF_SALE_LIST = gql`
  query pointOfSaleList($parentId: Int, $parentType: Int) {
    pointOfSaleList(parentId: $parentId, parentType: $parentType) {
      id
      ruleContainerId
      countryCode
      isDeleted
    }
  }
`;

export const GET_POINT_OF_ORIGIN_LIST = gql`
  query pointOfOriginList($parentId: Int, $parentType: Int) {
    pointOfOriginList(parentId: $parentId, parentType: $parentType) {
      id
      ruleContainerId
      countryCode
      isDeleted
    }
  }
`;

export const GET_MARKET_RULE_LIST = gql`
  query marketRuleList($parentId: Int, $parentType: Int) {
    marketRuleList(parentId: $parentId, parentType: $parentType) {
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

export const GET_BOOKING_CLASS_CODES = gql`
  query bookingClassCodeList {
    bookingClassCodeList {
      fareCategoryId
      code
    }
  }
`;

export const GET_BOOKING_CLASS_LIST = gql`
  query bookingClassList($parentId: Int, $bookingClassType: Int) {
    bookingClassList(parentId: $parentId, bookingClassType: $bookingClassType) {
      id
      ruleContainerId
      exclude
      bookingClassType
      bookingClass
      isDeleted
    }
  }
`;

export const GET_AIRLINE_CODE_LIST = gql`
  query airlineCodeList {
    airlineCodeList {
      code
      name
    }
  }
`;

export const GET_AIRLINE_RULE_LIST = gql`
  query airlineRuleList($parentId: Int, $airlineType: Int, $parentType: Int) {
    airlineRuleList(
      parentId: $parentId
      airlineType: $airlineType
      parentType: $parentType
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

export const GET_TICKET_DESIGNATOR_LIST = gql`
  query ticketDesignatorList($parentId: Int) {
    ticketDesignatorList(parentId: $parentId) {
      id
      ruleContainerId
      ticketDesignator
      isDeleted
    }
  }
`;

export const GET_TOUR_CODE_LIST = gql`
  query tourCodeList($parentId: Int) {
    tourCodeList(parentId: $parentId) {
      id
      ruleContainerId
      tourCode
      isDeleted
    }
  }
`;

export const GET_STOPS_LIST = gql`
  query stopsList($parentId: Int) {
    stopsList(parentId: $parentId) {
      id
      ruleContainerId
      minStops
      maxStops
      isDeleted
    }
  }
`;

export const GET_ADVANCED_TICKETING_LIST = gql`
  query advancedTicketingList($parentId: Int) {
    advancedTicketingList(parentId: $parentId) {
      id
      ruleContainerId
      unit
      startRange
      endRange
      isDeleted
    }
  }
`;

export const GET_DAY_OF_WEEK_UNIT_LIST = gql`
  query dayOfWeekUnitList {
    dayOfWeekUnitList {
      id
      name
    }
  }
`;

export const GET_DAY_UNIT_LIST = gql`
  query dayUnitList {
    dayUnitList {
      id
      name
    }
  }
`;

export const GET_MIN_STAY_LIST = gql`
  query minStayList($parentId: Int) {
    minStayList(parentId: $parentId) {
      id
      ruleContainerId
      unit
      value
      dayOfWeekInclusion
      isDeleted
    }
  }
`;

export const GET_MAX_STAY_LIST = gql`
  query maxStayList($parentId: Int) {
    maxStayList(parentId: $parentId) {
      id
      ruleContainerId
      unit
      value
      isDeleted
    }
  }
`;

export const GET_DAY_OF_WEEK_LIST = gql`
  query dayOfWeekList($parentId: Int) {
    dayOfWeekList(parentId: $parentId) {
      id
      ruleContainerId
      exclude
      startDay
      startTime
      endDay
      endTime
      isDeleted
    }
  }
`;

export const GET_FLIGHT_NUMBER_LIST = gql`
  query flightNumberList($parentId: Int) {
    flightNumberList(parentId: $parentId) {
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

export const GET_CONNECTION_POINT_LIST = gql`
  query connectionPointList($parentId: Int) {
    connectionPointList(parentId: $parentId) {
      id
      ruleContainerId
      exclude
      connection
      connectionGeoType
      isDeleted
    }
  }
`;

export const GET_DISTANCE_LIST = gql`
  query distanceList($parentId: Int) {
    distanceList(parentId: $parentId) {
      id
      ruleContainerId
      distanceUnit
      minDistance
      maxDistance
      isDeleted
    }
  }
`;

export const GET_CABIN_LIST = gql`
  query cabinList($parentId: Int) {
    cabinList(parentId: $parentId) {
      id
      ruleContainerId
      exclude
      cabin
      isDeleted
    }
  }
`;

export const GET_FARE_CATEGORY_UNIT_LIST = gql`
  query fareCategoryUnitList {
    fareCategoryUnitList {
      id
      cabinId
      code
      name
      shortName
    }
  }
`;

export const GET_FARE_CATEGORY_LIST = gql`
  query fareCategoryList($parentId: Int) {
    fareCategoryList(parentId: $parentId) {
      id
      ruleContainerId
      exclude
      fareCategory
      isDeleted
    }
  }
`;

export const GET_BLACKOUT_LIST = gql`
  query blackoutList($parentId: Int) {
    blackoutList(parentId: $parentId) {
      id
      ruleContainerId
      startDate
      endDate
      isDeleted
    }
  }
`;

export const GET_FARE_BASIS_UNIT_LIST = gql`
  query fareBasisUnitList {
    fareBasisUnitList {
      id
      name
    }
  }
`;

export const GET_FARE_BASIS_LIST = gql`
  query fareBasisList($parentId: Int, $fareBasisType: Int) {
    fareBasisList(parentId: $parentId, fareBasisType: $fareBasisType) {
      id
      ruleContainerId
      name
      type
      basisType
      matchExclude
      matchValue
      endsWithExclude
      endsWithValue
      startsWithExclude
      startsWithValue
      containsExclude
      containsValue
      containsPosition
      containsMultipleExclude
      containsMultipleValue
      containsMultiplePosition
      isDeleted
    }
  }
`;
