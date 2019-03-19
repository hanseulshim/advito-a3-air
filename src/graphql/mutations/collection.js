import gql from 'graphql-tag';

export const CREATE_LOCATION_COLLECTION = gql`
  mutation createLocationCollection(
    $id: Int!
    $name: String!
    $description: String
  ) {
    createLocationCollection(id: $id, name: $name, description: $description) {
      id
      name
      description
      dateUpdated
      active
      regionList {
        id
        name
        countryList {
          id
          regionId
          name
        }
      }
    }
  }
`;

export const EDIT_LOCATION_COLLECTION = gql`
  mutation editLocationCollection(
    $id: Int!
    $name: String!
    $description: String
  ) {
    editLocationCollection(id: $id, name: $name, description: $description) {
      id
      name
      description
      dateUpdated
    }
  }
`;

export const DELETE_LOCATION_COLLECTION = gql`
  mutation deleteLocationCollection($id: Int!) {
    deleteLocationCollection(id: $id)
  }
`;

export const ADD_REGION = gql`
  mutation addRegion($id: Int!, $name: String!) {
    addRegion(id: $id, name: $name) {
      id
      regionList {
        id
        name
        countryList {
          id
          regionId
          name
        }
      }
    }
  }
`;

export const DELETE_REGION = gql`
  mutation deleteRegion($id: Int!, $collectionId: Int!) {
    deleteRegion(id: $id, collectionId: $collectionId) {
      id
      regionList {
        id
        name
        countryList {
          id
          regionId
          name
        }
      }
    }
  }
`;

export const MOVE_COUNTRIES = gql`
  mutation moveCountries(
    $id: Int!
    $collectionId: Int!
    $countryList: [MoveCountry]
  ) {
    moveCountries(
      id: $id
      collectionId: $collectionId
      countryList: $countryList
    ) {
      id
      regionList {
        id
        name
        countryList {
          id
          regionId
          name
        }
      }
    }
  }
`;

export const CREATE_TRAVEL_SECTOR_COLLECTION = gql`
  mutation createTravelSectorCollection(
    $id: Int!
    $name: String!
    $description: String
  ) {
    createTravelSectorCollection(
      id: $id
      name: $name
      description: $description
    ) {
      id
      name
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
      description
      dateUpdated
      active
    }
  }
`;

export const EDIT_TRAVEL_SECTOR_COLLECTION = gql`
  mutation editTravelSectorCollection(
    $id: Int!
    $name: String!
    $description: String
  ) {
    editTravelSectorCollection(
      id: $id
      name: $name
      description: $description
    ) {
      id
      name
      description
      dateUpdated
    }
  }
`;

export const DELETE_TRAVEL_SECTOR_COLLECTION = gql`
  mutation deleteTravelSectorCollection($id: Int!) {
    deleteTravelSectorCollection(id: $id)
  }
`;
