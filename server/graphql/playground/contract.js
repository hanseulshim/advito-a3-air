const { CONTRACT, PRICING_TERM, DISCOUNT, NOTE } = require('../constants');

exports.contract = {
  queries: {
    name: 'Contract Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    {
      contractList {
        ${CONTRACT}
      }
      contractTypeList {
        id
        name
      }
      userList {
        id
        name
        email
      }
      pricingTermList {
        ${PRICING_TERM}
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
        ${CONTRACT}
      }
      copyContract(id: 1, name: "copy contract") {
        ${CONTRACT}
      }
      editContract(id: 1, name: "test", typeId: 2, round: 5, effectiveStartDate: 2534032400000, effectiveEndDate: null, description: "description", division: "division 1") {
        ${CONTRACT}
      }
      updateAppliedOrder(
        updatePricingTermList: [
          {
            id: 1,
            appliedOrder: 5
          },
          {
            id: 2,
            appliedOrder: 6
          }
        ]
      ) {
        ${PRICING_TERM}
      }
      createPricingTerm(name: "term 1", ignore: false) {
        ${PRICING_TERM}
      }
      copyPricingTerm(id: 1, name: "copy term", ignore: false) {
        ${PRICING_TERM}
      }
      editPricingTerm(id: 1, name: "term edit", ignore: true) {
        ${PRICING_TERM}
      }
      togglePricingTermQC(id: 1) {
        ${PRICING_TERM}
      }
      deletePricingTerms(idList: [1, 2, 3])

      updateDiscountAppliedOrder(
        id: 1,
        updateDiscountList: [
          {
            id: 1,
            appliedOrder: 5
          },
          {
            id: 2,
            appliedOrder: 6
          }
        ]
      ) {
        ${DISCOUNT}
      }

      createDiscount(id: 1, name: "new discount", discountTypeId: 1, discountValue: 10.2, journeyTypeId: 3, directionTypeId: 1) {
        ${DISCOUNT}
      }
      copyDiscount(pricingTermId: 1, id: 1  name: "new discount", discountTypeId: 1, discountValue: 10.2, journeyTypeId: 3, directionTypeId: 1) {
        ${DISCOUNT}
      }
      editDiscount(pricingTermId: 1, id: 1  name: "edit discount", discountTypeId: 1, discountValue: 10.2, journeyTypeId: 3, directionTypeId: 1) {
        ${DISCOUNT}
      }
      deleteDiscounts(pricingTermId: 1, idList: [1, 2, 3])

      saveNote(pricingTermId: 1, important: true, message: "this is my first note", assigneeId: 2) {
        ${NOTE}
      }
      deleteNote(pricingTermId: 1, noteId: 1) {
        ${NOTE}
      }
      saveDiscountNote(pricingTermId: 1, discountId: 1, important: true, message: "this is my first note", assigneeId: 2) {
        ${NOTE}
      }
      deleteDiscountNote(pricingTermId: 8, discountId: 22, noteId: 7) {
        ${NOTE}
      }
    }
    `
  }
};
