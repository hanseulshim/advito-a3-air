const { airportList, bookingClassList } = require('../../data/library');

exports.libraryResolvers = {
  Query: {
    airportList: () => airportList,
    bookingClassList: () => bookingClassList
  }
};
