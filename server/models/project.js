import { Model } from 'objection';

export class ProjectDataRef extends Model {
  static get tableName() {
    return 'projectDataRef';
  }
}

export class ProjectUserFavorite extends Model {
  static get tableName() {
    return 'projectUserFavorite';
  }
}

export class Project extends Model {
  static get tableName() {
    return 'project';
  }

  static get relationMappings() {
    return {
      projectDataRef: {
        relation: Model.HasManyRelation,
        modelClass: ProjectDataRef,
        join: {
          from: 'project.id',
          to: 'projectDataRef.projectId'
        }
      },
      projectUserFavorite: {
        relation: Model.HasManyRelation,
        modelClass: ProjectUserFavorite,
        join: {
          from: 'project.id',
          to: 'projectUserFavorite.projectId'
        }
      }
    };
  }
}

export class ProjectList extends Model {
  static get tableName() {
    return 'projectList';
  }

  static get relationMappings() {
    return {
      projectUserFavorite: {
        relation: Model.HasManyRelation,
        modelClass: ProjectUserFavorite,
        join: {
          from: 'projectList.id',
          to: 'projectUserFavorite.projectId'
        }
      }
    };
  }
}

export class Report extends Model {
  static get tableName() {
    return 'report';
  }
}
