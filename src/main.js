import Vue from 'vue';
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
import { checkToken, logout } from './helper';

const apolloClient = new ApolloClient({
  // uri: 'http://localhost:8085/graphql',
  // uri: 'https://s0dcs7ru0d.execute-api.us-east-2.amazonaws.com/dev/graphql',
  uri: 'https://hq893l4up1.execute-api.us-east-2.amazonaws.com/beta/graphql',
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    // SessionToken: checkToken(router)
    sessiontoken: 'valid'
  },
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        if (extensions.code === 'UNAUTHENTICATED') logout();
      });
    }
    // if (networkError) {

    // }
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
