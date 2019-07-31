exports.library = {
  name: 'Library Queries',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'MY^PR3TTYP0NY' },
  query: `
  {
    airportList {
      countryName
      cityCode
      cityName
      airportCode
      airportName
    }
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
    airlineList {
      id
      code
      name
    }
    countryList {
      id
      code
      name
    }
    currencyList {
      id
      name
      code
    }
    distanceUnitList {
      id
      name
    }
    geographyList {
      id
      code
      name
    }
    marketList {
      id
      code
      name
      locationType
    }
  }`
};
