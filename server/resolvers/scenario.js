import { Scenario } from '../models';
export const scenario = {
  Query: {
    scenarioList: async (_, { projectId = null }) =>
      await Scenario.query().where('projectId', projectId),
    scenario: async (_, { id = null }) => await Scenario.query().findById(id)
  }
};
