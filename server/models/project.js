import { Model } from 'objection';

export class ProjectDataRef extends Model {
  static get tableName() {
    return 'projectdataref';
  }
}
