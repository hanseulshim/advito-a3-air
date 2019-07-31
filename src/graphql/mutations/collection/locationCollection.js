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
    $projectId: Int!
    $id: Int!
    $name: String!
    $description: String
  ) {
    editLocationCollection(projectId: $projectId, id: $id, name: $name, description: $description) {
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
    $geoSetId: Int!
    $regionId: Int!
    $countryList: [Int]
  ) {
    moveCountries(
      geoSetId: $geoSetId
      regionId: $regionId
      countryList: $countryList
    )
  }
`;
