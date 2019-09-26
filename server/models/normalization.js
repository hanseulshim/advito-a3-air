import { Model } from 'objection';

export class Normalization extends Model {
  static get tableName() {
    return 'discountnormalisation';
  }
}
