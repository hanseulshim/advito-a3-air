import gql from 'graphql-tag';
import { PROJECT } from '../constants';

export const UPDATE_PROJECT = gql`
  mutation updateProject($project: Project) {
    updateProject(project: $project) @client
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject(
    $clientId: Int!
    $projectTypeId: Int!
    $savingsTypeId: Int!
    $effectiveFrom: Date!
    $effectiveTo: Date!
    $reportFrom: Date!
    $reportTo: Date!
    $description: String
    $projectManagerId: Int!
    $leadAnalystId: Int!
    $dataSpecialistId: Int!
    $currencyId: Int!
    $distanceUnitId: Int!
  ) {
    addProject(
      clientId: $clientId
      projectTypeId: $projectTypeId
      savingsTypeId: $savingsTypeId
      effectiveFrom: $effectiveFrom
      effectiveTo: $effectiveTo
      reportFrom: $reportFrom
      reportTo: $reportTo
      description: $description
      projectManagerId: $projectManagerId
      leadAnalystId: $leadAnalystId
      dataSpecialistId: $dataSpecialistId
      currencyId: $currencyId
      distanceUnitId: $distanceUnitId
    ) {
      ${PROJECT}
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation editProject(
    $id: Int!
    $savingsTypeId: Int!
    $effectiveFrom: Date!
    $effectiveTo: Date!
    $reportFrom: Date!
    $reportTo: Date!
    $description: String
    $projectManagerId: Int!
    $leadAnalystId: Int!
    $dataSpecialistId: Int!
    $currencyId: Int!
    $distanceUnitId: Int!
  ) {
    editProject(
      id: $id
      savingsTypeId: $savingsTypeId
      effectiveFrom: $effectiveFrom
      effectiveTo: $effectiveTo
      reportFrom: $reportFrom
      reportTo: $reportTo
      description: $description
      projectManagerId: $projectManagerId
      leadAnalystId: $leadAnalystId
      dataSpecialistId: $dataSpecialistId
      currencyId: $currencyId
      distanceUnitId: $distanceUnitId
    ) {
      ${PROJECT}
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: Int!) {
    deleteProject(id: $id)
  }
`;

export const TOGGLE_FAVORITE_PROJECT = gql`
  mutation toggleFavoriteProject($id: Int!) {
    toggleFavoriteProject(id: $id) {
      id
      favorite
    }
  }
`;

export const UPDATE_PROJECT_STATUS = gql`
  mutation updateProjectStatus($id: Int!, $status: String!) {
    updateProjectStatus(id: $id, status: $status) @client
  }
`;
