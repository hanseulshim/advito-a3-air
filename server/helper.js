import { ApolloError } from 'apollo-server-lambda';
import { AdvitoUserSession } from './models';
import moment from 'moment';

export const authenticateUser = async sessionToken => {
  if (!sessionToken) return null;
  const session = await AdvitoUserSession.query()
    .where('sessionToken', sessionToken)
    .andWhere('sessionEnd', null)
    .first();
  if (!session) throw new ApolloError('Session is invalid.', 401);

  const { id, sessionExpiration, sessionDurationSec } = session;

  if (sessionExpiration <= moment.utc()) {
    throw new ApolloError('Session has expired.', 401);
  }
  const newExpiration = moment.utc().add(sessionDurationSec, 's');
  const timeDifference = newExpiration.diff(sessionExpiration, 'm');
  if (timeDifference > 50) {
    try {
      await AdvitoUserSession.query().patchAndFetchById(id, {
        sessionExpiration: newExpiration
      });
    } catch (err) {
      console.log(err);
    }
  }

  const user = await session.$relatedQuery('advitoUser').first();
  if (!user) throw new ApolloError('User not found', 401);
  const roleIds = await user
    .$relatedQuery('advitoUserRoleLink')
    .map(role => role.advitoRoleId);
  return {
    ...user,
    name: user.name(),
    roleIds
  };
};
