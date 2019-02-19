<template>
  <v-layout wrap align-center>
    <v-flex xs3>
      <img alt="Vue logo" src="@/assets/logo.png" />
    </v-flex>
    <v-flex xs2>
      <v-select v-model="selected" label="name" :options="getClients" />
    </v-flex>
    <v-flex xs2 />
    <v-flex class="icon-container-row">
      <div class="icon-container">
        <i class="far fa-comment-alt" />
        <span>Ask Addy</span>
      </div>
    </v-flex>
    <v-flex xs12>
      <span class="back-to-console link">« Back to Console</span>
      |
      <span class="link">Air Program Manager</span>
    </v-flex>
  </v-layout>
</template>

<script>
import { GET_CLIENTS } from '@/graphql/queries';

export default {
  name: 'Header',
  apollo: {
    getClients: {
      query: GET_CLIENTS,
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
      getClients: []
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
.back-to-console {
  color: #ff9e16;
}
.link {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
