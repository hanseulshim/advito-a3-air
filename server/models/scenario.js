import { Model } from 'objection';

export class Scenario extends Model {
  static get tableName() {
    return 'scenario';
  }
  static get idColumn() {
    return 'scenarioId';
  }
  static get relationMappings() {
    return {
      scenarioContract: {
        relation: Model.HasManyRelation,
        modelClass: ScenarioContract,
        join: {
          from: 'scenario.scenarioId',
          to: 'scenariocontract.scenarioId'
        }
      }
    };
  }
}

export class ScenarioContract extends Model {
  static get tableName() {
    return 'scenariocontract';
  }
}
