import Vue from 'vue';
import fetch from 'unfetch';
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
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions.code === 'UNAUTHENTICATED') logout(router, this);
      });
    }
    if (networkError) {
      // console.log('THIS IS A NETWORK ERROR', networkError);
    }
  }
});

const advitoClient = new ApolloClient({
  // uri: 'https://trfrs1gzn8.execute-api.us-east-2.amazonaws.com/alpha/graphql',
  // uri: 'https://7smhjazdr2.execute-api.us-east-2.amazonaws.com/beta/graphql',
  uri: 'https://lfl1qiymy7.execute-api.us-east-2.amazonaws.com/dev/graphql',
  fetch,
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions.code === 'UNAUTHENTICATED') logout(router, this);
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
