import { Model } from 'objection';

export class RulesContainer extends Model {
  static get tableName() {
    return 'rulescontainer';
  }
  static get relationMappings() {
    const { Discount, TargetTerm } = require('./contract');

    return {
      discount: {
        relation: Model.BelongsToOneRelation,
        modelClass: Discount,
        join: {
          from: 'rulescontainer.guidref',
          to: 'discount.rulescontainerguidref'
        }
      },
      targetTerm: {
        relation: Model.BelongsToOneRelation,
        modelClass: TargetTerm,
        join: {
          from: 'rulescontainer.guidref',
          to: 'targetterm_v2.rulescontainerguidref'
        }
      }
    };
  }
}
