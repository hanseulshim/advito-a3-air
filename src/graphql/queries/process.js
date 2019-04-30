import gql from 'graphql-tag';

export const GET_PROCESS = gql`
  {
    process {
      contracts
      dataSets
      records
      recentProcessList {
        date
        contracts
        dataSets
        records
        processDuration
        status
        processedBy
      }
    }
  }
`;
