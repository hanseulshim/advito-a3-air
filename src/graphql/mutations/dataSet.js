import gql from 'graphql-tag';

export const TOGGLE_POS_TREND = gql`
  mutation togglePosTrend($id: Int!, $status: String) {
    togglePosTrend(id: $id, status: $status) {
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

export const DELETE_POS_TREND = gql`
  mutation deletePosTrend($id: Int!) {
    deletePosTrend(id: $id)
  }
`;

export const TOGGLE_DIVISION_TREND = gql`
  mutation toggleDivisionTrend($id: Int!, $status: String) {
    toggleDivisionTrend(id: $id, status: $status) {
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

export const DELETE_DIVISION_TREND = gql`
  mutation deleteDivisionTrend($id: Int!) {
    deleteDivisionTrend(id: $id)
  }
`;

export const TOGGLE_IMPORT_ERROR = gql`
  mutation toggleImportError($id: Int!, $status: String) {
    toggleImportError(id: $id, status: $status) {
      id
      name
      dateUpdated
      status
      data {
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

export const DELETE_IMPORT_ERROR = gql`
  mutation deleteImportError($id: Int!) {
    deleteImportError(id: $id)
  }
`;
