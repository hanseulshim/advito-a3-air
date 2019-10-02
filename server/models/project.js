import { Model } from 'objection';

export class ProjectDataRef extends Model {
  static get tableName() {
    return 'projectdataref';
  }
}

export class Project extends Model {
  static get tableName() {
    return 'project';
  }
}

export class Report extends Model {
  static get tableName() {
    return 'report';
  }
}
