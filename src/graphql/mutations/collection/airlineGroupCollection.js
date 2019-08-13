import gql from 'graphql-tag';
import { AIRLINE_GROUP_COLLECTION } from '../../constants';

export const EDIT_AIRLINE_GROUP_COLLECTION = gql`
  mutation editAirlineGroupCollection(
    $projectId: Int!
    $id: Int!
    $name: String!
    $description: String
    $effectiveStartDate: Date!
    $effectiveEndDate: Date!
  ) {
    editAirlineGroupCollection(
      projectId: $projectId
      id: $id
      name: $name
      description: $description
      effectiveStartDate: $effectiveStartDate
      effectiveEndDate: $effectiveEndDate
    ) {
      ${AIRLINE_GROUP_COLLECTION}
    }
  }
`;

export const DELETE_AIRLINE_GROUP_COLLECTION = gql`
  mutation deleteAirlineGroupCollection($projectId: Int!, $id: Int!) {
    deleteAirlineGroupCollection(projectId: $projectId, id: $id)
  }
`;

export const TOGGLE_AIRLINE_GROUP_COLLECTION = gql`
  mutation toggleAirlineGroupCollection($projectId: Int!, $id: Int!) {
    toggleAirlineGroupCollection(projectId: $projectId, id: $id)
  }
`;

export const ADD_AIRLINE_GROUP = gql`
  mutation addAirlineGroup(
    $collectionId: Int!
    $name: String!
    $code: String!
    $effectiveStartDate: Date!
    $effectiveEndDate: Date!
    $airlineList: [GroupAirline]
  ) {
    addAirlineGroup(
      collectionId: $collectionId
      name: $name
      code: $code
      effectiveStartDate: $effectiveStartDate
      effectiveEndDate: $effectiveEndDate
      airlineList: $airlineList
    )
  }
`;

export const EDIT_AIRLINE_GROUP = gql`
  mutation editAirlineGroup(
    $carrierGroupId: Int!
    $name: String!
    $code: String!
    $effectiveStartDate: Date!
    $effectiveEndDate: Date!
    $airlineList: [GroupAirline]
  ) {
    editAirlineGroup(
      carrierGroupId: $carrierGroupId
      name: $name
      code: $code
      effectiveStartDate: $effectiveStartDate
      effectiveEndDate: $effectiveEndDate
      airlineList: $airlineList
    )
  }
`;

export const DELETE_AIRLINE_GROUP = gql`
  mutation deleteAirlineGroup($id: Int!) {
    deleteAirlineGroup(id: $id)
  }
`;
