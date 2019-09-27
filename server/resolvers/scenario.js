import { UserInputError } from 'apollo-server-lambda';
import {
  Scenario,
  Lookup,
  ScenarioContract,
  Contract,
  ScenarioPreferredCarrier,
  Market,
  Activity
} from '../models';
import { SCENARIO_LOOKUP, LOCATION_LOOKUP } from '../constants';
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
    scenarioPreferredContractCarrierList: async (_, { projectId }) => {
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
      await Lookup.query().where(
        'type',
        SCENARIO_LOOKUP.PREFERRED_CARRIER_TYPE
      ),
    scenarioMarketList: async (_, { clientGcn }) => {
      const marketList = await Market.query()
        .select(
          'odoriginmarket as originMarket',
          'oddestmarket as destMarket',
          'travelsector as travelSector',
          'l1.name as originMarketName',
          'l2.name as destMarketName',
          raw(`ARRAY_AGG(origindestinationsegment.id)`).as('idList')
        )
        .where('deleted', false)
        .andWhere('clientgcn', clientGcn)
        .groupBy(
          'odoriginmarket',
          'oddestmarket',
          'travelsector',
          'l1.name',
          'l2.name'
        )
        .havingNotNull('odoriginmarket')
        .havingNotNull('oddestmarket')
        .leftJoin(
          'location as l1',
          'origindestinationsegment.odoriginmarket',
          'l1.code'
        )
        .where('l1.locationtype', LOCATION_LOOKUP.AIRPORT)
        .leftJoin(
          'location as l2',
          'origindestinationsegment.oddestmarket',
          'l2.code'
        )
        .where('l2.locationtype', LOCATION_LOOKUP.AIRPORT);
      return marketList.map(
        ({
          originMarket,
          originMarketName,
          destMarket,
          destMarketName,
          travelSector,
          idList
        }) => ({
          name: `(${originMarket}) ${originMarketName} - (${destMarket}) ${destMarketName}`,
          travelSector,
          idList
        })
      );
    },
    scenarioTripDistributionList: async (_, { scenarioId, idList }) => {
      const marketList = await Market.query()
        .select('recordkey as recordKey')
        .whereIn('id', idList);
      const activityList = await Activity.query()
        .select(
          'airlinename as airlineName',
          'airlinecd as airlineCd',
          'fqsi as fQsi',
          'hqsi as hQsi',
          'citynamepair as cityNamePair',
          'poscountryname as posCountryName',
          's.id as id',
          's.trip_distribution as tripDistribution'
        )
        .leftJoin(
          'scenariotrip as s',
          'asr_activityflat_all.airlinecd',
          's.carrier_code'
        )
        .where(function() {
          this.whereNotNull('fqsi').orWhereNotNull('hqsi');
        })
        .whereIn('recordkey', marketList.map(({ recordKey }) => recordKey));

      console.log(activityList);
      return activityList.reduce(
        (arr, { id, airlineName, fQsi, hQsi, tripDistribution }) => {
          const index = arr.findIndex(v => v.airlineName === airlineName);
          if (index !== -1) {
            arr[index].fQsi += parseFloat(fQsi);
            arr[index].hQsi += parseFloat(hQsi);
            return arr;
          }
          arr.push({
            id,
            tripDistribution,
            scenarioId,
            airlineName,
            fQsi: parseFloat(fQsi),
            hQsi: parseFloat(hQsi)
          });
          return arr;
        },
        []
      );
    }
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
    },
    updateScenarioPreferredCarriers: async (_, { carrierList = [] }) => {
      const scenarioRequests = carrierList.map(
        ({ id, scenarioId, sectorId, carrier, tier }) => {
          const obj = {
            scenarioId,
            sectorId,
            carrierCd: carrier,
            tier
          };
          return id
            ? ScenarioPreferredCarrier.query().patchAndFetchById(id, obj)
            : ScenarioPreferredCarrier.query().insert(obj);
        }
      );
      await Promise.all(scenarioRequests);
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
