exports.rule = {
  queries: {
    name: 'Rule Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      ruleList(parentId: 34)
      #geographyRuleList {
      #  name
      #  code
      #}
      #marketGeoList {
      #  name
      #  code
      #  locationType
      #}
      #bookingClassCodeList {
      #  fareCategoryId
      #  code
      #}
      #airlineCodeList {
      #  name
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
      marketList(parentId: 34) {
        id
        ruleContainerId
        origin
        originType
        arrival
        arrivalType
        exclude
        isDeleted
      }
      bookingClassList(parentId: 34) {
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
      updateMarket(parentId: 34, marketList: [
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
      updateAirline(parentId: 34, airlineList: [
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
          unit: 2
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
          unit: 2
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
    }`
  }
};
