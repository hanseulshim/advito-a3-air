import gql from 'graphql-tag';
import { DATA_SET } from '../constants';

export const GET_DATA_SET_COUNTRY_LIST = gql`
  {
    dataSetCountryList {
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
  {
    dataSetDivisionList {
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
  {
    dataSetColumnList {
      ${DATA_SET}
    }
  }
`;
