<template>
  <v-layout wrap>
    <v-flex xs3>
      <img alt="Vue logo" src="@/assets/logo.png" />
    </v-flex>
    <v-flex xs2>
      <v-select v-model="selected" :options="options" />
    </v-flex>
    <v-flex xs2 />
    <v-flex class="icon-container-row">
      <div class="icon-container">
        <i class="far fa-comment-alt" />
        <span>Ask Addy</span>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Header',
  apollo: {
    getClients: {
      query: gql`
        query getClients($clientId: Int!, $sessionToken: String!) {
          getClients(clientId: $clientId, sessionToken: $sessionToken) {
            statusCode
            body {
              apicode
              apimessage
              apidataset {
                id
                name
              }
            }
          }
        }
      `,
      variables: {
        clientId: 1,
        sessionToken: 'egpSjxgHbWdGY5DySz6gcw=='
      }
    }
  },
  data: function() {
    return {
      selected: null,
      options: [
        { label: 'foo', value: 'Foo' },
        { label: 'bar', value: 'Bar' },
        { label: 'car', value: 'Car' }
      ],
      getClients: ''
    };
  }
};
</script>

<style lang="scss" scoped>
.icon-container-row {
  display: flex;
  justify-content: flex-end;
}
.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4baaa3;
  cursor: pointer;
}
.fa-comment-alt {
  font-size: 2.5em;
}
</style>
