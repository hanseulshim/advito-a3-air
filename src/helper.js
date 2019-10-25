import moment from 'moment';
import numeral from 'numeral';
import defaults from './graphql/defaults';

export const formatDate = date =>
  date
    ? moment
        .utc(date)
        .format('DD MMM YYYY')
        .toUpperCase()
    : '';

export const formatDataSetCol = date =>
  date ? moment.utc(date).format('YYYY-MM') : '';

export const formatDateFromNow = date =>
  date ? moment.utc(date).fromNow() : '';

export const formatDateTime = date =>
  date ? moment.utc(date).format('DD MMM YYYY H:mm') : '';

export const formatNumber = num => numeral(num).format('0,0');

export const formatNumberLarge = num => numeral(num).format('0,0a');

export const formatTime = num => numeral(num).format('00:00');

export const formatPercent = num => numeral(num).format('0%');

export const formatCurrency = num => numeral(num).format('0,0.00');

export const filterByNameAndCode = (list, query) =>
  list
    .filter(
      item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.code.toLowerCase().includes(query.toLowerCase())
    )
    .sort(a => (a.code.toLowerCase().includes(query.toLowerCase()) ? -1 : +1))
    .sort(a => (a.code.length === query.length ? -1 : +1))
    .sort(a => (a.code.toLowerCase() === query.toLowerCase() ? -1 : +1));

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
    const { sessionToken } = JSON.parse(
      localStorage.getItem('advito-360-user')
    );
    return sessionToken;
  } else return '';
};

export const logout = async (router, client) => {
  localStorage.removeItem('advito-360-user');
  router.replace({ name: 'login' });
  client.cache.writeData({ data: defaults });
  client.resetStore();
};

export const getApi = () => {
  const VUE_APP_STAGE = process.env.VUE_APP_STAGE;
  return VUE_APP_STAGE === 'dev'
    ? 'https://s0dcs7ru0d.execute-api.us-east-2.amazonaws.com/dev/graphql'
    : VUE_APP_STAGE === 'alpha'
    ? 'https://lr0bjpyqgj.execute-api.us-east-2.amazonaws.com/alpha/graphql'
    : VUE_APP_STAGE === 'beta'
    ? 'https://hq893l4up1.execute-api.us-east-2.amazonaws.com/beta/graphql'
    : VUE_APP_STAGE === 'prod'
    ? 'https://m5pnqi4l5e.execute-api.us-east-2.amazonaws.com/prod/graphql'
    : 'http://localhost:8085/graphql';
};

export const getAdvitoApi = () => {
  const VUE_APP_STAGE = process.env.VUE_APP_STAGE;
  return VUE_APP_STAGE === 'dev'
    ? 'https://lfl1qiymy7.execute-api.us-east-2.amazonaws.com/dev/graphql'
    : VUE_APP_STAGE === 'alpha'
    ? 'https://trfrs1gzn8.execute-api.us-east-2.amazonaws.com/alpha/graphql'
    : VUE_APP_STAGE === 'beta'
    ? 'https://7smhjazdr2.execute-api.us-east-2.amazonaws.com/beta/graphql'
    : VUE_APP_STAGE === 'prod'
    ? 'https://759byqkv94.execute-api.us-east-2.amazonaws.com/prod/graphql'
    : 'http://localhost:4000/graphql';
};
