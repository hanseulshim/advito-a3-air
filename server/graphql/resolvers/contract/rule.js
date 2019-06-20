const { DISCOUNT_LOOKUP, TARGET_TERM_LOOKUP } = require('../../constants');

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
    ticketingDateList: async (_, { parentId, parentType }, { db }) =>
      await getTicketingDateList(db, parentId, parentType),
    travelDateList: async (_, { parentId, parentType }, { db }) =>
      await getTravelDateList(db, parentId, parentType)
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
    deleteTicketingDate: async (_, { id }, { db }) => {
      await db.raw(`SELECT ticketdaterule_delete(${id})`);
      return id;
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
    deleteTravelDate: async (_, { id }, { db }) => {
      await db.raw(`SELECT traveldaterule_delete(${id})`);
      return id;
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
