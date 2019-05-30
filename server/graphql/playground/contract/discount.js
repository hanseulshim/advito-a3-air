const { DISCOUNT } = require('../../constants');

exports.discount = {
  queries: {
    name: 'Discount Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      discountList(pricingTermId: 49) {
        ${DISCOUNT}
      }
      discount(id: 39) {
        ${DISCOUNT}
      }
      discountTypeList {
        id
        name
      }
      journeyTypeList {
        id
        name
      }
      directionTypeList {
        id
        name
      }
    }`
  },
  mutations: {
    name: 'Discount Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      createDiscount(pricingTermId: 49, name: "new discount", discountTypeId: 10, discountValue: 10.2, journeyTypeId: 13, directionTypeId: 16) {
        ${DISCOUNT}
      }

      copyDiscount(id: 1  name: "new discount", discountTypeId: 10, discountValue: 10.2, journeyTypeId: 13, directionTypeId: 16) {
        ${DISCOUNT}
      }

      editDiscount(id: 1  name: "edit discount", discountTypeId: 10, discountValue: 10.2, journeyTypeId: 13, directionTypeId: 16) {
        ${DISCOUNT}
      }
      deleteDiscounts(pricingTermId: 49, idList: [1, 2, 3])

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
    }
    `
  }
};
