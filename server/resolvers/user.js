import { ADVITO_CLIENT } from '../constants';
import { AdvitoUser } from '../models';
import { raw } from 'objection';

export const user = {
  Query: {
    userList: async (_, { clientId = null }) =>
      await AdvitoUser.query()
        .select(
          'advitoUser.id',
          'advitoUser.email',
          raw("CONCAT(name_first, ' ', name_last)").as('name')
        )
        .where('clientId', clientId ? clientId : ADVITO_CLIENT)
        .orderBy('nameFirst'),
    user: (_, __, { user }) => user,
    projectManagerList: async (_, { clientId = null }) =>
      await AdvitoUser.query()
        .select(
          'advitoUser.id',
          'advitoUser.email',
          raw("CONCAT(name_first, ' ', name_last)").as('name')
        )
        .where('client_id', clientId)
        .orWhere('client_id', ADVITO_CLIENT)
        .orderBy('nameFirst'),
    leadAnalystList: async (_, { clientId = null }) =>
      await AdvitoUser.query()
        .select(
          'advitoUser.id',
          'advitoUser.email',
          raw("CONCAT(name_first, ' ', name_last)").as('name')
        )
        .where('client_id', clientId)
        .orWhere('client_id', ADVITO_CLIENT)
        .orderBy('nameFirst'),
    dataSpecialistList: async (_, { clientId = null }) =>
      await AdvitoUser.query()
        .select(
          'advitoUser.id',
          'advitoUser.email',
          raw("CONCAT(name_first, ' ', name_last)").as('name')
        )
        .where('client_id', clientId)
        .orWhere('client_id', ADVITO_CLIENT)
        .orderBy('nameFirst')
  }
};
