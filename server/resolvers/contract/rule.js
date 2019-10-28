import {
  DISCOUNT_LOOKUP,
  TARGET_TERM_LOOKUP,
  RULE_LOOKUP,
  REGEX_USER
} from '../../constants';
import moment from 'moment';

export const rule = {
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
    bookingClassCodeList: async (_, __, { db }) =>
      await db('bookingclass')
        .select({
          fareCategoryId: 'farecategoryid',
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
    fareCategoryUnitList: async (_, __, { db }) =>
      await db('farecategory').select({
        id: 'id',
        cabinId: 'cabinid',
        code: 'code',
        name: 'name',
        shortName: 'shortname'
      }),
    fareBasisUnitList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', RULE_LOOKUP.FARE_BASIS_TYPE),
    ticketingDateList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.TICKET_DATE),
    travelDateList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.TRAVEL_DATE),
    pointOfSaleList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.POINT_OF_SALE),
    pointOfOriginList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.POINT_OF_ORIGIN),
    marketRuleList: async (_, { parentId, parentType }, { db }) =>
      await getRuleList(db, parentId, parentType, RULE_LOOKUP.MARKET),
    bookingClassRuleList: async (
      _,
      { parentId, bookingClassType = 1 },
      { db }
    ) =>
      await getRuleList(
        db,
        parentId,
        undefined,
        RULE_LOOKUP.BOOKING_CLASS,
        bookingClassType
      ),
    airlineRuleList: async (
      _,
      { parentId, parentType, airlineType = 1 },
      { db }
    ) =>
      await getRuleList(
        db,
        parentId,
        parentType,
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
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.MAX_STAY),
    dayOfWeekList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.DAY_OF_WEEK),
    flightNumberList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.FLIGHT_NUMBER),
    connectionPointList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.CONNECTION_POINT),
    distanceList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.DISTANCE),
    cabinList: async (
      _,
      { parentId, parentType = TARGET_TERM_LOOKUP.RULE_TYPE },
      { db }
    ) => await getRuleList(db, parentId, parentType, RULE_LOOKUP.CABIN),
    fareCategoryList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.FARE_CATEGORY),
    blackoutList: async (_, { parentId }, { db }) =>
      await getRuleList(db, parentId, undefined, RULE_LOOKUP.BLACKOUT),
    fareBasisList: async (_, { parentId, fareBasisType }, { db }) =>
      await getRuleList(
        db,
        parentId,
        undefined,
        RULE_LOOKUP.FARE_BASIS,
        fareBasisType
      )
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
    updateMarketRule: async (
      _,
      { parentId, parentType, marketRuleList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        parentType,
        marketRuleList,
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
    updateAirlineRule: async (
      _,
      { parentId, parentType, airlineType = 1, airlineRuleList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        parentType,
        airlineRuleList,
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
    updateDayOfWeek: async (_, { parentId, dayOfWeekList }, { db }) =>
      await updateRule(
        db,
        parentId,
        undefined,
        dayOfWeekList,
        RULE_LOOKUP.DAY_OF_WEEK
      ),
    updateFlightNumber: async (_, { parentId, flightNumberList }, { db }) =>
      await updateRule(
        db,
        parentId,
        undefined,
        flightNumberList,
        RULE_LOOKUP.FLIGHT_NUMBER
      ),
    updateConnectionPoint: async (
      _,
      { parentId, connectionPointList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        undefined,
        connectionPointList,
        RULE_LOOKUP.CONNECTION_POINT
      ),
    updateDistance: async (_, { parentId, distanceList }, { db }) =>
      await updateRule(
        db,
        parentId,
        undefined,
        distanceList,
        RULE_LOOKUP.DISTANCE
      ),
    updateCabin: async (
      _,
      { parentId, parentType = TARGET_TERM_LOOKUP.RULE_TYPE, cabinList },
      { db }
    ) =>
      await updateRule(db, parentId, parentType, cabinList, RULE_LOOKUP.CABIN),
    updateFareCategory: async (_, { parentId, fareCategoryList }, { db }) =>
      await updateRule(
        db,
        parentId,
        undefined,
        fareCategoryList,
        RULE_LOOKUP.FARE_CATEGORY
      ),
    updateBlackout: async (_, { parentId, blackoutList }, { db }) =>
      await updateRule(
        db,
        parentId,
        undefined,
        blackoutList,
        RULE_LOOKUP.BLACKOUT
      ),
    updateFareBasis: async (
      _,
      { parentId, fareBasisType = 1, fareBasisList },
      { db }
    ) =>
      await updateRule(
        db,
        parentId,
        undefined,
        fareBasisList,
        RULE_LOOKUP.FARE_BASIS,
        fareBasisType
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
              ? `${
                  rule[param.name]
                    ? `'${rule[param.name].replace(REGEX_USER, "''")}'`
                    : null
                }`
              : param.type === 'date'
              ? `${
                  moment.utc(rule[param.name]).toISOString()
                    ? `'${moment.utc(rule[param.name]).toISOString()}'`
                    : null
                }`
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
      tableName: 'farebasis_list',
      type: 'type',
      select: {
        name: 'name',
        type: 'type',
        matchExclude: 'matchexclude',
        matchValue: 'matchvalue',
        endsWithExclude: 'endswithexclude',
        endsWithValue: 'endswithvalue',
        startsWithExclude: 'startswithexclude',
        startsWithValue: 'startswithvalue',
        containsExclude: 'containsexclude',
        containsValue: 'containsvalue',
        containsPosition: 'containsposition',
        containsMultipleExclude: 'containsmultipleexclude',
        containsMultipleValue: 'containsmultiplevalue',
        containsMultiplePosition: 'containsmultipleposition'
      },
      update: 'farebasis_update',
      params: [
        {
          name: 'name',
          type: 'string'
        },
        {
          name: 'type',
          type: 'int'
        },
        {
          name: 'basisType',
          type: 'int'
        },
        {
          name: 'matchExclude',
          type: 'string'
        },
        {
          name: 'matchValue',
          type: 'string'
        },
        {
          name: 'endsWithExclude',
          type: 'boolean'
        },
        {
          name: 'endsWithValue',
          type: 'string'
        },
        {
          name: 'startsWithExclude',
          type: 'boolean'
        },
        {
          name: 'startsWithValue',
          type: 'string'
        },
        {
          name: 'containsExclude',
          type: 'boolean'
        },
        {
          name: 'containsValue',
          type: 'string'
        },
        {
          name: 'containsPosition',
          type: 'int'
        },
        {
          name: 'containsMultipleExclude',
          type: 'boolean'
        },
        {
          name: 'containsMultipleValue',
          type: 'string'
        },
        {
          name: 'containsMultiplePosition',
          type: 'int'
        }
      ]
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
      select: {
        exclude: 'exclude',
        startDay: 'startday',
        startTime: 'starttime',
        endDay: 'endday',
        endTime: 'endtime'
      },
      update: 'dayofweekrule_update',
      params: [
        {
          name: 'exclude',
          type: 'boolean'
        },
        {
          name: 'startDay',
          type: 'int'
        },
        {
          name: 'startTime',
          type: 'string'
        },
        {
          name: 'endDay',
          type: 'int'
        },
        {
          name: 'endTime',
          type: 'string'
        }
      ]
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
      select: {
        exclude: 'exclude',
        segmentType: 'segmenttype',
        carrierCode: 'carriercode',
        startRange: 'startrange',
        endRange: 'endrange'
      },
      update: 'flightnumberrule_update',
      params: [
        {
          name: 'exclude',
          type: 'boolean'
        },
        {
          name: 'segmentType',
          type: 'int'
        },
        {
          name: 'carrierCode',
          type: 'string'
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
  } else if (id === 22) {
    return {
      tableName: 'blackoutdaterule',
      select: {
        startDate: 'startdate',
        endDate: 'enddate'
      },
      update: 'blackoutdaterule_update',
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
  } else if (id === 23) {
    return {
      tableName: 'distancerule',
      select: {
        distanceUnit: 'distanceunit',
        minDistance: 'mindistance',
        maxDistance: 'maxdistance'
      },
      update: 'distancerule_update',
      params: [
        {
          name: 'distanceUnit',
          type: 'int'
        },
        {
          name: 'minDistance',
          type: 'int'
        },
        {
          name: 'maxDistance',
          type: 'int'
        }
      ]
    };
  } else if (id === 24) {
    return {
      tableName: 'cabinrule',
      select: {
        exclude: 'exclude',
        cabin: 'cabin'
      },
      update: 'cabinrule_update',
      params: [
        {
          name: 'exclude',
          type: 'boolean'
        },
        {
          name: 'cabin',
          type: 'string'
        }
      ]
    };
  } else if (id === 25) {
    return {
      tableName: 'farecategoryrule',
      select: { exclude: 'exclude', fareCategory: 'farecategory' },
      update: 'farecategoryrule_update',
      params: [
        {
          name: 'exclude',
          type: 'boolean'
        },
        {
          name: 'fareCategory',
          type: 'int'
        }
      ]
    };
  }
};
