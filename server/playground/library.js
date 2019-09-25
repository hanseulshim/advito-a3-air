export default {
  name: 'Library Queries',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'MY^PR3TTYP0NY' },
  query: `
  {
    airportList {
      id
      countryName
      cityCode
      cityName
      airportCode
      airportName
    }
    bookingClassList {
      id
      code
      name
      mappingCount
    }
    airlineMappingList(bookingClassId: 1) {
      id
      code
      name
      ticketingDate
      travelDate
      exceptionCount
    }
    exceptionList(exceptionId: 41) {
      id
      order
      originCode
      destinationCode
      overrideFareCategory
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
    marketGeoList {
      id
      code
      name
      locationType
    }
  }`
};
