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
