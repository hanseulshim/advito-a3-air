import gql from 'graphql-tag';
import { PREFERRED_AIRLINE_COLLECTION } from '../../constants';

export const EDIT_PREFERRED_AIRLINE_COLLECTION = gql`
  mutation editPreferredAirlineCollection(
    $projectId: Int!
    $id: Int!
    $name: String!
    $description: String
  ) {
    editPreferredAirlineCollection(
      projectId: $projectId
      id: $id
      name: $name
      description: $description
    ) { ${PREFERRED_AIRLINE_COLLECTION}}
  }
`;

export const DELETE_PREFERRED_AIRLINE_COLLECTION = gql`
  mutation deletePreferredAirlineCollection($projectId: Int!, $id: Int!) {
    deletePreferredAirlineCollection(projectId: $projectId, id: $id)
  }
`;

export const TOGGLE_PREFERRED_AIRLINE_COLLECTION = gql`
  mutation togglePreferredAirlineCollection($projectId: Int!, $id: Int!) {
    togglePreferredAirlineCollection(projectId: $projectId, id: $id)
  }
`;

export const ADD_PREFERRED_AIRLINE = gql`
  mutation addPreferredAirline(
    $groupId: Int!
    $airlineList: [PreferredAirlineInput]
  ) {
    addPreferredAirline(groupId: $groupId, airlineList: $airlineList)
  }
`;

export const EDIT_PREFERRED_AIRLINE = gql`
  mutation editPreferredAirline(
    $groupId: Int!
    $airlineList: [PreferredAirlineInput]
  ) {
    editPreferredAirline(groupId: $groupId, airlineList: $airlineList)
  }
`;

export const DELETE_PREFERRED_AIRLINE = gql`
  mutation deletePreferredAirline($id: Int!) {
    deletePreferredAirline(id: $id)
  }
`;
