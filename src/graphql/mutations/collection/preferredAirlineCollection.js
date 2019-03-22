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
