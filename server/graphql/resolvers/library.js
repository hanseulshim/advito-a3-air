const { airportList, bookingClassList } = require('../../data');
const { LIBRARY_LOOKUP, LOCATION_LOOKUP } = require('../constants');

exports.library = {
  Query: {
    airlineList: async (_, __, { db }) =>
      await db('carrier')
        .select({
          id: 'id',
          code: 'code',
          name: 'name'
        })
        .where('isdeleted', false)
        .orderBy('code'),
    airportList: () => airportList,
    bookingClassLibraryList: () => bookingClassList,
    currencyList: async (_, __, { db }) =>
      await db('blops.currency as c')
        .select({
          id: 'id',
          name: 'c.currency_name',
          code: 'c.currency_code'
        })
        .orderBy('c.currency_name'),
    distanceUnitList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', LIBRARY_LOOKUP.DISTANCE_TYPE),
    marketList: async (_, __, { db }) =>
      await db('location')
        .select({
          id: 'id',
          name: 'name',
          code: 'code',
          locationType: 'locationtype'
        })
        .where('isdeleted', false)
        .orWhere('locationtype', LOCATION_LOOKUP.AIRPORT)
        .orWhere('locationtype', LOCATION_LOOKUP.CITY)
        .andWhere('isdeleted', false)
        .orderBy('code')
  }
};
