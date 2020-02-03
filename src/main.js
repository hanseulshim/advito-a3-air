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
import { getToken, logout, getApi } from './helper';

export const apolloClient = new ApolloClient({
  uri: getApi(),
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

const apolloProvider = new VueApollo({
  clients: {
    apolloClient
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
