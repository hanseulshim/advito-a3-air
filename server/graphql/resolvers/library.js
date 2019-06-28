const { airportList, bookingClassList } = require('../../data');
const { LIBRARY_LOOKUP, CONTRACT_LOOKUP } = require('../constants');

exports.library = {
  Query: {
    airportList: () => airportList,
    bookingClassLibraryList: () => bookingClassList,
    currencyList: async (_, __, { db }) =>
      await db('blops.currency as c').select({
        id: 'id',
        name: 'c.currency_name',
        code: 'c.currency_code'
      }),
    locationList: async (_, __, { db }) =>
      await db('location')
        .select({
          id: 'id',
          locationType: 'locationtype',
          name: 'name'
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
    distanceUnitList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', LIBRARY_LOOKUP.DISTANCE_TYPE)
  }
};
