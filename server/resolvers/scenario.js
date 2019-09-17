import { Scenario, Lookup } from '../models';
import { SCENARIO_LOOKUP, SCENARIO } from '../constants';
import { raw } from 'objection';

export const scenario = {
  Query: {
    scenarioList: async (_, { projectId = null }) =>
      await Scenario.query()
        .select(
          'scenario.*',
          raw(
            `EXISTS(SELECT * FROM scenariocontract WHERE scenario_id = scenario.scenario_id)`
          ).as('airlineContracts')
        )
        .where('projectId', projectId),
    scenario: async (_, { id = null }) =>
      await Scenario.query()
        .select(
          'scenario.*',
          raw(
            `EXISTS(SELECT * FROM scenariocontract WHERE scenario_id = scenario.scenario_id)`
          ).as('airlineContracts')
        )
        .findById(id),
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
    })
  },
  Mutation: {
    // createScenario: async (
    //   _,
    //   { projectId, name, shortName, description, initType, initScenarioId }
    // ) => {
    //   const [scenarioMax] = await Scenario.query().select(
    //     raw('MAX(scenario_seq)')
    //   );
    //   const scenarioSeq = parseInt(scenarioMax.max) + 1;
    //   console.log(scenarioSeq);
    //   if (initType === SCENARIO_LOOKUP.INIT_BLANK) {
    //     // const influenceLevelCd = 0;
    //     // const priceInfluenceLevelCd = null;
    //     // const biasOverride = null;
    //     // const servedMarketThreshold = null;
    //     // const overlapThreshold = null;
    //     // const segmentIncrease = null;
    //     // const fareIncrease = null;
    //     // const useHistoricalShare = null;
    //     // const useHistoricalFares = null;
    //     // const ignoresSmallQsi = null;
    //     // const smallQsiThreshold = null;
    //     await Scenario.query().insert({
    //       projectId,
    //       name,
    //       shortName,
    //       description,
    //       scenarioSeq,
    //       initType,
    //       initScenarioId
    //     });
    //   }
    // }
  }
};
