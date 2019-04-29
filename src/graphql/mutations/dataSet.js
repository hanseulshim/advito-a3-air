import gql from 'graphql-tag';

export const TOGGLE_DATA_SET = gql`
  mutation toggleDataSet($id: Int!, $status: String) {
    toggleDataSet(id: $id, status: $status) {
      id
      name
      dateUpdated
      status
      posTrendList {
        id
        countryId
        name
        tickets
        segments
        farePaid
      }
      divisionTrendList {
        id
        divisionId
        name
        tickets
        segments
        farePaid
      }
      importErrorsList {
        id
        countryId
        name
        importedTickets
        errorTickets
        errorRatio
      }
    }
  }
`;

export const DELETE_DATA_SET = gql`
  mutation deleteDataSet($id: Int!) {
    deleteDataSet(id: $id)
  }
`;
