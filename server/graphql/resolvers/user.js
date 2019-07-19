const { ADVITO_CLIENT } = require('../constants');

exports.user = {
  Query: {
    userList: async (_, { clientId }, { db }) =>
      await db('blops.advito_user')
        .select({
          id: 'id',
          name: db.raw("CONCAT(name_first, ' ', name_last)"),
          email: 'email'
        })
        .where('client_id', clientId)
        .orWhere('client_id', ADVITO_CLIENT)
        .orderBy('name_first'),
    user: (_, __, { user }) => user,
    projectManagerList: async (_, { clientId }, { db }) =>
      await db('blops.advito_user')
        .select({
          id: 'id',
          name: db.raw("CONCAT(name_first, ' ', name_last)"),
          email: 'email'
        })
        .where('client_id', clientId)
        .orWhere('client_id', ADVITO_CLIENT),
    leadAnalystList: async (_, { clientId }, { db }) =>
      await db('blops.advito_user')
        .select({
          id: 'id',
          name: db.raw("CONCAT(name_first, ' ', name_last)"),
          email: 'email'
        })
        .where('client_id', clientId)
        .orWhere('client_id', ADVITO_CLIENT),
    dataSpecialistList: async (_, { clientId }, { db }) =>
      await db('blops.advito_user')
        .select({
          id: 'id',
          name: db.raw("CONCAT(name_first, ' ', name_last)"),
          email: 'email'
        })
        .where('client_id', clientId)
        .orWhere('client_id', ADVITO_CLIENT)
  }
};
