import gql from 'graphql-tag';
import { CONTRACT, PRICING_TERM, DISCOUNT } from '../constants';

export const GET_CONTRACT_LIST = gql`
  {
    contractList {
      ${CONTRACT}
    }
  }
`;

export const GET_CONTRACT_TYPE_LIST = gql`
  {
    contractTypeList {
      id
      name
    }
  }
`;

export const GET_PRICING_TERM_LIST = gql`
  {
    pricingTermList {
      ${PRICING_TERM}
    }
  }
`;

export const GET_DISCOUNT_LIST = gql`
query discountList($pricingTermId: Int) {
  discountList(pricingTermId: $pricingTermId) {
    ${DISCOUNT}
  }
}
`;

export const GET_DISCOUNT_TYPE_LIST = gql`
  {
    discountTypeList {
      id
      name
    }
  }
`;

export const GET_JOURNEY_TYPE_LIST = gql`
  {
    journeyTypeList {
      id
      name
    }
  }
`;

export const GET_DIRECTION_TYPE_LIST = gql`
  {
    directionTypeList {
      id
      name
    }
  }
`;
