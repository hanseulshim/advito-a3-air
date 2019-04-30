import gql from 'graphql-tag';

export const START_PROCESS = gql`
  mutation startProcess {
    startProcess {
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

export const STOP_PROCESS = gql`
  mutation stopProcess {
    stopProcess {
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
