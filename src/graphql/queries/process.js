import gql from 'graphql-tag';
import { PROCESS } from '../constants';

export const GET_PROCESS = gql`
query process($projectId: Int) {
  process(projectId: $projectId) {
    ${PROCESS}
  }
}
`;
export const GET_RECENT_PROCESS_LIST = gql`
  query recentProcessList($projectId: Int) {
    recentProcessList(projectId: $projectId) {
      procEnd
      procStart
      contCount
      dsCount
      recCount
      status
      procBy
    }
  }
`;
