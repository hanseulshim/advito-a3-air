import gql from 'graphql-tag';
import {
  LOCATION_COLLECTION,
  TRAVEL_SECTOR_COLLECTION,
  AIRLINE_GROUP_COLLECTION,
  PREFERRED_AIRLINE_COLLECTION
} from '../constants';

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
query airlineGroupCollectionList($clientId: Int, $projectId: Int) {
    airlineGroupCollectionList(clientId: $clientId, projectId: $projectId) {
      ${AIRLINE_GROUP_COLLECTION}
    }
  }
`;

export const GET_AIRLINE_GROUP_COLLECTION = gql`
query airlineGroupCollection($projectId: Int!, $id: Int!) {
    airlineGroupCollection(projectId: $projectId, id: $id) {
      ${AIRLINE_GROUP_COLLECTION}
    }
  }
`;

export const GET_AIRLINE_GROUP_LIST = gql`
  query airlineGroupList($collectionId: Int) {
    airlineGroupList(collectionId: $collectionId) {
      id
      name
      code
      effectiveStartDate
      effectiveEndDate
      standard
      airlineGroupMemberList {
        id
        airlineId
        name
        code
        effectiveStartDate
        effectiveEndDate
      }
    }
  }
`;

export const GET_PREFERRED_AIRLINE_COLLECTION_LIST = gql`
query preferredAirlineCollectionList($clientId: Int, $projectId: Int) {
  preferredAirlineCollectionList(clientId: $clientId, projectId: $projectId) {
    ${PREFERRED_AIRLINE_COLLECTION}
  }
}
`;

export const GET_PREFERRED_AIRLINE_COLLECTION = gql`
query preferredAirlineCollection( $projectId: Int!, $id: Int!) {
  preferredAirlineCollection(projectId: $projectId, id: $id) {
    ${PREFERRED_AIRLINE_COLLECTION}
  }
}
`;

export const GET_PREFERRED_AIRLINE_LIST = gql`
  query preferredAirlineList($groupId: Int) {
    preferredAirlineList(groupId: $groupId) {
      id
      airlineId
      name
      preferenceLevelId
      preferenceLevelName
      effectiveStartDate
      effectiveEndDate
      active
      posList {
        id
        locationId
        name
        code
      }
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
