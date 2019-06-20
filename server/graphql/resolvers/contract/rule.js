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
        `SELECT tableid from rules_checker('${ruleContainerId}')`
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
        .orderBy([
          {
            column: 'locationtype',
            order: 'desc'
          },
          'code'
        ]),
    ticketingDateList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.TICKET_DATE),
    travelDateList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.TRAVEL_DATE),
    pointOfSaleList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.POINT_OF_SALE),
    pointOfOriginList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.POINT_OF_ORIGIN),
    marketList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.MARKET)
  },
  Mutation: {
    updateTicketingDates: async (
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
    updateTravelDates: async (
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
    updatePointOfSales: async (
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
    updatePointOfOrigins: async (
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
    updateMarkets: async (_, { parentId, parentType, marketList }, { db }) =>
      await updateRule(
        db,
        parentId,
        parentType,
        marketList,
        RULE_LOOKUP.MARKET
      ),
    deleteRule: async (_, { id, ruleType }, { db }) => {
      const { tableName } = getRuleInfo(ruleType);
      await db.raw(`SELECT rule_delete(${id}, '${tableName}')`);
    }
  }
};

const getRuleContainerId = async (db, parentId, parentType) => {
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

const getRuleList = async (db, parentId, parentType, ruleType) => {
  const ruleInfo = getRuleInfo(ruleType);
  if (!parentId) return [];
  const ruleContainerId = await getRuleContainerId(db, parentId, parentType);
  if (!ruleContainerId) return [];
  const select = {
    id: 'id',
    ruleContainerId: 'rulescontainerguidref',
    isDeleted: 'isdeleted'
  };
  return await db(ruleInfo.tableName)
    .select({
      ...select,
      ...ruleInfo.select
    })
    .where('rulescontainerguidref', ruleContainerId)
    .andWhere('isdeleted', false);
};

const updateRule = async (db, parentId, parentType, ruleList, ruleType) => {
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
  return await getRuleList(db, parentId, parentType, ruleType);
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
      select: {},
      update: '',
      params: []
    };
  } else if (id === 10 || id === 11 || id === 12) {
    return {
      tableName: 'carrierrule',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 13) {
    return {
      tableName: 'ticketdeesignatorrule',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 14) {
    return {
      tableName: 'tourcoderule',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 15) {
    return {
      tableName: 'advancepurchaserule',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 16) {
    return {
      tableName: 'minstayrule',
      select: {},
      update: '',
      params: []
    };
  } else if (id === 17) {
    return {
      tableName: 'maxstayrule',
      select: {},
      update: '',
      params: []
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
      select: {},
      update: '',
      params: []
    };
  } else if (id === 20) {
    return {
      tableName: 'connectionrule',
      select: {},
      update: '',
      params: []
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
