const {
  CONTRACT,
  PRICING_TERM,
  DISCOUNT,
  TARGET_TERM,
  TARGET_LEVEL,
  NOTE
} = require('../constants');

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
      discountList(pricingTermId: 1) {
        ${DISCOUNT}
      }
      targetTermList {
        ${TARGET_TERM}
      }
      targetLevelList(targetTermId: 1) {
        ${TARGET_LEVEL}
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
