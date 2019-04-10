const { clientList } = require('../../data');

exports.client = {
  Query: {
    clientList: () => clientList
  }
};
