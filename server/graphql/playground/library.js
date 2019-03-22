exports.libraryQueries = {
  name: 'Library Queries',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'advitoValidToken' },
  query: `
  {
    airportList {
      countryName
      cityCode
      cityName
      airportCode
      airportName
    }
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
  }`
};
