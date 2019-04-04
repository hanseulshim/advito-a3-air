import gql from 'graphql-tag';

export const GET_POS_TRENDS_COUNTRY_LIST = gql`
  {
    posTrendsCountryList {
      id
      name
      ticketsTotal
      segmentsTotal
      farePaidTotal
    }
  }
`;

export const GET_POS_TRENDS_COLUMN_LIST = gql`
  {
    posTrendsColumnList {
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

export const GET_DIVISION_TRENDS_LIST = gql`
  {
    divisionTrendsList {
      id
      name
      ticketsTotal
      segmentsTotal
      farePaidTotal
    }
  }
`;

export const GET_DIVISION_TRENDS_COLUMN_LIST = gql`
  {
    divisionTrendsColumnList {
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

export const GET_IMPORT_ERRORS_COUNTRY_LIST = gql`
  {
    importErrorsCountryList {
      id
      name
      importedTicketsTotal
      errorTicketsTotal
      errorRatioTotal
    }
  }
`;

export const GET_IMPORT_ERRORS_COLUMN_LIST = gql`
  {
    importErrorsColumnList {
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
