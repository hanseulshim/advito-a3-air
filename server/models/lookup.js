import { Model } from 'objection';

export class Lookup extends Model {
  static get tableName() {
    return 'lovLookup';
  }
  get name() {
    return this.nameVal;
  }
}
