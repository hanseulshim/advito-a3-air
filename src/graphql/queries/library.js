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
