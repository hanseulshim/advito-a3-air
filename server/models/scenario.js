import { Model } from 'objection';

export class Scenario extends Model {
  static get tableName() {
    return 'scenario';
  }
  static get idColumn() {
    return 'scenarioId';
  }
}
