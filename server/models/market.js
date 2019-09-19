import { Model } from 'objection';

export class Market extends Model {
  static get tableName() {
    return 'origindestinationsegment';
  }
}
