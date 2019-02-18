import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import vSelect from 'vue-select';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

import 'vuetify/dist/vuetify.min.css';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:8085/graphql'
});
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);
Vue.use(Vuetify);
Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
