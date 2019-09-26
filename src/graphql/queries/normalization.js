import gql from 'graphql-tag';
import { NORMALIZATION, NORMALIZATION_MARKET } from '../constants';

export const GET_NORMALIZATION_LIST = gql`
query normalizationList($discountId: Int) {
  normalizationList(discountId: $discountId) {
    ${NORMALIZATION}
  }
}
`;

export const GET_NORMALIZATION = gql`
query normalization($id: Int!) {
  normalization(id: $id) {
    ${NORMALIZATION}
  }
}
`;

export const GET_NORMALIZATION_MARKET_LIST = gql`
  query normalizationMarketList($normalizationId: Int) {
    normalizationMarketList(normalizationId: $normalizationId) {
      ${NORMALIZATION_MARKET}
    }
  }
`;

export const GET_TOP_MARKET_LIST = gql`
  query topMarketList($clientGcn: String, $normalizationId: Int) {
    topMarketList(clientGcn: $clientGcn, normalizationId: $normalizationId) {
      name
      originMarket
      destMarket
      idList
      advancedTicketList {
        label
        value
      }
      departureList {
        label
        value
      }
      fareBasisList {
        fareBasis
        bookingClass
        usage
      }
    }
  }
`;
