const {
  DISCOUNT_LOOKUP,
  TARGET_TERM_LOOKUP,
  CONTRACT_LOOKUP,
  RULE_LOOKUP
} = require('../../constants');

exports.rule = {
  Query: {
    ruleList: async (_, { parentId, parentType }, { db }) => {
      const ruleContainerId = await getRuleContainerId(
        db,
        parentId,
        parentType
      );
      if (!ruleContainerId) return [];
      const { rows } = await db.raw(
        `SELECT tableid from rules_checker2('${ruleContainerId}')`
      );
      return rows.map(row => row.tableid);
    },
    geographyRuleList: async (_, __, { db }) =>
      await db('location')
        .select({
          name: 'name',
          code: 'code',
          locationType: 'locationtype'
        })
        .where(function() {
          this.where('locationtype', 5).orWhere('locationtype', 3);
        })
        .andWhere('clientid', CONTRACT_LOOKUP.ID)
        .andWhere('isdeleted', false)
        .orderBy([
          {
            column: 'locationtype',
            order: 'desc'
          },
          'code'
        ]),
    marketGeoList: async (_, __, { db }) =>
      await db('location')
        .select({
          name: 'name',
          code: 'code',
          locationType: 'locationtype'
        })
        .where(function() {
          this.where('locationtype', 5)
            .orWhere('locationtype', 3)
            .orWhere('locationtype', 1)
            .orWhere('locationtype', 0);
        })
        .andWhere('clientid', CONTRACT_LOOKUP.ID)
        .andWhere('isdeleted', false)
        .orderBy([
          {
            column: 'locationtype',
            order: 'desc'
          },
          'code'
        ]),
    bookingClassCodeList: async (_, __, { db }) =>
      await db('bookingclass')
        .select({
          fareCategoryId: 'farecategoryid',
          code: 'code'
        })
        .where('isdeleted', false),
    airlineCodeList: async (_, __, { db }) =>
      await db('carrier')
        .select({
          name: 'name',
          code: 'code'
        })
        .where('isdeleted', false),
    dayOfWeekUnitList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', RULE_LOOKUP.DAY_OF_WEEK_UNIT),
    dayUnitList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', RULE_LOOKUP.DAY_UNIT),
    ticketingDateList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.TICKET_DATE),
    travelDateList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.TRAVEL_DATE),
    pointOfSaleList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.POINT_OF_SALE),
    pointOfOriginList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.POINT_OF_ORIGIN),
    marketList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.MARKET),
    bookingClassList: async (_, { parentId, bookingClassType = 1 }, { db }) =>
      await getRuleList(
        db,
        parentId,
        undefined,
        RULE_LOOKUP.BOOKING_CLASS,
        bookingClassType
      ),
    airlineList: async (_, { parentId, airlineType = 1 }, { db }) =>
      await getRuleList(
        db,
        parentId,
        undefined,
        RULE_LOOKUP.AIRLINE,
        airlineType
      ),
    ticketDesignatorList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.TICKET_DESIGNATOR),
    tourCodeList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.TOUR_CODE),
    stopsList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.STOPS),
    advancedTicketingList: async (_, { parentId }, { db }) =>
      await getRuleList(
        db,
        parentId,
        undefined,
        RULE_LOOKUP.ADVANCED_TICKETING
      ),
    minStayList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.MIN_STAY),
    maxStayList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.MAX_STAY)
  },
  Mutation: {
    updateTicketingDate: async (
      _,
      { parentId, parentType, ticketingDateList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        parentType,
        ticketingDateList,
        RULE_LOOKUP.TICKET_DATE
      ),
    updateTravelDate: async (
      _,
      { parentId, parentType, travelDateList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        parentType,
        travelDateList,
        RULE_LOOKUP.TRAVEL_DATE
      ),
    updatePointOfSale: async (
      _,
      { parentId, parentType, pointOfSaleList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        parentType,
        pointOfSaleList,
        RULE_LOOKUP.POINT_OF_SALE
      ),
    updatePointOfOrigin: async (
      _,
      { parentId, parentType, pointOfOriginList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        parentType,
        pointOfOriginList,
        RULE_LOOKUP.POINT_OF_ORIGIN
      ),
    updateMarket: async (_, { parentId, parentType, marketList }, { db }) =>
      await updateRule(
        db,
        parentId,
        parentType,
        marketList,
        RULE_LOOKUP.MARKET
      ),
    updateBookingClass: async (
      _,
      { parentId, bookingClassType = 1, bookingClassList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        undefined,
        bookingClassList,
        RULE_LOOKUP.BOOKING_CLASS,
        bookingClassType
      ),
    updateAirline: async (
      _,
      { parentId, airlineType = 1, airlineList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        undefined,
        airlineList,
        RULE_LOOKUP.AIRLINE,
        airlineType
      ),
    updateTicketDesignator: async (
      _,
      { parentId, ticketDesignatorList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        undefined,
        ticketDesignatorList,
        RULE_LOOKUP.TICKET_DESIGNATOR
      ),
    updateTourCode: async (_, { parentId, tourCodeList }, { db }) =>
      await updateRule(
        db,
        parentId,
        undefined,
        tourCodeList,
        RULE_LOOKUP.TOUR_CODE
      ),
    updateStops: async (_, { parentId, stopsList }, { db }) =>
      await updateRule(db, parentId, undefined, stopsList, RULE_LOOKUP.STOPS),
    updateAdvancedTicketing: async (
      _,
      { parentId, advancedTicketingList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        undefined,
        advancedTicketingList,
        RULE_LOOKUP.ADVANCED_TICKETING
      ),
    updateMinStay: async (_, { parentId, minStayList }, { db }) =>
      await updateRule(
        db,
        parentId,
        undefined,
        minStayList,
        RULE_LOOKUP.MIN_STAY
      ),
    updateMaxStay: async (_, { parentId, maxStayList }, { db }) =>
      await updateRule(
        db,
        parentId,
        undefined,
        maxStayList,
        RULE_LOOKUP.MAX_STAY
      ),
    deleteRule: async (_, { id, ruleType }, { db }) => {
      const { tableName } = getRuleInfo(ruleType);
      await db.raw(`SELECT rule_delete(${id}, '${tableName}')`);
    }
  }
};

const getRuleContainerId = async (db, parentId, parentType) => {
  if (!parentId) return null;
  const table = getParentTable(parentType);
  if (!table) return null;
  const [parent] = await db(table)
    .select('rulescontainerguidref')
    .where('id', parentId);
  if (!parent) return null;
  const { rulescontainerguidref: ruleContainerId } = parent;
  return ruleContainerId;
};

const getParentTable = (parentType = DISCOUNT_LOOKUP.RULE_TYPE) =>
  parentType === DISCOUNT_LOOKUP.RULE_TYPE
    ? 'discount'
    : parentType === TARGET_TERM_LOOKUP.RULE_TYPE
    ? 'targetterm_v2'
    : null;

const getRuleList = async (db, parentId, parentType, ruleType, type) => {
  const ruleInfo = getRuleInfo(ruleType);
  const ruleContainerId = await getRuleContainerId(db, parentId, parentType);
  if (!ruleContainerId) return [];
  const select = {
    id: 'id',
    ruleContainerId: 'rulescontainerguidref',
    isDeleted: 'isdeleted'
  };
  return type
    ? await db(ruleInfo.tableName)
        .select({
          ...select,
          ...ruleInfo.select
        })
        .where('rulescontainerguidref', ruleContainerId)
        .where(ruleInfo.type, type)
        .andWhere('isdeleted', false)
    : await db(ruleInfo.tableName)
        .select({
          ...select,
          ...ruleInfo.select
        })
        .where('rulescontainerguidref', ruleContainerId)
        .andWhere('isdeleted', false);
};

const updateRule = async (
  db,
  parentId,
  parentType,
  ruleList,
  ruleType,
  type
) => {
  const ruleInfo = getRuleInfo(ruleType);
  const parentTable = getParentTable(parentType);
  const queries = ruleList.map(rule =>
    db.raw(`
        SELECT ${ruleInfo.update}(
          ${parentId},
          '${parentTable}',
          ${rule.id},
          ${rule.ruleContainerId ? `'${rule.ruleContainerId}'` : null},
          ${ruleInfo.params.map(param => {
            return param.type === 'string'
              ? `'${rule[param.name]}'`
              : param.type === 'date'
              ? `'${new Date(rule[param.name]).toISOString()}'`
              : `${rule[param.name]}`;
          })},
          ${rule.isDeleted}
        )
      `)
  );
  await Promise.all(queries);
  return await getRuleList(db, parentId, parentType, ruleType, type);
};

const getRuleInfo = id => {
  if (id === 1) {
    return {
      tableName: 'ticketdaterule',
      select: { startDate: 'startdate', endDate: 'enddate' },
      update: 'ticketdaterule_create_update',
      params: [
        {
          name: 'startDate',
          type: 'date'
        },
        {
          name: 'endDate',
          type: 'date'
        }
      ]
    };
  } else if (id === 2) {
    return {
      tableName: 'traveldaterule',
      select: { startDate: 'startdate', endDate: 'enddate' },
      update: 'traveldaterule_create_update',
      params: [
        {
          name: 'startDate',
          type: 'date'
        },
        {
          name: 'endDate',
          type: 'date'
        }
      ]
    };
  } else if (id === 3) {
    return {
      tableName: 'pointofsale',
      select: { countryCode: 'countrycode' },
      update: 'pointofsale_update',
      params: [
        {
          name: 'countryCode',
          type: 'string'
        }
      ]
    };
  } else if (id === 4) {
    return {
      tableName: 'pointoforigin',
      select: { countryCode: 'countrycode' },
      update: 'pointoforigin_update',
      params: [
        {
          name: 'countryCode',
          type: 'string'
        }
      ]
    };
  } else if (id === 5) {
    return {
      tableName: 'geographyrule',
      select: {
        origin: 'origin',
        originType: 'origintype',
        arrival: 'arrival',
        arrivalType: 'arrivaltype',
        exclude: 'exclude'
      },
      update: 'geographyrule_update',
      params: [
        {
          name: 'origin',
          type: 'string'
        },
        {
          name: 'originType',
          type: 'int'
        },
        {
          name: 'arrival',
          type: 'string'
        },
        {
          name: 'arrivalType',
          type: 'int'
        },
        {
          name: 'exclude',
          type: 'boolean'
        }
      ]
    };
  } else if (id === 6 || id === 7) {
    return {
      tableName: 'farebasis',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 8 || id === 9) {
    return {
      tableName: 'bookingclassrule',
      select: {
        exclude: 'exclude',
        bookingClassType: 'bookingclasstype',
        bookingClass: 'bookingclass'
      },
      type: 'bookingclasstype',
      update: 'bookingclassrule_update',
      params: [
        {
          name: 'exclude',
          type: 'boolean'
        },
        {
          name: 'bookingClassType',
          type: 'int'
        },
        {
          name: 'bookingClass',
          type: 'string'
        }
      ]
    };
  } else if (id === 10 || id === 11 || id === 12) {
    return {
      tableName: 'carrierrule',
      select: {
        exclude: 'exclude',
        ruleType: 'ruletype',
        carrierCode: 'carriercode'
      },
      type: 'ruletype',
      update: 'carrierrule_update',
      params: [
        {
          name: 'exclude',
          type: 'boolean'
        },
        {
          name: 'ruleType',
          type: 'int'
        },
        {
          name: 'carrierCode',
          type: 'string'
        }
      ]
    };
  } else if (id === 13) {
    return {
      tableName: 'ticketdesignatorrule',
      select: {
        ticketDesignator: 'ticketdesignator'
      },
      update: 'ticketdesignatorrule_update',
      params: [
        {
          name: 'ticketDesignator',
          type: 'string'
        }
      ]
    };
  } else if (id === 14) {
    return {
      tableName: 'tourcoderule',
      select: {
        tourCode: 'tourcode'
      },
      update: 'tourcoderule_update',
      params: [{ name: 'tourCode', type: 'string' }]
    };
  } else if (id === 15) {
    return {
      tableName: 'advancepurchaserule',
      select: {
        unit: 'unit',
        startRange: 'startrange',
        endRange: 'endrange'
      },
      update: 'advancepurchaserule_update',
      params: [
        {
          name: 'unit',
          type: 'int'
        },
        {
          name: 'startRange',
          type: 'int'
        },
        {
          name: 'endRange',
          type: 'int'
        }
      ]
    };
  } else if (id === 16) {
    return {
      tableName: 'minstayrule',
      select: {
        unit: 'unit',
        value: 'value',
        dayOfWeekInclusion: 'dayofweekinclusion'
      },
      update: 'minstayrule_update',
      params: [
        {
          name: 'unit',
          type: 'int'
        },
        {
          name: 'value',
          type: 'int'
        },
        {
          name: 'dayOfWeekInclusion',
          type: 'int'
        }
      ]
    };
  } else if (id === 17) {
    return {
      tableName: 'maxstayrule',
      select: { unit: 'unit', value: 'value' },
      update: 'maxstayrule_update',
      params: [
        {
          name: 'unit',
          type: 'int'
        },
        {
          name: 'value',
          type: 'int'
        }
      ]
    };
  } else if (id === 18) {
    return {
      tableName: 'dayofweekrule',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 19) {
    return {
      tableName: 'stopsrule',
      select: {
        minStops: 'minstops',
        maxStops: 'maxstops'
      },
      update: 'stopsrule_update',
      params: [
        {
          name: 'minStops',
          type: 'int'
        },
        {
          name: 'maxStops',
          type: 'int'
        }
      ]
    };
  } else if (id === 20) {
    return {
      tableName: 'connectionrule',
      select: {
        exclude: 'exclude',
        connection: 'connection',
        connectionGeoType: 'connectiongeotype'
      },
      update: 'connectionrule_update',
      params: [
        {
          name: 'exclude',
          type: 'boolean'
        },
        {
          name: 'connection',
          type: 'string'
        },
        {
          name: 'connectionGeoType',
          type: 'int'
        }
      ]
    };
  } else if (id === 21) {
    return {
      tableName: 'flightnumberrule',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 22) {
    return {
      tableName: 'blackoutdaterule',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 23) {
    return {
      tableName: 'distancerule',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 24) {
    return {
      tableName: 'cabinrule',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 25) {
    return {
      tableName: 'farecategoryrule',
      select: {},
      update: '',
      params: []
    };
  }
};
