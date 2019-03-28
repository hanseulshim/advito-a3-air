import gql from 'graphql-tag';

export const GET_POS_TREND_LIST = gql`
  {
    posTrendList {
      id
      name
      ticketsTotal
      segmentsTotal
      farePaidTotal
      columns {
        id
        name
        tickets
        segments
        farePaid
        dateUpdated
        status
      }
    }
  }
`;

export const GET_DIVISION_TREND_LIST = gql`
  {
    divisionTrendList {
      id
      name
      ticketsTotal
      segmentsTotal
      farePaidTotal
      columns {
        id
        name
        tickets
        segments
        farePaid
        dateUpdated
        status
      }
    }
  }
`;

export const GET_IMPORT_ERROR_LIST = gql`
  {
    importErrorList {
      id
      name
      importedTicketsTotal
      errorTicketsTotal
      errorRatioTotal
      columns {
        id
        name
        importedTickets
        errorTickets
        errorRatio
        dateUpdated
        status
      }
    }
  }
`;
