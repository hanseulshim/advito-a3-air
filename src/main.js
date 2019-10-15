import Vue from 'vue';
import fetch from 'unfetch';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import App from './App.vue';
import router from './router';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import VModal from 'vue-js-modal';
import 'element-ui/lib/theme-chalk/index.css';
import defaults from './graphql/defaults';
import resolvers from './graphql/resolvers';
import { getToken, logout } from './helper';

export const apolloClient = new ApolloClient({
  // uri: 'http://localhost:8085/graphql',
  // uri: 'https://lr0bjpyqgj.execute-api.us-east-2.amazonaws.com/alpha/graphql',
  // uri: 'https://hq893l4up1.execute-api.us-east-2.amazonaws.com/beta/graphql',
  uri: 'https://s0dcs7ru0d.execute-api.us-east-2.amazonaws.com/dev/graphql',
  // uri: 'https://m5pnqi4l5e.execute-api.us-east-2.amazonaws.com/prod/graphql',
  clientState: {
    defaults,
    resolvers
  },
  fetch,
  request: operation => {
    const sessiontoken = getToken();
    // const sessiontoken = 'MY^PR3TTYP0NY';
    if (sessiontoken) {
      operation.setContext({
        headers: {
          sessiontoken
        }
      });
    }
  },
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions.code === 401) logout(router, apolloClient);
      });
    }
  }
});

const advitoClient = new ApolloClient({
  // uri: 'http://localhost:4000/graphql',
  // uri: 'https://trfrs1gzn8.execute-api.us-east-2.amazonaws.com/alpha/graphql',
  // uri: 'https://7smhjazdr2.execute-api.us-east-2.amazonaws.com/beta/graphql',
  uri: 'https://lfl1qiymy7.execute-api.us-east-2.amazonaws.com/dev/graphql',
  // uri: 'https://759byqkv94.execute-api.us-east-2.amazonaws.com/prod/graphql',
  fetch,
  request: operation => {
    const sessiontoken = getToken();
    if (sessiontoken) {
      operation.setContext({
        headers: {
          sessiontoken
        }
      });
    }
  },
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions.code === 'UNAUTHENTICATED') logout(router, apolloClient);
      });
    }
  }
});

const apolloProvider = new VueApollo({
  clients: {
    apolloClient,
    advitoClient
  },
  defaultClient: apolloClient
});

Vue.use(VueApollo);
Vue.use(ElementUI, { locale });
Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
