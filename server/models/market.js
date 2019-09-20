import { Model } from 'objection';

export class Market extends Model {
  static get tableName() {
    return 'origindestinationsegment';
  }
  get name() {
    return `${this.odoriginmarket} - ${this.oddestmarket}`;
  }
  static get relationMappings() {
    return {
      marketCalculated: {
        relation: Model.HasManyRelation,
        modelClass: MarketCalculated,
        join: {
          from: 'origindestinationsegment.id',
          to: 'origindestinationsegmentcalculated.origindestinationsegmentid'
        }
      }
    };
  }
}

export class MarketCalculated extends Model {
  static get tableName() {
    return 'origindestinationsegmentcalculated';
  }
}
