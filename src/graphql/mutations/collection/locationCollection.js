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
  mutation deleteLocationCollection($id: Int!, $projectId: Int!) {
    deleteLocationCollection(id: $id, projectId: $projectId)
  }
`;

export const TOGGLE_LOCATION_COLLECTION = gql`
  mutation toggleLocationCollection($id: Int!, $projectId: Int!) {
    toggleLocationCollection(id: $id, projectId: $projectId)
  }
`;

export const ADD_REGION = gql`
  mutation addRegion($geoSetId: Int!, $name: String!, $code: String!) {
    addRegion(geoSetId: $geoSetId, name: $name, code: $code)
  }
`;

export const DELETE_REGION = gql`
  mutation deleteRegion($id: Int!) {
    deleteRegion(id: $id)
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
