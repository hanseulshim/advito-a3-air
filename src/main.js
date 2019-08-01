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
// import { checkToken, logout } from './helper';
import { logout } from './helper';

const apolloClient = new ApolloClient({
  // uri: 'http://localhost:8085/graphql',
  // ADVITO ENDPOINTS
  uri: 'https://s0dcs7ru0d.execute-api.us-east-2.amazonaws.com/dev/graphql',
  // uri: 'https://lr0bjpyqgj.execute-api.us-east-2.amazonaws.com/alpha/graphql',
  // uri: 'https://hq893l4up1.execute-api.us-east-2.amazonaws.com/beta/graphql',
  // BOOST ENDPOINTS
  // uri: 'https://c1wt7hzxc5.execute-api.us-east-2.amazonaws.com/test/graphql',
  // uri: 'https://5aoegpag40.execute-api.us-east-2.amazonaws.com/alpha/graphql',
  // uri: 'https://daqpm0wy59.execute-api.us-east-2.amazonaws.com/beta/graphql',
  clientState: {
    defaults,
    resolvers
  },
  fetch,
  request: operation => {
    // const sessiontoken = getToken();
    const sessiontoken = 'MY^PR3TTYP0NY';
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
        if (extensions.code === 'UNAUTHENTICATED') logout();
      });
    }
  }
});

const apolloProvider = new VueApollo({
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
