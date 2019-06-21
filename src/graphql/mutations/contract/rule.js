import gql from 'graphql-tag';

export const DELETE_RULE = gql`
  mutation deleteRule($id: Int!, $ruleType: Int!) {
    deleteRule(id: $id, ruleType: $ruleType)
  }
`;

export const UPDATE_TICKETING_DATES = gql`
  mutation updateTicketingDates(
    $parentId: Int!
    $parentType: Int
    $ticketingDateList: [TicketingDateInput]!
  ) {
    updateTicketingDates(
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
