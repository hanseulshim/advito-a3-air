import gql from 'graphql-tag';

export const GET_AIRPORT_LIST = gql`
  {
    airportList {
      countryName
      cityCode
      cityName
      airportCode
      airportName
    }
  }
`;

export const GET_BOOKING_CLASS_LIST = gql`
  {
    bookingClassList {
      id
      code
      name
      mappingCount
    }
  }
`;

export const GET_AIRLINE_MAPPING_LIST = gql`
  query airlineMappingList($bookingClassId: Int!) {
    airlineMappingList(bookingClassId: $bookingClassId) {
      id
      code
      name
      ticketingDate
      travelDate
      exceptionCount
    }
  }
`;

export const GET_EXCEPTION_LIST = gql`
  query exceptionList($exceptionId: Int!) {
    exceptionList(exceptionId: $exceptionId) {
      id
      order
      originCode
      destinationCode
      overrideFareCategory
    }
  }
`;

export const GET_CURRENCY_LIST = gql`
  {
    currencyList {
      id
      name
      code
    }
  }
`;

export const GET_DISTANCE_UNIT_LIST = gql`
  {
    distanceUnitList {
      id
      name
    }
  }
`;
