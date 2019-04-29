import gql from 'graphql-tag';

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
    }
  }
`;

export const GET_DATA_SET_COLUMN_LIST = gql`
  {
    dataSetColumnList {
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
