import gql from 'graphql-tag';
import { PROCESS } from '../constants';

export const START_PROCESS = gql`
  mutation startProcess {
    startProcess {
      ${PROCESS}
    }
  }
`;

export const STOP_PROCESS = gql`
  mutation stopProcess {
    stopProcess {
      ${PROCESS}
    }
  }
`;
