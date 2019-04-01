import gql from 'graphql-tag';

export const TOGGLE_POS_TREND = gql`
  mutation togglePosTrend($id: Int!) {
    togglePosTrend(id: $id) {
      id
      name
      dateUpdated
      status
      data {
        id
        countryId
        name
        tickets
        segments
        farePaid
      }
    }
  }
`;

export const TOGGLE_DIVISION_TREND = gql`
  mutation toggleDivisionTrend($id: Int!) {
    toggleDivisionTrend(id: $id) {
      id
      name
      dateUpdated
      status
      data {
        id
        divisionId
        name
        tickets
        segments
        farePaid
      }
    }
  }
`;
