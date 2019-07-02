import moment from 'moment';
import numeral from 'numeral';

export const formatDate = date => {
  return date
    ? moment(date)
        .format('DD MMM YYYY')
        .toUpperCase()
    : '';
};

export const formatDataSetCol = date =>
  date ? moment(date, 'MM/DD/YYYY').format('YYYY-MM') : '';

export const formatDateFromNow = date => (date ? moment(date).fromNow() : '');

export const formatDateTime = date => {
  return date ? moment(date).format('DD MMM YYYY H:mm') : '';
};

export const formatNumber = num => numeral(num).format('0,0');

export const formatNumberLarge = num => numeral(num).format('0,0a');

export const formatTime = num => numeral(num).format('00:00');

export const formatPercent = num => numeral(num).format('0%');

export const pluralize = (word, count) => {
  return count > 1
    ? word.substr(-2) === 'ss'
      ? `${count} ${word}es`
      : `${count} ${word}s`
    : `${count} ${word}`;
};

export const removeTypename = payload => {
  return payload.forEach(v => {
    delete v.__typename;
  });
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
  // window.location.href =
  //   'https://s3.amazonaws.com/beta.boostlabs/BlackOps/index.html#/login';
};
