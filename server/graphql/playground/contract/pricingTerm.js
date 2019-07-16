const { PRICING_TERM } = require('../../constants');

exports.pricingTerm = {
  queries: {
    name: 'Pricing Term Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      pricingTermList(contractId: 134) {
        ${PRICING_TERM}
      }
      pricingTerm(id: 49) {
        ${PRICING_TERM}
      }
    }`
  },
  mutations: {
    name: 'Pricing Term Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      createPricingTerm(contractId: 134, name: "term 1", ignore: false) {
        ${PRICING_TERM}
      }

      copyPricingTerm(id: 1, name: "copy term", ignore: false) {
        ${PRICING_TERM}
      }

      editPricingTerm(id: 49, name: "Pricing Term 1 - edit", ignore: true) {
        ${PRICING_TERM}
      }

      togglePricingTermQC(idList: [49]) {
        ${PRICING_TERM}
      }

      deletePricingTerms(idList: [72, 73, 74]

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
    }
    `
  }
};
