import gql from 'graphql-tag';

export const GET_DATA_SET_LIST = gql`
  {
    dataSetList {
      id
      ticketingTo
      ticketingFrom
      uploadDate
      qc
      records
      status
    }
  }
`;
