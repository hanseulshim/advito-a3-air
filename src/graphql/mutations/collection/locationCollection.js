import gql from 'graphql-tag';
import { LOCATION_COLLECTION } from '../../constants';

export const COPY_LOCATION_COLLECTION = gql`
  mutation copyLocationCollection(
    $clientId: Int!
    $projectId: Int!
    $id: Int!
    $name: String!
    $description: String
  ) {
    copyLocationCollection(
      clientId: $clientId
      projectId: $projectId
      id: $id
      name: $name
      description: $description
    )
  }
`;

export const EDIT_LOCATION_COLLECTION = gql`
  mutation editLocationCollection(
    $id: Int!
    $name: String!
    $description: String
  ) {
    editLocationCollection(id: $id, name: $name, description: $description) {
      ${LOCATION_COLLECTION}
    }
  }
`;

export const DELETE_LOCATION_COLLECTION = gql`
  mutation deleteLocationCollection($id: Int!) {
    deleteLocationCollection(id: $id)
  }
`;

export const TOGGLE_LOCATION_COLLECTION = gql`
  mutation toggleLocationCollection($id: Int!) {
    toggleLocationCollection(id: $id)
  }
`;

export const ADD_REGION = gql`
  mutation addRegion($id: Int!, $name: String!, $code: String!) {
    addRegion(id: $id, name: $name, code: $code) {
      id
      regionList {
        id
        name
        code
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
