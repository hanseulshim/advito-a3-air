const { CONTRACT, PRICING_TERM, DISCOUNT, NOTE } = require('../constants');

exports.contract = {
  queries: {
    name: 'Contract Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      contractList {
        ${CONTRACT}
      }
      contractTypeList {
        id
        name
      }
      divisionTypeList {
        id
        name
      }
      userList {
        id
        name
        email
      }
      pricingTermList(contractId: 134) {
        ${PRICING_TERM}
      }
      discountList(pricingTermId: 1) {
        ${DISCOUNT}
      }
    }`
  },
  mutations: {
    name: 'Contract Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      createContract(name: "test", typeId: 2, round: 5, effectiveFrom: 2534032400000, effectiveTo: null, description: "description", divisionId: 2) {
        ${CONTRACT}
      }
      copyContract(id: 1, name: "copy contract") {
        ${CONTRACT}
      }
      editContract(id: 1, name: "Test 1 - edit", typeId: 2, round: 5, effectiveFrom: 2534032400000, effectiveTo: null, description: "description", divisionId: 2) {
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
      createPricingTerm(contractId: 134, name: "term 1", ignore: false) {
        ${PRICING_TERM}
      }
      copyPricingTerm(id: 1, name: "copy term", ignore: false) {
        ${PRICING_TERM}
      }
      editPricingTerm(id: 49, name: "Pricing Term 1 - edit", ignore: true) {
        ${PRICING_TERM}
      }
      togglePricingTermQC(id: 49) {
        ${PRICING_TERM}
      }
      deletePricingTerms(idList: [72, 73, 74])

      updateDiscountAppliedOrder(
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

      createDiscount(pricingTermId: 1, name: "new discount", discountTypeId: 1, discountValue: 10.2, journeyTypeId: 3, directionTypeId: 1) {
        ${DISCOUNT}
      }
      copyDiscount(id: 1  name: "new discount", discountTypeId: 1, discountValue: 10.2, journeyTypeId: 3, directionTypeId: 1) {
        ${DISCOUNT}
      }
      editDiscount(id: 1  name: "edit discount", discountTypeId: 1, discountValue: 10.2, journeyTypeId: 3, directionTypeId: 1) {
        ${DISCOUNT}
      }
      deleteDiscounts(idList: [1, 2, 3])

      saveNote(id: 1, important: true, message: "this is my first note", assigneeId: 2) {
        ${NOTE}
      }
      deleteNote(id: 1, noteId: 1) {
        ${NOTE}
      }
      saveDiscountNote(id: 1, important: true, message: "this is my first note", assigneeId: 2) {
        ${NOTE}
      }
      deleteDiscountNote(id: 22, noteId: 7) {
        ${NOTE}
      }
    }
    `
  }
};
