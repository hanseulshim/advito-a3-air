const { DISCOUNT_LOOKUP, TARGET_TERM_LOOKUP } = require('../../constants');

exports.rule = {
  Query: {
    ticketingDateList: async (_, { parentId, parentType }, { db }) => {
      if (!parentId) return [];
      const ruleContainerId = await getRuleContainerId(
        db,
        parentId,
        parentType
      );
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
    },
    travelDateList: async (_, { parentId, parentType }, { db }) => {
      if (!parentId) return [];
      const ruleContainerId = await getRuleContainerId(
        db,
        parentId,
        parentType
      );
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
    }
  }
};

const getRuleContainerId = async (
  db,
  parentId,
  parentType = DISCOUNT_LOOKUP.RULE_TYPE
) => {
  const table =
    parentType === DISCOUNT_LOOKUP.RULE_TYPE
      ? 'discount'
      : parentType === TARGET_TERM_LOOKUP.RULE_TYPE
      ? 'targetterm_v2'
      : null;
  if (!table) return null;
  const [parent] = await db(table)
    .select('rulescontainerguidref')
    .where('id', parentId);
  if (!parent) return null;
  const { rulescontainerguidref: ruleContainerId } = parent;
  return ruleContainerId;
};
