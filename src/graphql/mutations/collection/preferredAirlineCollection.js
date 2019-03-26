import gql from 'graphql-tag';

export const EDIT_PREFERRED_AIRLINE_COLLECTION = gql`
  mutation editPreferredAirlineCollection(
    $id: Int!
    $name: String!
    $description: String
  ) {
    editPreferredAirlineCollection(
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

export const DELETE_PREFERRED_AIRLINE_COLLECTION = gql`
  mutation deletePreferredAirlineCollection($id: Int!) {
    deletePreferredAirlineCollection(id: $id)
  }
`;

export const TOGGLE_PREFERRED_AIRLINE_COLLECTION = gql`
  mutation togglePreferredAirlineCollection($id: Int!) {
    togglePreferredAirlineCollection(id: $id) {
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

export const ADD_PREFERRED_AIRLINE = gql`
  mutation addPreferredAirline(
    $id: Int!
    $airlineList: [PreferredAirlineInput]
  ) {
    addPreferredAirline(id: $id, airlineList: $airlineList) {
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

export const EDIT_PREFERRED_AIRLINE = gql`
  mutation editPreferredAirline(
    $id: Int!
    $airlineList: [PreferredAirlineInput]
  ) {
    editPreferredAirline(id: $id, airlineList: $airlineList) {
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

export const DELETE_PREFERRED_AIRLINE = gql`
  mutation deletePreferredAirline($id: Int!, $collectionId: Int!) {
    deletePreferredAirline(id: $id, collectionId: $collectionId) {
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
