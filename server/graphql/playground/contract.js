exports.contract = {
  queries: {
    name: 'Contract Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    {
      contractList {
        id
        name
        type
        description
        round
        effectiveStartDate
        effectiveEndDate
        qc
        pricingTermTotal
        targetTermTotal
        pointOfSaleList
        pointOfOriginList
        airlineList
      }
      contractTypeList {
        id
        name
      }
      pricingTermList {
        id
        contractOrder
        appliedOrder
        name
        effectiveStartDate
        effectiveEndDate
        qc
        pointOfSaleList
        pointOfOriginList
        airlineList
        note
        ignore
        discountList {
          id
          contractOrder
          appliedOrder
          name
          effectiveStartDate
          effectiveEndDate
          discountType
          discountValue
          journeyType
          directionType
          normalizationList
          note
        }
      }
    }`
  },
  mutations: {
    name: 'Contract Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    mutation {
      createContract(name: "test", typeId: 2, round: 5, effectiveStartDate: 2534032400000, effectiveEndDate: null, description: "description", division: "division 1") {
        id
        name
        type
        description
        round
        effectiveStartDate
        effectiveEndDate
        qc
        pricingTermTotal
        targetTermTotal
        pointOfSaleList
        pointOfOriginList
        airlineList
      }
      copyContract(id: 1, name: "copy contract") {
        id
        name
        type
        description
        round
        effectiveStartDate
        effectiveEndDate
        qc
        pricingTermTotal
        targetTermTotal
        pointOfSaleList
        pointOfOriginList
        airlineList
      }
      editContract(id: 1, name: "test", typeId: 2, round: 5, effectiveStartDate: 2534032400000, effectiveEndDate: null, description: "description", division: "division 1") {
        id
        name
        type
        description
        round
        effectiveStartDate
        effectiveEndDate
        qc
        pricingTermTotal
        targetTermTotal
        pointOfSaleList
        pointOfOriginList
        airlineList
      }
      createPricingTerm(name: "term 1", ignore: false) {
        id
        contractOrder
        appliedOrder
        name
        effectiveStartDate
        effectiveEndDate
        qc
        discountList
        pointOfSaleList
        pointOfOriginList
        airlineList
        note
        ignore
      }
      copyPricingTerm(id: 1, name: "copy term") {
        id
        contractOrder
        appliedOrder
        name
        effectiveStartDate
        effectiveEndDate
        qc
        discountList
        pointOfSaleList
        pointOfOriginList
        airlineList
        note
        ignore
      }
      editPricingTerm(id: 1, name: "term edit", ignore: true) {
        id
        contractOrder
        appliedOrder
        name
        effectiveStartDate
        effectiveEndDate
        qc
        discountList
        pointOfSaleList
        pointOfOriginList
        airlineList
        note
        ignore
      }
      deletePricingTerms(idList: [1, 2, 3])
    }
    `
  }
};
