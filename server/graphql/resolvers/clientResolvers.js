const { fakeInvoke } = require('../helper');

const clientData = [
  {
    id: 1,
    name: 'Home Depot'
  },
  {
    id: 2,
    name: 'DuPont'
  },
  {
    id: 3,
    name: 'Nestle'
  },
  {
    id: 4,
    name: 'Optimus'
  },
  {
    id: 5,
    name: 'Pfizer'
  }
];

exports.clientResolvers = {
  getClients: (_, payload) => fakeInvoke(payload, clientData)
};
