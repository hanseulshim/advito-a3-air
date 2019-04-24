import gql from 'graphql-tag';

export const GET_CONTRACT_LIST = gql`
  {
    contractList {
      id
      name
      type {
        id
        name
      }
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
      pointOfSaleList
      pointOfOriginList
      airlineList
      note {
        important
        noteList {
          author {
            id
            name
          }
          date
          assignee {
            id
            name
          }
        }
      }
      ignore
      discountList {
        id
        contractOrder
        appliedOrder
        name
        effectiveStartDate
        effectiveEndDate
        discountType
        discountValue
        journeyType
        directionType
        normalizationList
        note
      }
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
