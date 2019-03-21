import gql from 'graphql-tag';

export const EDIT_AIRLINE_GROUP_COLLECTION = gql`
  mutation editAirlineGroupCollection(
    $id: Int!
    $name: String!
    $description: String
  ) {
    editAirlineGroupCollection(
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

export const DELETE_AIRLINE_GROUP_COLLECTION = gql`
  mutation deleteAirlineGroupCollection($id: Int!) {
    deleteAirlineGroupCollection(id: $id)
  }
`;

export const ADD_AIRLINE_GROUP = gql`
  mutation addAirlineGroup(
    $id: Int!
    $name: String!
    $effectiveStartDate: Date
    $effectiveEndDate: Date
    $airlineList: [GroupAirline]
  ) {
    addAirlineGroup(
      id: $id
      name: $name
      effectiveStartDate: $effectiveStartDate
      effectiveEndDate: $effectiveEndDate
      airlineList: $airlineList
    ) {
      id
      name
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

export const EDIT_AIRLINE_GROUP = gql`
  mutation editAirlineGroup(
    $id: Int!
    $collectionId: Int!
    $name: String!
    $effectiveStartDate: Date
    $effectiveEndDate: Date
    $airlineList: [GroupAirline]
  ) {
    editAirlineGroup(
      id: $id
      collectionId: $collectionId
      name: $name
      effectiveStartDate: $effectiveStartDate
      effectiveEndDate: $effectiveEndDate
      airlineList: $airlineList
    ) {
      id
      name
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

export const DELETE_AIRLINE_GROUP = gql`
  mutation deleteAirlineGroup($id: Int!, $collectionId: Int!) {
    deleteAirlineGroup(id: $id, collectionId: $collectionId) {
      id
      name
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
