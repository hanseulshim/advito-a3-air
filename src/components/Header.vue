<template>
  <v-layout wrap class="header-container">
    <div class="logo-container">
      <img alt="Vue logo" src="@/assets/logo.png" />
    </div>
    <v-flex md2>
      <v-autocomplete
        :items="clientList"
        label="Select Client"
        item-text="name"
        item-value="id"
        outline
      ></v-autocomplete>
    </v-flex>
    <v-flex class="icon-container-row">
      <div class="icon-container">
        <i class="far fa-comment-alt" />
        <span>Ask Addy</span>
      </div>
    </v-flex>
    <v-flex md12>
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
    clientList: {
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
      clientList: []
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.header-container {
  margin-bottom: 2em !important;
}
.logo-container {
  max-width: 294px;
  margin-right: 4em;
  img {
    width: 100%;
  }
}
.icon-container-row {
  display: flex;
  justify-content: flex-end;
}
.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $tradewind;
  cursor: pointer;
}
.fa-comment-alt {
  font-size: 2.5em;
}
.back-to-console {
  color: $tree-poppy;
}
.link {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
