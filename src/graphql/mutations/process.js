import gql from 'graphql-tag';

export const START_PROCESS = gql`
  mutation startProcess($projectId: Int!, $projectName: String!) {
    startProcess(projectId: $projectId, projectName: $projectName)
  }
`;

export const STOP_PROCESS = gql`
  mutation stopProcess($projectId: Int!) {
    stopProcess(projectId: $projectId)
  }
`;
