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

export const GET_PROJECT_INFO = gql`
  {
    projectInfo {
      projectTypeList {
        id
        name
      }
      savingsTypeList {
        id
        name
      }
      projectManagerList {
        id
        name
        email
      }
      leadAnalystList {
        id
        name
        email
      }
      dataSpecialistList {
        id
        name
        email
      }
      currencyList {
        id
        name
      }
      distanceUnitList {
        id
        name
      }
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
