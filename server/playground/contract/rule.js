export default {
  queries: {
    name: 'Rule Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      ruleList(parentId: 34)
      #bookingClassCodeList {
      #  fareCategoryId
      #  code
      #}
      #dayOfWeekUnitList {
      #  id
      #  name
      #}
      #dayUnitList {
      #  id
      #  name
      #}
      #fareCategoryUnitList {
      #  id
      #  cabinId
      #  code
      #  name
      #  shortName
      #}
      #fareBasisUnitList {
      #  id
      #  name
      #}
      ticketingDateList(parentId: 34) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      }
      travelDateList(parentId: 34) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      }
      pointOfSaleList(parentId: 34) {
        id
        ruleContainerId
        countryCode
        isDeleted
      }
      pointOfOriginList(parentId: 34) {
        id
        ruleContainerId
        countryCode
        isDeleted
      }
      marketRuleList(parentId: 34) {
        id
        ruleContainerId
        origin
        originType
        arrival
        arrivalType
        exclude
        isDeleted
      }
      bookingClassRuleList(parentId: 34) {
        id
        ruleContainerId
        exclude
        bookingClassType
        bookingClass
        isDeleted
      }
      airlineList(parentId: 34) {
        id
        ruleContainerId
        exclude
        ruleType
        carrierCode
        isDeleted
      }
      ticketDesignatorList(parentId: 34) {
        id
        ruleContainerId
        ticketDesignator
        isDeleted
      }
      tourCodeList(parentId: 34) {
        id
        ruleContainerId
        tourCode
        isDeleted
      }
      stopsList(parentId: 34) {
        id
        ruleContainerId
        minStops
        maxStops
        isDeleted
      }
      advancedTicketingList(parentId: 34) {
        id
        ruleContainerId
        unit
        startRange
        endRange
        isDeleted
      }
      minStayList(parentId: 34) {
        id
        ruleContainerId
        unit
        value
        dayOfWeekInclusion
        isDeleted
      }
      maxStayList(parentId: 34) {
        id
        ruleContainerId
        unit
        value
        isDeleted
      }
      dayOfWeekList(parentId: 34) {
        id
        ruleContainerId
        exclude
        startDay
        startTime
        endDay
        endTime
        isDeleted
      }
      flightNumberList(parentId: 34) {
        id
        ruleContainerId
        exclude
        segmentType
        carrierCode
        startRange
        endRange
        isDeleted
      }
      connectionPointList(parentId: 34) {
        id
        ruleContainerId
        exclude
        connection
        connectionGeoType
        isDeleted
      }
      distanceList(parentId: 34) {
        id
        ruleContainerId
        distanceUnit
        minDistance
        maxDistance
        isDeleted
      }
      cabinList(parentId: 34) {
        id
        ruleContainerId
        exclude
        cabin
        isDeleted
      }
      fareCategoryList(parentId: 34) {
        id
        ruleContainerId
        exclude
        fareCategory
        isDeleted
      }
      blackoutList(parentId: 34) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      },
      fareBasisList(parentId: 34) {
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
    }`
  },
  mutations: {
    name: 'Rule Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      deleteRule(id: 46, ruleType: 4)
      updateTicketingDate(parentId: 34, ticketingDateList: [
        {
          id: 32,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          startDate: 1483246800001,
          endDate: 1485838800001,
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      }
      updateTicketingDateBulk(parentType: 2, ticketingDateList: [
        {
          id: 95,
          startDate: 1483246800001,
          endDate: 1485838800001
        },
        {
          id: 98,
          startDate: 1483246800001,
          endDate: 1485838800001
        }
      ])
      updateTravelDate(parentId: 34, travelDateList: [
        {
          id: 10,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          startDate: 1483246800001,
          endDate: 1485838800001,
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      }
      updateTravelDateBulk(parentType: 3, travelDateList: [
        {
          id: 217,
          startDate: 1483246800001,
          endDate: 1485838800001
        }
      ])
      updatePointOfSale(parentId: 34, pointOfSaleList: [
        {
          id: 179,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          countryCode: "UK"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        countryCode
        isDeleted
      }
      updatePointOfOrigin(parentId: 34, pointOfOriginList: [
        {
          id: null,
          ruleContainerId: null,
          countryCode: "UK"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        countryCode
        isDeleted
      }
      updateMarketRule(parentId: 34, marketRuleList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          origin: "EU"
          originType: 5
          arrival: "LA"
          arrivalType: 5,
          exclude: true,
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        origin
        originType
        arrival
        arrivalType
        exclude
        isDeleted
      }
      updateBookingClass(parentId: 34, bookingClassList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          exclude: true
          bookingClassType: 2
          bookingClass: "Z"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        bookingClassType
        bookingClass
        isDeleted
      }
      updateAirlineRule(parentId: 34, airlineRuleList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          exclude: true
          ruleType: 1
          carrierCode: "AQ"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        ruleType
        carrierCode
        isDeleted
      }
      updateTicketDesignator(parentId: 34, ticketDesignatorList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          ticketDesignator: "test"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        ticketDesignator
        isDeleted
      }
      updateTicketDesignatorBulk(parentType: 3, ticketDesignatorList: [
        {
          id: 217,
          ticketDesignator: "tour"
        }
      ])
      updateTourCode(parentId: 34, tourCodeList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          tourCode: "test"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        tourCode
        isDeleted
      }
      updateTourCodeBulk(parentType: 3, tourCodeList: [
        {
          id: 217,
          tourCode: "tour"
        }
      ])
      updateStops(parentId: 34, stopsList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          minStops: 10,
          maxStops: 15
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        minStops
        maxStops
        isDeleted
      }
      updateAdvancedTicketing(parentId: 34, advancedTicketingList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          unit: 2
          startRange: 1
          endRange: 2
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        unit
        startRange
        endRange
        isDeleted
      }
      updateMinStay(parentId: 34, minStayList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          unit: 70
          value: 10
          dayOfWeekInclusion: 3
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        unit
        value
        dayOfWeekInclusion
        isDeleted
      }
      updateMaxStay(parentId: 34, maxStayList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          unit: 70
          value: 10
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        unit
        value
        isDeleted
      }
      updateDayOfWeek(parentId: 34, dayOfWeekList: [
        {
          id: null,
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb",
          exclude: true
          startDay: 78
          startTime: "12:00 AM"
          endDay: 80
          endTime: "1:00 PM"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        startDay
        startTime
        endDay
        endTime
        isDeleted
      }
      updateConnectionPoint(parentId: 34, connectionPointList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          exclude: true
          connection: "SIN"
          connectionGeoType: 1
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        connection
        connectionGeoType
        isDeleted
      }
      updateFlightNumber(parentId: 34, flightNumberList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          exclude: true
          segmentType: 2
          carrierCode: "SW"
          startRange: 10
          endRange: 15
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        segmentType
        carrierCode
        startRange
        endRange
        isDeleted
      }
      updateDistance(parentId: 34, distanceList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          distanceUnit: 67
          minDistance: 10
          maxDistance: 15
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        distanceUnit
        minDistance
        maxDistance
        isDeleted
      }
      updateCabin(parentId: 34, cabinList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          exclude: true
          cabin: "CAB"
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        cabin
        isDeleted
      }
      updateFareCategory(parentId: 34, fareCategoryList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          exclude: true
          fareCategory: 1
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        exclude
        fareCategory
        isDeleted
      }
      updateBlackout(parentId: 34, blackoutList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          startDate: 1483246800001
          endDate: 1483246800001
          isDeleted: false
        }
      ]) {
        id
        ruleContainerId
        startDate
        endDate
        isDeleted
      }
      updateFareBasis(parentId: 34, fareBasisType: 1, fareBasisList: [
        {
          id: null
          ruleContainerId: "522498dd-8aad-43eb-99ae-a76058c3f3fb"
          name: "fare 1"
          type: 1
          basisType: 83
          matchExclude: false
          matchValue: "matches"
          endsWithExclude: null
          endsWithValue: null
          startsWithExclude: null
          startsWithValue: null
          containsExclude: null
          containsValue: null
          containsPosition: null
          containsMultipleExclude: null
          containsMultipleValue: null
          containsMultiplePosition: null
          isDeleted: false
        }
      ]) {
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
    }`
  }
};
