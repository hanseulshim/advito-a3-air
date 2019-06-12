const { airportList, bookingClassList } = require('../../data');

exports.library = {
  Query: {
    airportList: () => airportList,
    bookingClassList: () => bookingClassList,
    currencyList: async (_, __, { db }) =>
      await db('blops.currency as c').select({
        id: 'id',
        name: 'c.currency_name',
        code: 'c.currency_code'
      })
  }
};
