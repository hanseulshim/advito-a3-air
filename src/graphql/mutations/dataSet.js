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
