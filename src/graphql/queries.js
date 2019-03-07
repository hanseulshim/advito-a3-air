import gql from 'graphql-tag';

export const GET_CLIENTS = gql`
  {
    clientList {
      id
      name
    }
  }
`;

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
      progress
      favorite
    }
  }
`;

export const GET_USER = gql`
  {
    user @client {
      name
      email
      clientId
      sessionToken
    }
  }
`;

export const GET_CLIENT = gql`
  {
    client @client {
      id
      name
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
    }
  }
`;

export const GET_LOCATION_COLLECTION_LIST = gql`
  {
    locationCollectionList {
      id
      name
      description
      dateUpdated
      active
      regionList {
        name
        countryList
      }
    }
  }
`;

export const GET_TRAVEL_SECTOR_COLLECTION_LIST = gql`
  {
    travelSectorCollectionList {
      id
      name
      description
      dateUpdated
      active
      sectorList {
        id
        name
        shortName
        geographyList {
          origin
          destination
          exclude
        }
      }
    }
  }
`;
