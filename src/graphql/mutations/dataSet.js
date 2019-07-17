import gql from 'graphql-tag';

export const TOGGLE_DATA_SET = gql`
  mutation toggleDataSet(
    $projectId: Int!
    $month: Int!
    $year: Int!
    $qc: Boolean
  ) {
    toggleDataSet(projectId: $projectId, month: $month, year: $year, qc: $qc)
  }
`;

export const DELETE_DATA_SET = gql`
  mutation deleteDataSet($projectId: Int!, $month: Int!, $year: Int!) {
    deleteDataSet(projectId: $projectId, month: $month, year: $year)
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
