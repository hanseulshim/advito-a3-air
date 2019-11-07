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
      },
      ticketDateRule: {
        relation: Model.HasManyRelation,
        modelClass: TicketDateRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'ticketdaterule.rulescontainerguidref'
        }
      },
      travelDateRule: {
        relation: Model.HasManyRelation,
        modelClass: TravelDateRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'traveldaterule.rulescontainerguidref'
        }
      },
      pointOfSale: {
        relation: Model.HasManyRelation,
        modelClass: PointOfSale,
        join: {
          from: 'rulescontainer.guidref',
          to: 'pointofsale.rulescontainerguidref'
        }
      },
      pointOfOrigin: {
        relation: Model.HasManyRelation,
        modelClass: PointOfOrigin,
        join: {
          from: 'rulescontainer.guidref',
          to: 'pointoforigin.rulescontainerguidref'
        }
      },
      geographyRule: {
        relation: Model.HasManyRelation,
        modelClass: GeographyRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'geographyrule.rulescontainerguidref'
        }
      },
      fareBasisList: {
        relation: Model.HasManyRelation,
        modelClass: FareBasisList,
        join: {
          from: 'rulescontainer.guidref',
          to: 'farebasis_list.rulescontainerguidref'
        }
      },
      bookingClassRule: {
        relation: Model.HasManyRelation,
        modelClass: BookingClassRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'bookingclassrule.rulescontainerguidref'
        }
      },
      carrierRule: {
        relation: Model.HasManyRelation,
        modelClass: CarrierRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'carrierrule.rulescontainerguidref'
        }
      },
      ticketDesignatorRule: {
        relation: Model.HasManyRelation,
        modelClass: TicketDesignatorRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'ticketdesignatorrule.rulescontainerguidref'
        }
      },
      tourCodeRule: {
        relation: Model.HasManyRelation,
        modelClass: TourCodeRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'tourcoderule.rulescontainerguidref'
        }
      },
      advancePurchaseRule: {
        relation: Model.HasManyRelation,
        modelClass: AdvancePurchaseRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'advancepurchaserule.rulescontainerguidref'
        }
      },
      minStayRule: {
        relation: Model.HasManyRelation,
        modelClass: MinStayRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'minstayrule.rulescontainerguidref'
        }
      },
      maxStayRule: {
        relation: Model.HasManyRelation,
        modelClass: MaxStayRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'maxstayrule.rulescontainerguidref'
        }
      },
      dayOfWeekRule: {
        relation: Model.HasManyRelation,
        modelClass: DayOfWeekRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'dayofweekrule.rulescontainerguidref'
        }
      },
      stopsRule: {
        relation: Model.HasManyRelation,
        modelClass: StopsRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'stopsrule.rulescontainerguidref'
        }
      },
      connectionRule: {
        relation: Model.HasManyRelation,
        modelClass: ConnectionRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'connectionrule.rulescontainerguidref'
        }
      },
      flightNumberRule: {
        relation: Model.HasManyRelation,
        modelClass: FlightNumberRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'flightnumberrule.rulescontainerguidref'
        }
      },
      blackoutDateRule: {
        relation: Model.HasManyRelation,
        modelClass: BlackoutDateRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'blackoutdaterule.rulescontainerguidref'
        }
      },
      distanceRule: {
        relation: Model.HasManyRelation,
        modelClass: DistanceRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'distancerule.rulescontainerguidref'
        }
      },
      cabinRule: {
        relation: Model.HasManyRelation,
        modelClass: CabinRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'cabinrule.rulescontainerguidref'
        }
      },
      fareCategoryRule: {
        relation: Model.HasManyRelation,
        modelClass: FareCategoryRule,
        join: {
          from: 'rulescontainer.guidref',
          to: 'farecategoryrule.rulescontainerguidref'
        }
      }
    };
  }
}

export class TicketDateRule extends Model {
  static get tableName() {
    return 'ticketdaterule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'ticketdaterule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class TravelDateRule extends Model {
  static get tableName() {
    return 'traveldaterule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'traveldaterule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class PointOfSale extends Model {
  static get tableName() {
    return 'pointofsale';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'pointofsale.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class PointOfOrigin extends Model {
  static get tableName() {
    return 'pointoforigin';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'pointoforigin.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class GeographyRule extends Model {
  static get tableName() {
    return 'geographyrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'geographyrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class FareBasisList extends Model {
  static get tableName() {
    return 'farebasis_list';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'farebasis_list.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class BookingClassRule extends Model {
  static get tableName() {
    return 'bookingclassrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'bookingclassrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class CarrierRule extends Model {
  static get tableName() {
    return 'carrierrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'carrierrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class TicketDesignatorRule extends Model {
  static get tableName() {
    return 'ticketdesignatorrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'ticketdesignatorrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class TourCodeRule extends Model {
  static get tableName() {
    return 'tourcoderule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'tourcoderule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class AdvancePurchaseRule extends Model {
  static get tableName() {
    return 'advancepurchaserule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'advancepurchaserule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class MinStayRule extends Model {
  static get tableName() {
    return 'minstayrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'minstayrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class MaxStayRule extends Model {
  static get tableName() {
    return 'maxstayrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'maxstayrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class DayOfWeekRule extends Model {
  static get tableName() {
    return 'dayofweekrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'dayofweekrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class StopsRule extends Model {
  static get tableName() {
    return 'stopsrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'stopsrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class ConnectionRule extends Model {
  static get tableName() {
    return 'connectionrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'connectionrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class FlightNumberRule extends Model {
  static get tableName() {
    return 'flightnumberrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'flightnumberrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class BlackoutDateRule extends Model {
  static get tableName() {
    return 'blackoutdaterule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'blackoutdaterule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class DistanceRule extends Model {
  static get tableName() {
    return 'distancerule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'distancerule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class CabinRule extends Model {
  static get tableName() {
    return 'cabinrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'cabinrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
export class FareCategoryRule extends Model {
  static get tableName() {
    return 'farecategoryrule';
  }
  static get relationMappings() {
    return {
      rulesContainer: {
        relation: Model.BelongsToOneRelation,
        modelClass: RulesContainer,
        join: {
          from: 'farecategoryrule.rulescontainerguidref',
          to: 'rulescontainer.guidref'
        }
      }
    };
  }
}
