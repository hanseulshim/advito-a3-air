const { clientList } = require('../../data/client');

exports.clientResolvers = {
  clientList: () => clientList
};
