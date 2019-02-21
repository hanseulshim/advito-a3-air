import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import App from './App.vue';
import router from './router';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import 'element-ui/lib/theme-chalk/index.css';
import defaults from './graphql/defaults';
import resolvers from './graphql/resolvers';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:8085/graphql',
  clientState: {
    defaults,
    resolvers
  }
});
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
