import { Model } from 'objection';

export class Contract extends Model {
  static get tableName() {
    return 'contractcontainer';
  }
}
export class TargetTerm extends Model {
  static get tableName() {
    return 'targetterm_v2';
  }
}

export class PricingTerm extends Model {
  static get tableName() {
    return 'pricingterm';
  }
}

export class Discount extends Model {
  static get tableName() {
    return 'discount';
  }
}
