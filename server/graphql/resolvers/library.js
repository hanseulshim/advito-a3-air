const { airportList, bookingClassList } = require('../../data');

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
        .whereNot('locationtype', 4)
        .andWhereNot('locationtype', 6)
        .orderBy([
          {
            column: 'locationtype',
            order: 'desc'
          },
          'code'
        ])
  }
};
