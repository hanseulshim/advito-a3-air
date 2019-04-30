import gql from 'graphql-tag';

export const GET_PROCESS = gql`
  {
    process {
      contracts
      dataSets
      records
      processing
      processStartDate
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
