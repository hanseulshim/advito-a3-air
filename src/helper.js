import moment from 'moment';

export const formatDate = date => {
  return date
    ? moment(date)
        .format('DD MMM YYYY')
        .toUpperCase()
    : '';
};

export const checkToken = router => {
  const localToken = localStorage.getItem('air-session-token');
  if (localToken) {
    router.replace({ name: 'root', query: null });
    return localToken;
  }

  const queryArray = window.location.hash.split('sessionToken=');
  const sessionToken = queryArray[1] ? queryArray[1] : '';
  if (sessionToken) {
    localStorage.setItem('air-session-token', sessionToken);
    router.replace({ name: 'root', query: null });
  }
  return sessionToken;
};

export const logout = () => {
  localStorage.removeItem('air-session-token');
  window.location.href =
    'https://s3.amazonaws.com/beta.boostlabs/BlackOps/index.html#/login';
};
