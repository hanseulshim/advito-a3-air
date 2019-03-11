const { clientList } = require('../../data/client');

exports.clientResolvers = {
  Query: {
    clientList: () => clientList
  }
};
