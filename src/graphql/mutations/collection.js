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
        name
        countryList
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
