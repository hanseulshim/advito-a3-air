import gql from 'graphql-tag';
import { PROJECT } from '../constants';

export const GET_PROJECTS = gql`
  query projectList($clientId: Int) {
    projectList(clientId: $clientId) {
      ${PROJECT}
    }
  }
`;

export const GET_PROJECT = gql`
  {
    project @client {
      ${PROJECT}
    }
  }
`;

export const GET_PROJECT_TYPE_LIST = gql`
  {
    projectTypeList {
      id
      name
    }
  }
`;

export const GET_SAVINGS_TYPE_LIST = gql`
  {
    savingsTypeList {
      id
      name
    }
  }
`;

export const GET_PROJECT_STATUS_LIST = gql`
  {
    projectStatusList @client {
      id
      status
    }
  }
`;
