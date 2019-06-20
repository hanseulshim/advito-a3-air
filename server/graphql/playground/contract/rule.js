exports.rule = {
  queries: {
    name: 'Rule Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      ruleList(parentId: 34)
      geographyRuleList {
        name
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
    }`
  },
  mutations: {
    name: 'Rule Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      updateTicketingDates(parentId: 34, ticketingDateList: [
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
      deleteTicketingDate(id: 32)
      updateTravelDates(parentId: 34, travelDateList: [
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
      deleteTravelDate(id: 10)
    }`
  }
};
