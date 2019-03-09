import gql from 'graphql-tag';

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

export const GET_AIRLINE_GROUP_COLLECTION_LIST = gql`
  {
    airlineGroupCollectionList {
      id
      name
      description
      dateUpdated
      active
      airlineGroupList {
        id
        name
        effectiveStartDate
        effectiveEndDate
        airlineList {
          name
          effectiveStartDate
          effectiveEndDate
        }
      }
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
        name
        preferenceLevel
        effectiveStartDate
        effectiveEndDate
        cabins
        pos
        active
      }
    }
  }
`;
