const { fakeInvoke } = require('../helper');
const { clientList } = require('../../data/clients');

exports.clientResolvers = {
  clientList: (_, payload) => fakeInvoke(payload, clientList)
};
