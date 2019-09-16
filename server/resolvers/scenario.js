import { Scenario } from '../models';
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
        .findById(id)
  }
};
