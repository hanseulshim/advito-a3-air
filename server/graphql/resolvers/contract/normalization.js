const { REGEX_USER } = require('../../constants');
exports.normalization = {
  Query: {
    normalizationList: async (_, { discountId = null }, { db }) =>
      await db('discountnormalisation as n')
        .select({
          id: 'n.id',
          usageFrom: 'n.usagefrom',
          usageTo: 'n.usageto',
          effectiveFrom: 'n.effectivefrom',
          effectiveTo: 'n.effectiveto',
          created: 'n.created',
          createdby: 'n.createdby',
          marketCount: db.raw(`
            (SELECT COUNT(*) FROM discountnormalisationmarket as m WHERE m.normalisationid = n.id and m.isdeleted = FALSE)
          `)
        })
        .where('discountid', discountId)
        .andWhere('n.isdeleted', false),
    normalizationMarketList: async (_, { normalizationId = null }, { db }) => {
      const normalizationMarketList = await db('discountnormalisationmarket')
        .select({
          id: 'id',
          marketA: 'marketa',
          marketB: 'marketb',
          farePaid: 'farepaid',
          usageOverride: 'usageoverride',
          farePullDate: 'farepulldate',
          notes: 'notes'
        })
        .where('normalisationid', normalizationId)
        .andWhere('isdeleted', false);
      const normalizationFareRequests = normalizationMarketList.map(
        async market => {
          const normalizationFareList = await db('discountnormalisationfare')
            .select({
              id: 'id',
              fareType: 'faretype',
              fareBasis: 'farebasis',
              amount: 'amount',
              currencyCode: 'currencycode',
              directionType: 'directiontype',
              advancePurchase: 'advancepurchase',
              minstay: 'minstay'
            })
            .where('normalisationmarketid', market.id);
          market.fareList = normalizationFareList;
        }
      );
      await Promise.all(normalizationFareRequests);
      return normalizationMarketList;
    },
    normalization: async (_, { id }, { db }) => await getNormalization(db, id),
    topMarketList: async () => [
      {
        id: 1,
        value: 'LAX - JFK 12345 50%',
        marketA: 'LAX',
        marketB: 'JFK',
        farePaid: 12345,
        usage: 0.5
      },
      {
        id: 2,
        value: 'DFW - JFK 54321 90%',
        marketA: 'DFW',
        marketB: 'JFK',
        farePaid: 54321,
        usage: 0.9
      },
      {
        id: 3,
        value: 'BWI - OAK 34182 25%',
        marketA: 'BWI',
        marketB: 'OAK',
        farePaid: 34182,
        usage: 0.25
      }
    ],
    marketAdvancedTicketList: async () => [
      {
        label: '0-2',
        value: 0.34
      },
      {
        label: '3-4',
        value: 0.2
      },
      {
        label: '7-10',
        value: 0.11
      },
      {
        label: '14-20',
        value: 0.25
      },
      {
        label: '21+',
        value: 0.1
      }
    ],
    marketDepartureList: async () => [
      {
        label: 'Sunday',
        value: 0.14
      },
      {
        label: 'Monday',
        value: 0.2
      },
      {
        label: 'Tuesday',
        value: 0.11
      },
      {
        label: 'Wednesday',
        value: 0.25
      },
      {
        label: 'Thursday',
        value: 0.1
      },
      {
        label: 'Friday',
        value: 0.1
      },
      {
        label: 'Saturday',
        value: 0.1
      }
    ],
    marketFareBasisList: async () => [
      {
        fareBasis: 'DGFBLM',
        bookingClass: 'D',
        usage: 0.98
      },
      {
        fareBasis: 'J1NQO4C5',
        bookingClass: 'D',
        usage: 0.02
      }
    ]
  },
  Mutation: {
    createNormalization: async (
      _,
      { discountId, usageFrom, usageTo, effectiveFrom, effectiveTo },
      { db, user }
    ) => {
      const { rows } = await db.raw(
        `SELECT discount_normalisation_create(
          ${discountId},
          ${
            new Date(usageFrom).toISOString()
              ? `'${new Date(usageFrom).toISOString()}'`
              : null
          },
          ${
            new Date(usageTo).toISOString()
              ? `'${new Date(usageTo).toISOString()}'`
              : null
          },
          ${
            new Date(effectiveFrom).toISOString()
              ? `'${new Date(effectiveFrom).toISOString()}'`
              : null
          },
          ${
            new Date(effectiveTo).toISOString()
              ? `'${new Date(effectiveTo).toISOString()}'`
              : null
          },
          '${user.name.replace(REGEX_USER, "''")}'
        )`
      );
      const [{ discount_normalisation_create: id }] = rows;
      return await getNormalization(db, id);
    },
    updateNormalization: async (
      _,
      { id, usageFrom, usageTo, effectiveFrom, effectiveTo },
      { db, user }
    ) => {
      await db.raw(
        `SELECT discount_normalisation_update(
          ${id},
          ${
            new Date(usageFrom).toISOString()
              ? `'${new Date(usageFrom).toISOString()}'`
              : null
          },
          ${
            new Date(usageTo).toISOString()
              ? `'${new Date(usageTo).toISOString()}'`
              : null
          },
          ${
            new Date(effectiveFrom).toISOString()
              ? `'${new Date(effectiveFrom).toISOString()}'`
              : null
          },
          ${
            new Date(effectiveTo).toISOString()
              ? `'${new Date(effectiveTo).toISOString()}'`
              : null
          },
          '${user.name.replace(REGEX_USER, "''")}'
        )`
      );
      return await getNormalization(db, id);
    },
    copyNormalization: async (_, { id }, { db }) => {
      const { rows } = await db.raw(
        `SELECT discountnormalisation_createcopy(${id}, null, null)`
      );
      const [{ discountnormalisation_createcopy: newId }] = rows;
      return await getNormalization(db, newId);
    },
    deleteNormalization: async (_, { id }, { db }) => {
      await db.raw(`SELECT discount_normalisation_delete(${id})`);
      return id;
    },
    createNormalizationMarket: async (
      _,
      {
        normalizationId,
        marketA,
        marketB,
        farePaid,
        usageOverride,
        farePullDate,
        notes,
        fareList
      },
      { db }
    ) => {
      const { rows } = await db.raw(
        `SELECT discount_normalisation_market_create(
          ${normalizationId},
          '${marketA}',
          '${marketB}',
          ${farePaid},
          ${usageOverride},
          ${
            new Date(farePullDate).toISOString()
              ? `'${new Date(farePullDate).toISOString()}'`
              : null
          },
          ${notes ? `'${notes}'` : null}
        )`
      );
      const [{ discount_normalisation_market_create: newId }] = rows;
      const normalizationFareRequests = fareList.map(
        ({
          fareType,
          fareBasis,
          amount,
          currencyCode,
          directionType,
          advancePurchase,
          minstay
        }) =>
          db.raw(`
          SELECT discount_normalisation_fare_create(
            ${newId},
            ${fareType},
            ${fareBasis ? `'${fareBasis}'` : null},
            ${amount},
            '${currencyCode}',
            '${directionType}',
            '${advancePurchase}',
            '${minstay}'
          )
        `)
      );
      await Promise.all(normalizationFareRequests);
      return await getNormalizationMarket(db, newId);
    },
    updateNormalizationMarket: async (
      _,
      {
        marketId,
        marketA,
        marketB,
        farePaid,
        usageOverride,
        farePullDate,
        notes,
        fareList
      },
      { db }
    ) => {
      await db.raw(
        `SELECT discount_normalisation_market_update(
          ${marketId},
          '${marketA}',
          '${marketB}',
          ${farePaid},
          ${usageOverride},
          ${
            new Date(farePullDate).toISOString()
              ? `'${new Date(farePullDate).toISOString()}'`
              : null
          },
          ${notes ? `'${notes}'` : null}
        )`
      );
      const normalizationFareRequests = fareList.map(
        ({
          id,
          fareType,
          fareBasis,
          amount,
          currencyCode,
          directionType,
          advancePurchase,
          minstay
        }) =>
          db.raw(`
          SELECT discount_normalisation_fare_update(
            ${id},
            ${fareType},
            ${fareBasis ? `'${fareBasis}'` : null},
            ${amount},
            '${currencyCode}',
            '${directionType}',
            '${advancePurchase}',
            '${minstay}'
          )
        `)
      );
      await Promise.all(normalizationFareRequests);
      return await getNormalizationMarket(db, marketId);
    },
    deleteNormalizationMarket: async (_, { id }, { db }) => {
      await db.raw(`SELECT discount_normalisation_market_delete(${id})`);
      return id;
    }
  }
};

const getNormalization = async (db, id) => {
  const [normalization] = await db('discountnormalisation as n')
    .select({
      id: 'n.id',
      usageFrom: 'n.usagefrom',
      usageTo: 'n.usageto',
      effectiveFrom: 'n.effectivefrom',
      effectiveTo: 'n.effectiveto',
      created: 'n.created',
      createdby: 'n.createdby',
      marketCount: db.raw(`
      (SELECT COUNT(*) FROM discountnormalisationmarket as m WHERE m.normalisationid = n.id and m.isdeleted = FALSE)
    `)
    })
    .where('id', id);
  return normalization;
};

const getNormalizationMarket = async (db, id) => {
  const [normalizationMarket] = await db('discountnormalisationmarket')
    .select({
      id: 'id',
      marketA: 'marketa',
      marketB: 'marketb',
      farePaid: 'farepaid',
      usageOverride: 'usageoverride',
      farePullDate: 'farepulldate',
      notes: 'notes'
    })
    .where('id', id);
  const normalizationFareList = await db('discountnormalisationfare')
    .select({
      id: 'id',
      fareType: 'faretype',
      fareBasis: 'farebasis',
      amount: 'amount',
      currencyCode: 'currencycode',
      directionType: 'directiontype',
      advancePurchase: 'advancepurchase',
      minstay: 'minstay'
    })
    .where('normalisationmarketid', normalizationMarket.id);
  normalizationMarket.fareList = normalizationFareList;
  return normalizationMarket;
};
