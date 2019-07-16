import gql from 'graphql-tag';
import { DATA_SET } from '../constants';

export const GET_DATA_SET_COUNTRY_LIST = gql`
  query dataSetCountryList($projectId: Int) {
    dataSetCountryList(projectId: $projectId) {
      id
      name
      ticketsTotal
      segmentsTotal
      farePaidTotal
      importedTicketsTotal
      errorTicketsTotal
      errorRatioTotal
      numberDatasets
      annMonths
    }
  }
`;

export const GET_DATA_SET_DIVISION_LIST = gql`
  query dataSetDivisionList($projectId: Int) {
    dataSetDivisionList(projectId: $projectId) {
      id
      name
      ticketsTotal
      segmentsTotal
      farePaidTotal
      numberDatasets
      annMonths
    }
  }
`;

export const GET_DATA_SET_COLUMN_LIST = gql`
  query dataSetColumnList($projectId: Int) {
    dataSetColumnList(projectId: $projectId) {
      ${DATA_SET}
    }
  }
`;
