const { CONTRACT_LOOKUP } = require('../constants');

exports.user = {
  Query: {
    userList: async (_, __, { db, user }) =>
      await db('blops.advito_user')
        .select({
          id: 'id',
          name: db.raw("CONCAT(name_first, ' ', name_last)"),
          email: 'email'
        })
        .where('client_id', CONTRACT_LOOKUP.ID)
        .orWhere('id', user.id),
    user: (_, __, { user }) => user,
    projectManagerList: async (_, __, { db, user }) =>
      await db('blops.advito_user')
        .select({
          id: 'id',
          name: db.raw("CONCAT(name_first, ' ', name_last)"),
          email: 'email'
        })
        .where('client_id', CONTRACT_LOOKUP.ID)
        .orWhere('id', user.id),
    leadAnalystList: async (_, __, { db, user }) =>
      await db('blops.advito_user')
        .select({
          id: 'id',
          name: db.raw("CONCAT(name_first, ' ', name_last)"),
          email: 'email'
        })
        .where('client_id', CONTRACT_LOOKUP.ID)
        .orWhere('id', user.id),
    dataSpecialistList: async (_, __, { db, user }) =>
      await db('blops.advito_user')
        .select({
          id: 'id',
          name: db.raw("CONCAT(name_first, ' ', name_last)"),
          email: 'email'
        })
        .where('client_id', CONTRACT_LOOKUP.ID)
        .orWhere('id', user.id)
  }
};
