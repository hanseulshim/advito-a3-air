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
      bookingClassCodeList {
        fareCategoryId
        code
      }
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
    }`
  },
  mutations: {
    name: 'Rule Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
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
      deleteRule(id: 46, ruleType: 4)
    }`
  }
};
