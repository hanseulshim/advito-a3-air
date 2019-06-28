const { AIR_APPLICATION_ID } = require('../constants');

exports.client = {
  Query: {
    clientList: async (_, __, { db }) =>
      await db('blops.client_advito_application_link as link')
        .select({
          id: 'client.id',
          name: 'client.client_name'
        })
        .leftJoin('blops.client', 'client.id', 'link.client_id')
        .where('link.advito_application_id', AIR_APPLICATION_ID)
        .andWhere('client.is_active', true)
  }
};
