import gql from 'graphql-tag';
import { LOCATION_COLLECTION, TRAVEL_SECTOR_COLLECTION } from '../constants';

export const GET_LOCATION_COLLECTION_LIST = gql`
  query locationCollectionList($clientId: Int, $projectId: Int) {
    locationCollectionList(clientId: $clientId, projectId: $projectId) {
      ${LOCATION_COLLECTION}
    }
  }
`;

export const GET_LOCATION_COLLECTION = gql`
  query locationCollection($projectId: Int!, $id: Int!) {
    locationCollection(projectId: $projectId, id: $id) {
      ${LOCATION_COLLECTION}
    }
  }
`;

export const GET_REGION_LIST = gql`
  query regionList($geoSetId: Int) {
    regionList(geoSetId: $geoSetId) {
      id
      code
      name
      standard
      countryList {
        id
        code
        name
      }
    }
  }
`;

export const GET_TRAVEL_SECTOR_COLLECTION_LIST = gql`
    query travelSectorCollectionList($clientId: Int, $projectId: Int) {
      travelSectorCollectionList(clientId: $clientId, projectId: $projectId) {
        ${TRAVEL_SECTOR_COLLECTION}
      }
    }
`;

export const GET_TRAVEL_SECTOR_COLLECTION = gql`
    query travelSectorCollection($projectId: Int!, $id: Int!) {
      travelSectorCollection(projectId: $projectId, id: $id) {
        ${TRAVEL_SECTOR_COLLECTION}
      }
    }
`;

export const GET_TRAVEL_SECTOR_LIST = gql`
  query travelSectorList($groupId: Int) {
    travelSectorList(groupId: $groupId) {
      id
      name
      shortName
      standard
      sectorGeographyList {
        id
        originId
        originName
        destinationId
        destinationName
        exclude
      }
    }
  }
`;

export const GET_AIRLINE_GROUP_COLLECTION_LIST = gql`
  {
    airlineGroupCollectionList {
      id
      name
      description
      dateUpdated
      effectiveStartDate
      effectiveEndDate
      active
      airlineGroupList {
        id
        name
        effectiveStartDate
        effectiveEndDate
        airlineList {
          id
          name
          effectiveStartDate
          effectiveEndDate
        }
      }
    }
  }
`;

export const GET_AIRLINE_LIST = gql`
  {
    airlineGroupAirlineList {
      id
      name
      code
    }
  }
`;

export const GET_PREFERRED_AIRLINE_COLLECTION_LIST = gql`
  {
    preferredAirlineCollectionList {
      id
      name
      description
      dateUpdated
      active
      airlineList {
        id
        name
        preferenceLevel
        effectiveStartDate
        effectiveEndDate
        pos
        active
      }
    }
  }
`;

export const GET_POS_LIST = gql`
  {
    posList {
      id
      name
    }
  }
`;

export const GET_PREFERENCE_LEVEL_LIST = gql`
  {
    preferenceLevelList {
      id
      name
    }
  }
`;
