import { SCENARIO } from '../constants';
export default {
  queries: {
    name: 'Scenario Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
  {
    scenarioList(projectId: null) {
      ${SCENARIO}
    }
    scenario(id: null) {
      ${SCENARIO}
    }
    scenarioTypeList {
      id
      name
    }
    scenarioContractList(scenarioId: null)
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
    scenarioPreferredContractCarrierList(projectId: null)
    scenarioPreferredCarrierList(scenarioId: null) {
      id
      scenarioId
      sectorId
      carrierCode
      tier
    }
    scenarioPreferredCarrierTierList {
      id
      name
    }
    scenarioMarketList(clientGcn: null) {
      name
      travelSector
      idList
    }
    scenarioTripDistributionList(idList: [], projectId: null, scenarioId: null) {
      id
      scenarioId
      tripDistribution
      airlineName
      posCountryName
      fareCategory
      fQsi
      hQsi
    }
    scenarioTravelSectorList(projectId: null) {
      id
      name
      shortName
      standard
    }
  }`
  },
  mutations: {
    name: 'Scenario Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      createScenario(
        projectId: null
        name: ""
        shortName: ""
        description: ""
        initializationType: 92
        initializationProjectId: null
        initializationScenarioId: null
      ) {
        ${SCENARIO}
      }
      updateScenario(
        id: null
        name: ""
        shortName: ""
        description: ""
      ) {
        ${SCENARIO}
      }
      deleteScenario(
        id: null
      )
      updateScenarioParameters(
        id: null
        influenceLevelCd: null
        priceInfluenceLevelCd: null
        biasOverride: null
        servedMarketThreshold: null
        overlapThreshold: null
        segmentIncrease: null
        fareIncrease: null
        useHistoricalShare: null
        useHistoricalFares: null
        ignoresSmallQsi: null
        smallQsiThreshold: null
      ) {
        ${SCENARIO}
      }
      toggleScenarioContract(
        scenarioId: null
        contractIdList: []
      )
      updateScenarioPreferredCarriers(carrierList: [])
      updateScenarioTripDistributions(tripDistributionList: [])
    }`
  }
};
