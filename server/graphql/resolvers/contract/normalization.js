exports.normalization = {
  Query: {
    normalizationList: async (_, { discountId }, { db }) =>
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
            (SELECT COUNT(*) FROM discountnormalisationmarket as m WHERE m.normalisationid = n.id)
          `)
        })
        .where('discountid', discountId)
        .andWhere('isdeleted', false),
    normalizationMarketList: async (_, { normalizationId }, { db }) => {
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
    normalization: async (_, { id }, { db }) => await getNormalization(db, id)
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
          '${user.name}'
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
          '${user.name}'
        )`
      );
      return await getNormalization(db, id);
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
      (SELECT COUNT(*) FROM discountnormalisationmarket as m WHERE m.normalisationid = n.id)
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
