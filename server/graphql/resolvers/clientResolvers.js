const { clientList } = require('../../data/clients');

exports.clientResolvers = {
  clientList: () => clientList
};
