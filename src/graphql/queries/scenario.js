import gql from 'graphql-tag';
import { SCENARIO } from '../constants';

export const GET_SCENARIO_LIST = gql`
  query scenarioList($projectId: Int) {
    scenarioList(projectId: $projectId) {
      ${SCENARIO}
    }
  }
`;

export const GET_SCENARIO = gql`
  query scenario($id: Int!) {
    scenario(id: $id) {
      ${SCENARIO}
    }
  }
`;
export const GET_SCENARIO_TYPE_LIST = gql`
  query scenarioTypeList {
    scenarioTypeList {
      id
      name
    }
  }
`;

export const GET_SCENARIO_CONTRACT_LIST = gql`
  query scenarioContractList($scenarioId: Int!) {
    scenarioContractList(scenarioId: $scenarioId)
  }
`;

export const GET_SCENARIO_PARAMETERS = gql`
  query scenarioParameters {
    scenarioParameters {
      influenceLevelList {
        id
        name
      }
      priceInfluenceLevelList {
        id
        name
      }
      biasOverrideList {
        id
        name
      }
    }
  }
`;

export const GET_SCENARIO_PREFERRED_CONTRACT_CARRIER_LIST = gql`
  query scenarioPreferredContractCarrierList($projectId: Int!) {
    scenarioPreferredContractCarrierList(projectId: $projectId)
  }
`;

export const GET_SCENARIO_PREFERRED_CARRIER_LIST = gql`
  query scenarioPreferredCarrierList($scenarioId: Int!) {
    scenarioPreferredCarrierList(scenarioId: $scenarioId) {
      id
      scenarioId
      sectorId
      carrierCode
      tier
    }
  }
`;

export const GET_SCENARIO_TRAVEL_SECTOR_LIST = gql`
  query scenarioTravelSectorList($projectId: Int!) {
    scenarioTravelSectorList(projectId: $projectId) {
      id
      name
      shortName
      standard
    }
  }
`;

export const GET_SCENARIO_PREFERRED_CARRIER_TIER_LIST = gql`
  query scenarioPreferredCarrierTierList {
    scenarioPreferredCarrierTierList {
      id
      name
    }
  }
`;

export const GET_SCENARIO_PREFERRED_AIRLINE_LIST = gql`
  query scenarioPreferredAirlineList($projectId: Int!) {
    scenarioPreferredAirlineList(projectId: $projectId) {
      id
      code
      name
    }
  }
`;

export const GET_SCENARIO_MARKET_LIST = gql`
  query scenarioMarketList($clientGcn: String, $projectId: Int) {
    scenarioMarketList(clientGcn: $clientGcn, projectId: $projectId) {
      name
      travelSector
      idList
    }
  }
`;

export const GET_SCENARIO_TRIP_DISTRIBUTION_LIST = gql`
  query scenarioTripDistributionList(
    $idList: [Int]
    $scenarioId: Int!
    $projectId: Int!
  ) {
    scenarioTripDistributionList(
      idList: $idList
      scenarioId: $scenarioId
      projectId: $projectId
    ) {
      id
      scenarioId
      cityPair
      carrierCode
      tripDistribution
    }
  }
`;
