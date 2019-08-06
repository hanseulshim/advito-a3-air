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
    $projectId: Int!
    $groupId: Int!
    $name: String!
    $shortName: String!
    $geographyList: [SectorGeographyInput]
  ) {
    addTravelSector(
      projectId: $projectId
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
  mutation deleteTravelSector($id: Int!, $collectionId: Int!) {
    deleteTravelSector(id: $id, collectionId: $collectionId) {
      id
      sectorList {
        id
        name
        shortName
        geographyList {
          origin {
            id
            name
          }
          destination {
            id
            name
          }
          exclude
        }
      }
    }
  }
`;

export const DELETE_BIDIRECTION = gql`
  mutation deleteBidirection($id: Int!, $collectionId: Int!, $index: Int!) {
    deleteBidirection(id: $id, collectionId: $collectionId, index: $index) {
      id
      sectorList {
        id
        name
        shortName
        geographyList {
          origin {
            id
            name
          }
          destination {
            id
            name
          }
          exclude
        }
      }
    }
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
