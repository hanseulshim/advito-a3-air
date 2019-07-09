import gql from 'graphql-tag';

export const TOGGLE_DATA_SET = gql`
  mutation toggleDataSet($month: Int!, $year: Int!, $qc: Boolean) {
    toggleDataSet(month: $month, year: $year, qc: $qc)
  }
`;

export const DELETE_DATA_SET = gql`
  mutation deleteDataSet($month: Int!, $year: Int!) {
    deleteDataSet(month: $month, year: $year)
  }
`;

export const SET_ANNUALIZATION = gql`
  mutation setAnnualization(
    $type: Int
    $annMonthsList: [DataSetAnnualization]!
  ) {
    setAnnualization(type: $type, annMonthsList: $annMonthsList)
  }
`;
