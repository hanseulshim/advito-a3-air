import gql from 'graphql-tag';

export const GET_RULE_LIST = gql`
  query ruleList($parentId: Int, $parentType: Int) {
    ruleList(parentId: $parentId, parentType: $parentType)
  }
`;

export const GET_TICKETING_DATE_LIST = gql`
  query ticketingDateList($parentId: Int, $parentType: Int) {
    ticketingDateList(parentId: $parentId, parentType: $parentType) {
      id
      ruleContainerId
      startDate
      endDate
      isDeleted
    }
  }
`;

export const GET_TRAVEL_DATE_LIST = gql`
  query travelDateList($parentId: Int, $parentType: Int) {
    travelDateList(parentId: $parentId, parentType: $parentType) {
      id
      ruleContainerId
      startDate
      endDate
      isDeleted
    }
  }
`;

export const GET_POINT_OF_SALE_LIST = gql`
  query pointOfSaleList($parentId: Int, $parentType: Int) {
    pointOfSaleList(parentId: $parentId, parentType: $parentType) {
      id
      ruleContainerId
      countryCode
      isDeleted
    }
  }
`;

export const GET_POINT_OF_ORIGIN_LIST = gql`
  query pointOfOriginList($parentId: Int, $parentType: Int) {
    pointOfOriginList(parentId: $parentId, parentType: $parentType) {
      id
      ruleContainerId
      countryCode
      isDeleted
    }
  }
`;

export const GET_MARKET_RULE_LIST = gql`
  query marketList($parentId: Int, $parentType: Int) {
    marketList(parentId: $parentId, parentType: $parentType) {
      id
      ruleContainerId
      origin
      originType
      arrival
      arrivalType
      exclude
      isDeleted
    }
  }
`;
