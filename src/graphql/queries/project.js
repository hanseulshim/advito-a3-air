import gql from 'graphql-tag';

export const GET_PROJECTS = gql`
  query projectList($clientId: Int) {
    projectList(clientId: $clientId) {
      id
      clientId
      clientName
      name
      description
      division
      isDeleted
      projectTypeId
      projectType
      savingsTypeId
      savingsType
      effectiveFrom
      effectiveTo
      reportFrom
      reportTo
      projectManagerId
      projectManagerName
      projectManagerEmail
      leadAnalystId
      leadAnalystName
      leadAnalystEmail
      dataSpecialistId
      dataSpecialistName
      dataSpecialistEmail
      currencyId
      currencyName
      distanceUnitId
      distanceUnitName
      progress
      favorite
    }
  }
`;

export const GET_PROJECT = gql`
  {
    project @client {
      id
      clientId
      clientName
      name
      description
      division
      isDeleted
      projectTypeId
      projectType
      savingsTypeId
      savingsType
      effectiveFrom
      effectiveTo
      reportFrom
      reportTo
      projectManagerId
      projectManagerName
      projectManagerEmail
      leadAnalystId
      leadAnalystName
      leadAnalystEmail
      dataSpecialistId
      dataSpecialistName
      dataSpecialistEmail
      currencyId
      currencyName
      distanceUnitId
      distanceUnitName
      progress
      favorite
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
