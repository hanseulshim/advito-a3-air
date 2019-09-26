import { UserInputError } from 'apollo-server-lambda';
import {
  Scenario,
  Lookup,
  ScenarioContract,
  Contract,
  ScenarioPreferredCarrier
} from '../models';
import { SCENARIO_LOOKUP } from '../constants';
import { raw } from 'objection';
import uniq from 'lodash/uniq';

export const scenario = {
  Query: {
    scenarioList: async (_, { projectId = null }) =>
      await Scenario.query()
        .select(
          'scenario.*',
          'scenario.scenarioId as id',
          raw(
            `EXISTS(SELECT * FROM scenariocontract WHERE scenario_id = scenario.scenario_id)`
          ).as('airlineContracts')
        )
        .where('projectId', projectId),
    scenario: async (_, { id = null }) => getScenario(id),
    scenarioTypeList: async () =>
      await Lookup.query().where('type', SCENARIO_LOOKUP.INIT_TYPE),
    scenarioParameters: async () => ({
      influenceLevelList: await Lookup.query().where(
        'type',
        SCENARIO_LOOKUP.INFLUENCE_LEVEL_TYPE
      ),
      priceInfluenceLevelList: await Lookup.query().where(
        'type',
        SCENARIO_LOOKUP.PRICE_INFLUENCE_LEVEL_TYPE
      ),
      biasOverrideList: await Lookup.query().where(
        'type',
        SCENARIO_LOOKUP.BIAS_OVERRIDE_TYPE
      )
    }),
    scenarioContractList: async (_, { scenarioId }) => {
      const scenarioContractList = await ScenarioContract.query().where(
        'scenarioId',
        scenarioId
      );
      return scenarioContractList.map(contract => contract.contractId);
    },
    scenarioPreferredContractList: async (_, { projectId }) => {
      const contractList = await Contract.query()
        .select(raw('(select * from contract_carrier_getlist(id))'))
        .where('isdeleted', false)
        .andWhere('projectid', projectId);
      const flattened = contractList.reduce(
        (a, b) => a.concat(b.contractCarrierGetlist),
        []
      );
      return uniq(flattened);
    },
    scenarioPreferredCarrierList: async (_, { scenarioId }) =>
      await ScenarioPreferredCarrier.query().where('scenarioId', scenarioId),
    scenarioPreferredCarrierTierList: async () =>
      await Lookup.query().where('type', SCENARIO_LOOKUP.PREFERRED_CARRIER_TYPE)
  },
  Mutation: {
    createScenario: async (
      _,
      {
        projectId,
        name,
        shortName,
        description,
        initializationType,
        initializationProjectId,
        initializationScenarioId
      }
    ) => {
      if (!name || !shortName)
        throw new UserInputError('Name and round are required');
      if (
        initializationType !== SCENARIO_LOOKUP.INIT_BLANK &&
        !initializationScenarioId
      )
        throw new UserInputError('Scenario id is required');
      const [scenarioMax] = await Scenario.query().select(
        raw('MAX(scenario_seq)')
      );
      const scenarioSeq = parseInt(scenarioMax.max) + 1;
      const influenceLevelCd = SCENARIO_LOOKUP.INFLUENCE_LEVEL_DEFAULT;
      const priceInfluenceLevelCd =
        SCENARIO_LOOKUP.PRICE_INFLUENCE_LEVEL_DEFAULT;
      const biasOverride = SCENARIO_LOOKUP.BIAS_OVERRIDE_DEFAULT;
      const params = {};
      if (initializationScenarioId) {
        const copyScenario = await Scenario.query().findById(
          initializationScenarioId
        );
        params.projectId = copyScenario.projectId;
        params.influenceLevelCd = copyScenario.influenceLevelCd;
        params.priceInfluenceLevelCd = copyScenario.priceInfluenceLevelCd;
        params.biasOverride = copyScenario.biasOverride;
        params.servedMarketThreshold = copyScenario.servedMarketThreshold;
        params.overlapThreshold = copyScenario.overlapThreshold;
        params.segmentIncrease = copyScenario.segmentIncrease;
        params.fareIncrease = copyScenario.fareIncrease;
        params.useHistoricalShare = copyScenario.useHistoricalShare;
        params.useHistoricalFares = copyScenario.useHistoricalFares;
        params.ignoresSmallQsi = copyScenario.ignoresSmallQsi;
        params.smallQsiThreshold = copyScenario.smallQsiThreshold;
      }
      const resultScenario = await Scenario.query().insert({
        projectId,
        name,
        shortName,
        description,
        scenarioSeq,
        initializationType,
        initializationProjectId: initializationProjectId
          ? initializationProjectId
          : 0,
        initializationScenarioId,
        influenceLevelCd,
        priceInfluenceLevelCd,
        biasOverride,
        ...params
      });
      return getScenario(resultScenario.scenarioId);
    },
    updateScenario: async (_, { id, name, shortName, description }) => {
      await Scenario.query()
        .findById(id)
        .patch({
          name,
          shortName,
          description
        });
      return getScenario(id);
    },
    deleteScenario: async (_, { id }) => {
      await Scenario.query().deleteById(id);
      return id;
    },
    updateScenarioParameters: async (
      _,
      {
        id,
        influenceLevelCd,
        priceInfluenceLevelCd,
        biasOverride,
        servedMarketThreshold,
        overlapThreshold,
        segmentIncrease,
        fareIncrease,
        useHistoricalShare,
        useHistoricalFares,
        ignoresSmallQsi,
        smallQsiThreshold
      }
    ) => {
      await Scenario.query()
        .findById(id)
        .patch({
          influenceLevelCd,
          priceInfluenceLevelCd,
          biasOverride,
          servedMarketThreshold,
          overlapThreshold,
          segmentIncrease,
          fareIncrease,
          useHistoricalShare,
          useHistoricalFares,
          ignoresSmallQsi,
          smallQsiThreshold
        });
      return getScenario(id);
    },
    toggleScenarioContract: async (_, { scenarioId, contractIdList }) => {
      await ScenarioContract.query()
        .delete()
        .where('scenarioId', scenarioId);
      const contractRequests = contractIdList.map(id =>
        ScenarioContract.query().insert({
          scenarioId,
          contractId: id
        })
      );
      await Promise.all(contractRequests);
    }
  }
};

const getScenario = async id =>
  await Scenario.query()
    .select(
      'scenario.*',
      'scenario.scenarioId as id',
      raw(
        `EXISTS(SELECT * FROM scenariocontract WHERE scenario_id = scenario.scenario_id)`
      ).as('airlineContracts')
    )
    .findById(id);
