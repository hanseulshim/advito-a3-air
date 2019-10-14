import { Model } from 'objection';

export class AdvitoUser extends Model {
  static get tableName() {
    return 'blops.advitoUser';
  }

  name() {
    return this.nameFirst + ' ' + this.nameLast;
  }

  static get relationMappings() {
    return {
      advitoUserRoleLink: {
        relation: Model.HasManyRelation,
        modelClass: AdvitoUserRoleLink,
        join: {
          from: 'blops.advitoUser.id',
          to: 'blops.advitoUserRoleLink.advitoUserId'
        }
      },
      advitoUserSession: {
        relation: Model.HasManyRelation,
        modelClass: AdvitoUserSession,
        join: {
          from: 'blops.advitoUser.id',
          to: 'blops.advitoUserSession.advitoUserId'
        }
      },
      accessToken: {
        relation: Model.HasManyRelation,
        modelClass: AccessToken,
        join: {
          from: 'blops.advitoUser.id',
          to: 'blops.accessToken.advitoUserId'
        }
      }
    };
  }
}

export class AdvitoUserRoleLink extends Model {
  static get tableName() {
    return 'blops.advitoUserRoleLink';
  }
}

export class AdvitoUserSession extends Model {
  static get tableName() {
    return 'blops.advitoUserSession';
  }

  static get relationMappings() {
    return {
      advitoUser: {
        relation: Model.HasManyRelation,
        modelClass: AdvitoUser,
        join: {
          from: 'blops.advitoUserSession.advitoUserId',
          to: 'blops.advitoUser.id'
        }
      }
    };
  }
}

export class AccessToken extends Model {
  static get tableName() {
    return 'blops.accessToken';
  }
}

export class EmailTemplate extends Model {
  static get tableName() {
    return 'blops.emailTemplate';
  }
}
