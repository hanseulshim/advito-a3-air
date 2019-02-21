import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import App from './App.vue';
import router from './router';
import store from './store';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import 'element-ui/lib/theme-chalk/index.css';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:8085/graphql',
  clientState: {
    defaults: {
      user: {
        name: 'Scott Cashon',
        email: 'scott.cashon@boostlabs.com',
        clientId: 1,
        profilePicturePath: null,
        sessionToken: 'Ep6JsErunzl0Smj96gSxCA==',
        __typename: 'User'
      },
      client: {
        id: null,
        name: null,
        __typename: 'Client'
      },
      project: {
        id: null,
        name: null,
        __typename: 'Project'
      }
    },
    resolvers: {
      Mutation: {
        updateClient: (_, { id = null, name = null }, { cache }) => {
          cache.writeData({
            data: {
              client: {
                id,
                name,
                __typename: 'Client'
              }
            }
          });
          return null;
        },
        updateProject: (_, { id = null, name = null }, { cache }) => {
          cache.writeData({
            data: {
              project: {
                id,
                name,
                __typename: 'Project'
              }
            }
          });
          return null;
        }
      }
    }
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
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
