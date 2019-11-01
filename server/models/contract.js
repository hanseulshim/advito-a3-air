import { Model } from 'objection';

export class Contract extends Model {
  static get tableName() {
    return 'contractcontainer';
  }

  static get relationMappings() {
    return {
      pricingTerms: {
        relation: Model.HasManyRelation,
        modelClass: PricingTerm,
        join: {
          from: 'contractcontainer.id',
          to: 'pricingterm.contractcontainerid'
        }
      },
      targetTerms: {
        relation: Model.HasManyRelation,
        modelClass: TargetTerm,
        join: {
          from: 'contractcontainer.id',
          to: 'targetterm_v2.contractcontainerid'
        }
      }
    };
  }

  static get modifiers() {
    return {
      onlyValid(builder) {
        builder.where('isdeleted', false);
      }
    };
  }
}
export class TargetTerm extends Model {
  static get tableName() {
    return 'targetterm_v2';
  }

  static get relationMappings() {
    const { RulesContainer } = require('./rules');

    return {
      contract: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contract,
        join: {
          from: 'targetterm_v2.contractcontainerid',
          to: 'contractcontainer.id'
        }
      },
      rules: {
        relation: Model.HasOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'targetterm_v2.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }

  static get modifiers() {
    return {
      onlyValid(builder) {
        builder.where('isdeleted', false);
      }
    };
  }
}

export class PricingTerm extends Model {
  static get tableName() {
    return 'pricingterm';
  }

  static get relationMappings() {
    return {
      discounts: {
        relation: Model.HasManyRelation,
        modelClass: Discount,
        join: {
          from: 'pricingterm.id',
          to: 'discount.pricingtermid'
        }
      },
      contract: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contract,
        join: {
          from: 'pricingterm.contractcontainerid',
          to: 'contractcontainer.id'
        }
      }
    };
  }

  static get modifiers() {
    return {
      onlyValid(builder) {
        builder.where('isdeleted', false);
      }
    };
  }
}

export class Discount extends Model {
  static get tableName() {
    return 'discount';
  }

  static get relationMappings() {
    const { RulesContainer } = require('./rules');
    return {
      pricingTerm: {
        relation: Model.BelongsToOneRelation,
        modelClass: PricingTerm,
        join: {
          from: 'discount.pricingtermid',
          to: 'pricingterm.id'
        }
      },
      rules: {
        relation: Model.HasOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'discount.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }

  static get modifiers() {
    return {
      onlyValid(builder) {
        builder.where('isdeleted', false);
      }
    };
  }
}
