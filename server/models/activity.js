import { Model } from 'objection';

export class Activity extends Model {
  static get tableName() {
    return 'asr_activityflat_all';
  }
}
