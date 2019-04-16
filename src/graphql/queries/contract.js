import gql from 'graphql-tag';

export const GET_CONTRACT_LIST = gql`
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
    }
  }
`;
