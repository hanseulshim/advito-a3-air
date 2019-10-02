import { Model } from 'objection';

export class Contract extends Model {
  static get tableName() {
    return 'contractcontainer';
  }
}
