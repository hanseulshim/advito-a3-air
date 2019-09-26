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
      },
      scenarioPreferredCarrier: {
        relation: Model.HasManyRelation,
        modelClass: ScenarioPreferredCarrier,
        join: {
          from: 'scenario.scenarioId',
          to: 'scenariopreferredcarrier.scenarioId'
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

export class ScenarioPreferredCarrier extends Model {
  static get tableName() {
    return 'scenariopreferredcarrier';
  }
  get carrier() {
    return this.carrierCd;
  }
}
