import gql from 'graphql-tag';
import { LOCATION_COLLECTION } from '../constants';

export const GET_LOCATION_COLLECTION_LIST = gql`
  query locationCollectionList($projectId: Int) {
    locationCollectionList(projectId: $projectId) {
      ${LOCATION_COLLECTION}
    }
  }
`;

export const GET_LOCATION_COLLECTION = gql`
  query locationCollection($id: Int!) {
    locationCollection(id: $id) {
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
      locationType
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
          origin {
            id
            name
          }
          destination {
            id
            name
          }
          exclude
        }
      }
    }
  }
`;

export const GET_TRAVEL_SECTOR_REGION_LIST = gql`
  {
    travelSectorRegionList {
      id
      name
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
