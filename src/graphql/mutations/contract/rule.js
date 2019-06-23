import gql from 'graphql-tag';

export const DELETE_RULE = gql`
  mutation deleteRule($id: Int!, $ruleType: Int!) {
    deleteRule(id: $id, ruleType: $ruleType)
  }
`;

export const UPDATE_TICKETING_DATES = gql`
  mutation updateTicketingDate(
    $parentId: Int!
    $parentType: Int
    $ticketingDateList: [TicketingDateInput]!
  ) {
    updateTicketingDate(
      parentId: $parentId
      parentType: $parentType
      ticketingDateList: $ticketingDateList
    ) {
      id
      ruleContainerId
      startDate
      endDate
      isDeleted
    }
  }
`;

export const UPDATE_TRAVEL_DATES = gql`
  mutation updateTravelDate(
    $parentId: Int!
    $parentType: Int
    $travelDateList: [TravelDateInput]!
  ) {
    updateTravelDate(
      parentId: $parentId
      parentType: $parentType
      travelDateList: $travelDateList
    ) {
      id
      ruleContainerId
      startDate
      endDate
      isDeleted
    }
  }
`;
