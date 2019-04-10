const { airportList, bookingClassList } = require('../../data');

exports.library = {
  Query: {
    airportList: () => airportList,
    bookingClassList: () => bookingClassList
  }
};
