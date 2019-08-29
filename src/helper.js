import moment from 'moment';
import numeral from 'numeral';
import defaults from './graphql/defaults';
import { LOGOUT } from '@/graphql/mutations';

export const formatDate = date => {
  return date
    ? moment(date)
        .format('DD MMM YYYY')
        .toUpperCase()
    : '';
};

export const formatDataSetCol = date =>
  date ? moment(new Date(date), 'MM/DD/YYYY').format('YYYY-MM') : '';

export const formatDateFromNow = date => (date ? moment(date).fromNow() : '');

export const formatDateTime = date => {
  return date ? moment(date).format('DD MMM YYYY H:mm') : '';
};

export const formatNumber = num => numeral(num).format('0,0');

export const formatNumberLarge = num => numeral(num).format('0,0a');

export const formatTime = num => numeral(num).format('00:00');

export const formatPercent = num => numeral(num).format('0%');

export const formatCurrency = num => numeral(num).format('$0,0.00');

export const filterGeography = (list, query) =>
  list.filter(
    item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.code.toLowerCase().includes(query.toLowerCase())
  );

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

export const setUser = user => {
  if (localStorage.getItem('advito-360-user')) {
    localStorage.removeItem('advito-360-user');
  }
  localStorage.setItem('advito-360-user', JSON.stringify(user));
};

export const validateUser = () => {
  if (localStorage.getItem('advito-360-user')) {
    const user = JSON.parse(localStorage.getItem('advito-360-user'));
    return { user };
  } else {
    return { user: {} };
  }
};

export const getToken = () => {
  if (localStorage.getItem('advito-360-user')) {
    const user = JSON.parse(localStorage.getItem('advito-360-user'));
    return user.sessionToken;
  } else return '';
};

export const logout = async (router, client) => {
  try {
    // const sessionToken = getToken();
    // await client.mutate({
    //   mutation: LOGOUT,
    //   variables: {
    //     sessionToken
    //   },
    //   client: 'advitoClient'
    // });
    localStorage.removeItem('advito-360-user');
    router.replace({ name: 'login' });
    client.cache.writeData({ data: defaults });
  } catch (error) {
    console.log('ERROR LOGGING OUT : ', error);
  }
};
