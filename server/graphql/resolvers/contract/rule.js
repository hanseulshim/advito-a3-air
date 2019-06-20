const {
  DISCOUNT_LOOKUP,
  TARGET_TERM_LOOKUP,
  CONTRACT_LOOKUP
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
          code: 'code'
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
    ticketingDateList: async (_, { parentId, parentType }, { db }) =>
      await getTicketingDateList(db, parentId, parentType),
    travelDateList: async (_, { parentId, parentType }, { db }) =>
      await getTravelDateList(db, parentId, parentType),
    pointOfSaleList: async (_, { parentId, parentType }, { db }) =>
      await getPointOfSaleList(db, parentId, parentType),
    pointOfOriginList: async (_, { parentId, parentType }, { db }) =>
      await getPointOfOriginList(db, parentId, parentType)
  },
  Mutation: {
    updateTicketingDates: async (
      _,
      { parentId, parentType, ticketingDateList },
      { db }
    ) => {
      const parentTable = getParentTable(parentType);
      const queries = ticketingDateList.map(ticketingDate =>
        db.raw(`
        SELECT ticketdaterule_create_update(
          ${parentId},
          '${parentTable}',
          ${ticketingDate.id},
          ${
            ticketingDate.ruleContainerId
              ? `'${ticketingDate.ruleContainerId}'`
              : null
          },
          '${new Date(ticketingDate.startDate).toISOString()}',
          '${new Date(ticketingDate.endDate).toISOString()}',
          ${ticketingDate.isDeleted}
        )
      `)
      );
      await Promise.all(queries);
      return await getTicketingDateList(db, parentId, parentType);
    },
    updateTravelDates: async (
      _,
      { parentId, parentType, travelDateList },
      { db }
    ) => {
      const parentTable = getParentTable(parentType);
      const queries = travelDateList.map(travelDate =>
        db.raw(`
        SELECT traveldaterule_create_update(
          ${parentId},
          '${parentTable}',
          ${travelDate.id},
          ${
            travelDate.ruleContainerId
              ? `'${travelDate.ruleContainerId}'`
              : null
          },
          '${new Date(travelDate.startDate).toISOString()}',
          '${new Date(travelDate.endDate).toISOString()}',
          ${travelDate.isDeleted}
        )
      `)
      );
      await Promise.all(queries);
      return await getTravelDateList(db, parentId, parentType);
    },
    updatePointOfSales: async (
      _,
      { parentId, parentType, pointOfSaleList },
      { db }
    ) => {
      const parentTable = getParentTable(parentType);
      const queries = pointOfSaleList.map(pointOfSale =>
        db.raw(`
        SELECT pointofsale_update(
          ${parentId},
          '${parentTable}',
          ${pointOfSale.id},
          ${
            pointOfSale.ruleContainerId
              ? `'${pointOfSale.ruleContainerId}'`
              : null
          },
          '${pointOfSale.countryCode}',
          ${pointOfSale.isDeleted}
        )
      `)
      );
      await Promise.all(queries);
      return await getPointOfSaleList(db, parentId, parentType);
    },
    updatePointOfOrigins: async (
      _,
      { parentId, parentType, pointOfOriginList },
      { db }
    ) => {
      const parentTable = getParentTable(parentType);
      const queries = pointOfOriginList.map(pointOfOrigin =>
        db.raw(`
        SELECT pointoforigin_update(
          ${parentId},
          '${parentTable}',
          ${pointOfOrigin.id},
          ${
            pointOfOrigin.ruleContainerId
              ? `'${pointOfOrigin.ruleContainerId}'`
              : null
          },
          '${pointOfOrigin.countryCode}',
          ${pointOfOrigin.isDeleted}
        )
      `)
      );
      await Promise.all(queries);
      return await getPointOfOriginList(db, parentId, parentType);
    },
    deleteRule: async (_, { id, parentTable }, { db }) => {
      const tableName = getRuleTable(parentTable);
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

const getTicketingDateList = async (db, parentId, parentType) => {
  if (!parentId) return [];
  const ruleContainerId = await getRuleContainerId(db, parentId, parentType);
  if (!ruleContainerId) return [];
  return await db('ticketdaterule')
    .select({
      id: 'id',
      ruleContainerId: 'rulescontainerguidref',
      startDate: 'startdate',
      endDate: 'enddate',
      isDeleted: 'isdeleted'
    })
    .where('rulescontainerguidref', ruleContainerId)
    .andWhere('isdeleted', false);
};

const getTravelDateList = async (db, parentId, parentType) => {
  if (!parentId) return [];
  const ruleContainerId = await getRuleContainerId(db, parentId, parentType);
  if (!ruleContainerId) return [];
  return await db('traveldaterule')
    .select({
      id: 'id',
      ruleContainerId: 'rulescontainerguidref',
      startDate: 'startdate',
      endDate: 'enddate',
      isDeleted: 'isdeleted'
    })
    .where('rulescontainerguidref', ruleContainerId)
    .andWhere('isdeleted', false);
};

const getPointOfSaleList = async (db, parentId, parentType) => {
  if (!parentId) return [];
  const ruleContainerId = await getRuleContainerId(db, parentId, parentType);
  if (!ruleContainerId) return [];
  return await db('pointofsale')
    .select({
      id: 'id',
      ruleContainerId: 'rulescontainerguidref',
      countryCode: 'countrycode',
      isDeleted: 'isdeleted'
    })
    .where('rulescontainerguidref', ruleContainerId)
    .andWhere('isdeleted', false);
};

const getPointOfOriginList = async (db, parentId, parentType) => {
  if (!parentId) return [];
  const ruleContainerId = await getRuleContainerId(db, parentId, parentType);
  if (!ruleContainerId) return [];
  return await db('pointoforigin')
    .select({
      id: 'id',
      ruleContainerId: 'rulescontainerguidref',
      countryCode: 'countrycode',
      isDeleted: 'isdeleted'
    })
    .where('rulescontainerguidref', ruleContainerId)
    .andWhere('isdeleted', false);
};

const getRuleTable = id => {
  switch (id) {
    case 1:
      return 'ticketdaterule';
    case 2:
      return 'traveldaterule';
    case 3:
      return 'pointofsale';
    case 4:
      return 'pointoforigin';
    case 5:
      return 'geographyrule';
    case 6:
    case 7:
      return 'farebasis';
    case 8:
    case 9:
      return 'bookingclassrule';
    case 10:
    case 11:
    case 12:
      return 'carrierrule';
    case 13:
      return 'ticketdeesignatorrule';
    case 14:
      return 'tourcoderule';
    case 15:
      return 'advancepurchaserule';
    case 16:
      return 'minstayrule';
    case 17:
      return 'maxstayrule';
    case 18:
      return 'dayofweekrule';
    case 19:
      return 'stopsrule';
    case 20:
      return 'connectionrule';
    case 21:
      return 'flightnumberrule';
    case 22:
      return 'blackoutdaterule';
    case 23:
      return 'distancerule';
    case 24:
      return 'cabinrule';
    case 25:
      return 'farecategoryrule';
  }
};
