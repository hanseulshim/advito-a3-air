import {
  DISCOUNT_LOOKUP,
  TARGET_TERM_LOOKUP,
  PRICING_TERM_LOOKUP
} from '../../constants';

export const bulkRule = {
  Mutation: {
    updateTicketingDateBulk: async (
      _,
      { parentType, ticketingDateList },
      { db }
    ) => {
      const tableName = getParentTable(parentType);
      const queries = ticketingDateList.map(({ id, startDate, endDate }) =>
        db.raw(`
        SELECT ticketdaterule_create_bulk(${id}, '${tableName}', '${new Date(
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
        SELECT traveldaterule_create_bulk(${id}, '${tableName}', '${new Date(
          startDate
        ).toISOString()}', '${new Date(endDate).toISOString()}')
      `)
      );
      await Promise.all(queries);
    },
    updateTourCodeBulk: async (_, { parentType, tourCodeList }, { db }) => {
      const tableName = getParentTable(parentType);
      const queries = tourCodeList.map(({ id, tourCode }) =>
        db.raw(`
        SELECT tourcoderule_create_bulk(${id}, '${tableName}', '${tourCode}')
      `)
      );
      await Promise.all(queries);
    },
    updateTicketDesignatorBulk: async (
      _,
      { parentType, ticketDesignatorList },
      { db }
    ) => {
      const tableName = getParentTable(parentType);
      const queries = ticketDesignatorList.map(({ id, ticketDesignator }) =>
        db.raw(`
        SELECT ticketdesignatorrule_create_bulk(${id}, '${tableName}', '${ticketDesignator}')
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
