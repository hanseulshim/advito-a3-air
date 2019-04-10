import gql from 'graphql-tag';

export const GET_CONTRACT_LIST = gql`
  {
    contractList {
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
