import gql from 'graphql-tag';
import { TRAVEL_SECTOR_COLLECTION } from '../../constants';

export const COPY_TRAVEL_SECTOR_COLLECTION = gql`
  mutation copyTravelSectorCollection(
    $clientId: Int!
    $projectId: Int!
    $id: Int!
    $name: String!
    $description: String
  ) {
    copyTravelSectorCollection(
      clientId: $clientId
      projectId: $projectId
      id: $id
      name: $name
      description: $description
    )
  }
`;

export const ADD_TRAVEL_SECTOR = gql`
  mutation addTravelSector(
    $groupId: Int!
    $name: String!
    $shortName: String!
    $geographyList: [SectorGeographyInput]
  ) {
    addTravelSector(
      groupId: $groupId
      name: $name
      shortName: $shortName
      geographyList: $geographyList
    )
  }
`;

export const EDIT_TRAVEL_SECTOR = gql`
  mutation editTravelSector(
    $sectorId: Int!
    $name: String!
    $shortName: String!
    $geographyList: [SectorGeographyInput]
  ) {
    editTravelSector(
      sectorId: $sectorId
      name: $name
      shortName: $shortName
      geographyList: $geographyList
    )
  }
`;

export const DELETE_TRAVEL_SECTOR = gql`
  mutation deleteTravelSector($id: Int!) {
    deleteTravelSector(id: $id)
  }
`;

export const DELETE_SECTOR_GEOGRAPHY = gql`
  mutation deleteSectorGeography($id: Int!) {
    deleteSectorGeography(id: $id)
  }
`;

export const EDIT_TRAVEL_SECTOR_COLLECTION = gql`
  mutation editTravelSectorCollection(
    $projectId: Int!
    $id: Int!
    $name: String!
    $description: String
  ) {
    editTravelSectorCollection(
      projectId: $projectId
      id: $id
      name: $name
      description: $description
    ) {
      ${TRAVEL_SECTOR_COLLECTION}
    }
  }
`;

export const DELETE_TRAVEL_SECTOR_COLLECTION = gql`
  mutation deleteTravelSectorCollection($id: Int!, $projectId: Int!) {
    deleteTravelSectorCollection(id: $id, projectId: $projectId)
  }
`;

export const TOGGLE_TRAVEL_SECTOR_COLLECTION = gql`
  mutation toggleTravelSectorCollection($id: Int!, $projectId: Int!) {
    toggleTravelSectorCollection(id: $id, projectId: $projectId)
  }
`;
