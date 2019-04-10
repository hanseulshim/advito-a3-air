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
