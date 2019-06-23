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

export const GET_BOOKING_CLASS_LIBRARY_LIST = gql`
  {
    bookingClassLibraryList {
      class
      defaultFareCategory
      dateUpdated
      airlineMappingList {
        code
        name
        ticketingDate
        travelDate
        exceptionList {
          recordOrder
          originCode
          destinationCode
          overrideFareCategory
        }
      }
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

export const GET_GEO_LIST = gql`
  {
    geographyRuleList {
      name
      code
      locationType
    }
  }
`;
