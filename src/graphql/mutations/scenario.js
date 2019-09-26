import gql from 'graphql-tag';
import { SCENARIO } from '../constants';

export const CREATE_SCENARIO = gql`
  mutation createScenario(
    $projectId: Int!
    $name: String!
    $shortName: String!
    $description: String
    $initializationType: Int!
    $initializationProjectId: Int
    $initializationScenarioId: Int
  ) {
    createScenario(
      projectId: $projectId
      name: $name
      shortName: $shortName
      description: $description
      initializationType: $initializationType
      initializationProjectId: $initializationProjectId
      initializationScenarioId: $initializationScenarioId
    ){
        ${SCENARIO}
    }
  }
`;

export const DELETE_SCENARIO = gql`
  mutation deleteScenario($id: Int!) {
    deleteScenario(id: $id)
  }
`;

export const UPDATE_SCENARIO = gql`
  mutation updateScenario(
    $id: Int!
    $name: String!
    $shortName: String!
    $description: String
  ) {
    updateScenario(
      id: $id
      name: $name
      shortName: $shortName
      description: $description
    ){
    ${SCENARIO}
    }
  }
`;

export const UPDATE_SCENARIO_PARAMETERS = gql`
  mutation updateScenarioParameters(
    $id: Int!
    $influenceLevelCd: Int!
    $priceInfluenceLevelCd: Int!
    $biasOverride: Int!
    $servedMarketThreshold: Float
    $overlapThreshold: Float
    $segmentIncrease: Float
    $fareIncrease: Float
    $useHistoricalShare: Boolean!
    $useHistoricalFares: Boolean!
    $ignoresSmallQsi: Boolean!
    $smallQsiThreshold: Float
  ) {
    updateScenarioParameters(
      id: $id
      influenceLevelCd: $influenceLevelCd
      priceInfluenceLevelCd: $priceInfluenceLevelCd
      biasOverride: $biasOverride
      servedMarketThreshold: $servedMarketThreshold
      overlapThreshold: $overlapThreshold
      segmentIncrease: $segmentIncrease
      fareIncrease: $fareIncrease
      useHistoricalShare: $useHistoricalShare
      useHistoricalFares: $useHistoricalFares
      ignoresSmallQsi: $ignoresSmallQsi
      smallQsiThreshold: $smallQsiThreshold
    ){
      ${SCENARIO}
    }
  }
`;

export const TOGGLE_SCENARIO_CONTRACT = gql`
  mutation toggleScenarioContract($scenarioId: Int!, $contractIdList: [Int]!) {
    toggleScenarioContract(
      scenarioId: $scenarioId
      contractIdList: $contractIdList
    )
  }
`;
