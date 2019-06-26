const { AuthenticationError } = require('apollo-server-lambda');

const getProjectName = project => {
  const effectiveFromYear = new Date(project.effectiveFrom).getFullYear();
  const effectiveToYear = new Date(project.effectiveTo).getFullYear();
  const yearRange =
    effectiveFromYear !== effectiveToYear
      ? `${effectiveFromYear} - ${effectiveToYear.toString().substr(-2)}`
      : effectiveFromYear;
  return `${project.clientName} ${yearRange} ${project.projectTypeName}`;
};

const authenticateUser = async (sessionToken, advitoDb) => {
  // Gets session info from DB
  const sessionRow = await advitoDb('advito_user_session')
    .select(
      'advito_user.id as u_id',
      'advito_user.name_first as u_name_first',
      'advito_user.name_last as u_name_last',
      'advito_user.email as u_email',
      'session_expiration',
      'session_duration_sec',
      'is_verified'
    )
    .innerJoin(
      'advito_user',
      'advito_user.id',
      'advito_user_session.advito_user_id'
    )
    .orderBy('advito_user_session.created', 'desc')
    .where('advito_user_session.session_token', sessionToken)
    .where('advito_user_session.session_token', sessionToken)
    .where('advito_user_session.session_end', null)
    .first();

  // Validates that user has at least 1 session.
  if (!sessionRow)
    throw new AuthenticationError('Session was expired or did not exist.');

  // Validates user session is not expired.
  const sessionExp = new Date(sessionRow.session_expiration);
  if (sessionExp <= new Date())
    throw new AuthenticationError('Session expired');

  // Gets the role ids of that user
  const roleRows = await advitoDb('advito_user_role_link')
    .select('advito_role_id')
    .where('advito_user_id', sessionRow.u_id);
  const roleIds = roleRows
    ? roleRows.map(row => parseInt(row.advito_role_id))
    : [];

  // Updates session token expiration in DB.
  const userId = sessionRow.u_id;
  const sessionDurationSeconds = sessionRow.session_duration_sec;
  const now = new Date();
  const newExpiration = new Date(now.getTime() + sessionDurationSeconds * 1000);
  await advitoDb('advito_user_session')
    .where('advito_user_id', userId)
    .update('session_expiration', newExpiration);
  const nameFirst = sessionRow.u_name_first;
  const nameLast = sessionRow.u_name_last;
  const email = sessionRow.u_email;

  // Returns user information
  return {
    id: userId,
    name: `${nameFirst} ${nameLast}`,
    email: email,
    role: roleIds
  };
};

module.exports = {
  getProjectName,
  authenticateUser
};
