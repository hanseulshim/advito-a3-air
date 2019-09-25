import { REGEX_USER } from '../../constants';
import { Market, MarketCalculated, Normalization } from '../../models';
import { raw } from 'objection';
import merge from 'lodash/merge';
import sum from 'lodash/sum';
import sumBy from 'lodash/sumBy';
import numeral from 'numeral';

export const normalization = {
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
          market.fareList = normalizationFareList; // eslint-disable-line
        }
      );
      await Promise.all(normalizationFareRequests);
      return normalizationMarketList;
    },
    normalization: async (_, { id }, { db }) => await getNormalization(db, id),
    topMarketList: async (_, { clientGcn = null, normalizationId = null }) => {
      const { usageFrom, usageTo } = await Normalization.query()
        .select('usagefrom as usageFrom', 'usageto as usageTo')
        .findById(normalizationId);
      const marketList = await Market.query()
        .select(
          'odoriginmarket as originMarket',
          'oddestmarket as destMarket',
          'travelsector as marketSector',
          raw(`ARRAY_AGG(id)`).as('idList')
        )
        .where('deleted', false)
        .andWhere('clientgcn', clientGcn)
        .andWhere('departuredate', '>=', usageFrom)
        .andWhere('arrivaldate', '<=', usageTo)
        .groupBy('odoriginmarket', 'oddestmarket', 'travelsector')
        .havingNotNull('odoriginmarket')
        .havingNotNull('oddestmarket');
      const marketCalcRequests = marketList.map((market, index) => {
        market.id = index;
        return MarketCalculated.query()
          .select('farepaidinusd as farePaidInUsd')
          .whereIn('origindestinationsegmentid', market.idList);
      });
      const marketCalcResults = await Promise.all(marketCalcRequests);
      const marketCalculated = marketCalcResults.map((market, index) => ({
        id: index,
        farePaid: sum(
          market.map(({ farePaidInUsd }) => parseInt(farePaidInUsd))
        )
      }));
      merge(marketList, marketCalculated);
      const totalSum = sumBy(marketList, 'farePaid');
      return marketList.map(
        ({ originMarket, destMarket, farePaid, idList }) => ({
          name: `${originMarket} - ${destMarket} ${numeral(farePaid).format(
            '0,0'
          )} (${numeral(farePaid / totalSum).format('0.00%')})`,
          originMarket,
          destMarket,
          idList
        })
      );
    },
    marketAdvancedTicketList: async (_, { idList = [] }) => {
      const marketList = await Market.query()
        .select('id', 'departuredate as departureDate')
        .whereIn('id', idList)
        .orderBy('id');
      const marketCalculatedList = await MarketCalculated.query()
        .select(
          'origindestinationsegmentid as id',
          'ticketingdate as ticketingDate'
        )
        .whereIn('origindestinationsegmentid', idList)
        .orderBy('origindestinationsegmentid');
      merge(marketList, marketCalculatedList.map(v => ({ ...v })));
      return advancedTicketList.map(({ label, min, max }) => ({
        label,
        value:
          marketList
            .map(
              ({ departureDate, ticketingDate }) =>
                (departureDate - ticketingDate) / (1000 * 60 * 60 * 24)
            )
            .filter(difference => difference >= min && difference <= max)
            .length / marketList.length
      }));
    },
    marketDepartureList: async (_, { idList = [] }) => {
      const marketList = await Market.query()
        .select('departuredate as departureDate')
        .whereIn('id', idList)
        .orderBy('id');
      return departureList.map(({ label }, index) => ({
        label,
        value:
          marketList
            .map(({ departureDate }) => new Date(departureDate).getDay())
            .filter(departureDate => departureDate === index).length /
          marketList.length
      }));
    },
    marketFareBasis: async (_, { idList = [] }) => {
      const marketList = await Market.query()
        .select('odfarebasis as fareBasis', 'odbookingclass as bookingClass')
        .groupBy('odfarebasis', 'odbookingclass')
        .whereIn('id', idList);
      const marketListAll = await Market.query()
        .select('odfarebasis as fareBasis', 'odbookingclass as bookingClass')
        .whereIn('id', idList);
      return marketList.map(({ fareBasis, bookingClass }) => ({
        fareBasis,
        bookingClass,
        usage:
          marketListAll.filter(
            market =>
              market.fareBasis === fareBasis &&
              market.bookingClass === bookingClass
          ).length / marketListAll.length
      }));
    }
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
            ${advancePurchase ? `'${advancePurchase}'` : null},
            ${minstay ? `'${minstay}'` : null}
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
            ${advancePurchase ? `'${advancePurchase}'` : null},
            ${minstay ? `'${minstay}'` : null}
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

const advancedTicketList = [
  {
    label: '0-2',
    min: 0,
    max: 2
  },
  {
    label: '3-6',
    min: 3,
    max: 6
  },
  {
    label: '7-13',
    min: 7,
    max: 13
  },
  {
    label: '14-20',
    min: 14,
    max: 20
  },
  {
    label: '21+',
    min: 21,
    max: Infinity
  }
];
const departureList = [
  {
    label: 'Sunday'
  },
  {
    label: 'Monday'
  },
  {
    label: 'Tuesday'
  },
  {
    label: 'Wednesday'
  },
  {
    label: 'Thursday'
  },
  {
    label: 'Friday'
  },
  {
    label: 'Saturday'
  }
];
