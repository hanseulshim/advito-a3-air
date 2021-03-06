import { NORMALIZATION, NORMALIZATION_MARKET } from '../../constants';

export default {
  queries: {
    name: 'Normalization Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      normalizationList(discountId: null) {
        ${NORMALIZATION}
      }
      normalization(id: null) {
        ${NORMALIZATION}
      }
      normalizationMarketList(normalizationId: null) {
        ${NORMALIZATION_MARKET}
      }
      topMarketList(clientGcn: "", normalizationId: null) {
        name
        originMarket
        destMarket
        farePaid
        idList
      }
      marketAdvancedTicketList(idList: []) {
        label
        value
      }
      marketDepartureList(idList: []) {
        label
        value
      }
      MarketFareBasis(idList: []) {
        fareBasis
        bookingClass
        usage
      }
    }`
  },
  mutations: {
    name: 'Normalization Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      createNormalization(
        discountId: null
        usageFrom: 1483246800001
        usageTo: 1485838800001
        effectiveFrom: 1483246800001
        effectiveTo: 1485838800001
      ) {
        ${NORMALIZATION}
      }
      copyNormalization(
        id: null
      ) {
        ${NORMALIZATION}
      }
      updateNormalization(
        id: null
        usageFrom: 1483246800001
        usageTo: 1485838800001
        effectiveFrom: 1483246800001
        effectiveTo: 1485838800001
      ) {
        ${NORMALIZATION}
      }
      deleteNormalization(id: 12)
      createNormalizationMarket(
        normalizationId: null
        marketA: null
        marketB: null
        farePaid: null
        usageOverride: null
        farePullDate: 1485838800001
        notes: null
        fareList: [
         {
          fareType: null
          fareBasis: null
          amount: null
          currencyCode: null
          directionType: null
          advancePurchase: null
          minstay: null
         }
        ]
      ) {
        ${NORMALIZATION_MARKET}
      }
      updateNormalizationMarket(
        marketId: null
        marketA: null
        marketB: null
        farePaid: null
        usageOverride: null
        farePullDate: 1485838800001
        notes: null
        fareList: [
         {
          id: null
          fareType: null
          fareBasis: null
          amount: null
          currencyCode: null
          directionType: null
          advancePurchase: null
          minstay: null
         }
        ]
      ) {
        ${NORMALIZATION_MARKET}
      }
      deleteNormalizationMarket(
        id: null
      )
    }
    `
  }
};
