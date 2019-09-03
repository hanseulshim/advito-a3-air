const { ApolloError } = require('apollo-server-lambda');

const authenticateUser = async (sessionToken, advitoDb) => {
  const session = await advitoDb('advito_user_session as s')
    .select({
      id: 's.id',
      advitoUserId: 's.advito_user_id',
      sessionToken: 's.session_token',
      sessionStart: 's.session_start',
      sessionEnd: 's.session_end',
      sessionDurationSec: 's.session_duration_sec',
      sessionType: 's.session_type',
      sessionExpiration: 's.session_expiration',
      sessionNote: 's.session_note',
      created: 's.created',
      modified: 's.modified',
      nameFirst: 'u.name_first',
      nameLast: 'u.name_last',
      email: 'u.email'
    })
    .innerJoin('advito_user as u', 'u.id', 's.advito_user_id')
    .where('s.session_token', sessionToken)
    .andWhere('s.session_end', null)
    .first();

  if (!session) throw new ApolloError('Session is invalid.', 401);

  const {
    advitoUserId,
    sessionExpiration,
    sessionDurationSec,
    nameFirst,
    nameLast,
    email
  } = session;
  const sessionExp = new Date(sessionExpiration);
  if (sessionExp <= new Date())
    throw new ApolloError('Session is invalid.', 401);

  const roleRows = await advitoDb('advito_user_role_link')
    .select('advito_role_id')
    .where('advito_user_id', advitoUserId);
  const roleIds = roleRows
    ? roleRows.map(row => parseInt(row.advito_role_id))
    : [];

  const now = new Date();
  const newExpiration = new Date(now.getTime() + sessionDurationSec * 1000);
  const timeDifference = Math.floor((newExpiration - sessionExp) / 1000 / 60);
  if (timeDifference > 50) {
    await advitoDb('advito_user_session')
      .where('advito_user_id', advitoUserId)
      .update('session_expiration', newExpiration);
  }

  // Returns user information
  return {
    id: advitoUserId,
    name: `${nameFirst} ${nameLast}`,
    email: email,
    role: roleIds
  };
};

module.exports = {
  authenticateUser
};
