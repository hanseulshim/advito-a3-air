const {
  DISCOUNT_LOOKUP,
  TARGET_TERM_LOOKUP,
  PRICING_TERM_LOOKUP
} = require('../../constants');

exports.bulkRule = {
  Mutation: {
    updateTicketingDateBulk: async (
      _,
      { parentType, ticketingDateList },
      { db }
    ) => {
      const tableName = getParentTable(parentType);
      const queries = ticketingDateList.map(({ id, startDate, endDate }) =>
        db.raw(`
        SELECT ticketdaterule_create_update_bulk(${id}, '${tableName}', '${new Date(
          startDate
        ).toISOString()}', '${new Date(endDate).toISOString()}')
      `)
      );
      await Promise.all(queries);
    },
    updateTravelDateBulk: async (_, { parentType, travelDateList }, { db }) => {
      const tableName = getParentTable(parentType);
      const queries = travelDateList.map(({ id, startDate, endDate }) =>
        db.raw(`
        SELECT traveldaterule_create_update_bulk(${id}, '${tableName}', '${new Date(
          startDate
        ).toISOString()}', '${new Date(endDate).toISOString()}')
      `)
      );
      await Promise.all(queries);
    }
  }
};

const getParentTable = (parentType = DISCOUNT_LOOKUP.RULE_TYPE) =>
  parentType === DISCOUNT_LOOKUP.RULE_TYPE
    ? 'discount'
    : parentType === TARGET_TERM_LOOKUP.RULE_TYPE
    ? 'targetterm_v2'
    : parentType === PRICING_TERM_LOOKUP.RULE_TYPE
    ? 'pricingterm'
    : null;
