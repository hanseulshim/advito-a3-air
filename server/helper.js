import { ApolloError } from 'apollo-server-lambda';
import { AdvitoUserSession } from './models';

export const authenticateUser = async sessionToken => {
  if (!sessionToken) return null;
  const session = await AdvitoUserSession.query()
    .where('sessionToken', sessionToken)
    .andWhere('sessionEnd', null)
    .first();
  if (!session) throw new ApolloError('Session is invalid.', 401);

  const { id, sessionExpiration, sessionDurationSec } = session;
  const sessionExp = new Date(sessionExpiration);
  if (sessionExp <= new Date()) {
    throw new ApolloError('Session has expired.', 401);
  }
  const now = new Date();
  const newExpiration = new Date(now.getTime() + sessionDurationSec * 1000);
  const timeDifference = Math.floor((newExpiration - sessionExp) / 1000 / 60);
  if (timeDifference > 50) {
    await AdvitoUserSession.patchAndFetchById(id, {
      sessionExpiration: newExpiration
    });
  }

  const user = await session.$relatedQuery('advitoUser').first();
  if (!user) throw new ApolloError('User not found', 401);
  const roleIds = await user
    .$relatedQuery('advitoUserRoleLink')
    .map(role => role.advitoRoleId);
  return {
    ...user,
    roleIds
  };
};
