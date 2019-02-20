<template>
  <div class="header-container">
    <img class="logo" alt="Vue logo" src="@/assets/logo.png" />
    <el-select
      :value="client.id"
      placeholder="Select"
      filterable
      clearable
      @change="updateClient"
    >
      <el-option
        v-for="item in clientList"
        :key="item.value"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-select
      v-if="selected"
      v-model="selected"
      placeholder="Select"
      filterable
      clearable
    >
      <el-option
        v-for="item in clientList"
        :key="item.value"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <div class="icon-container">
      <i class="far fa-comment-alt" />
      <span>Ask Addy</span>
    </div>
    <div class="navigation">
      <span class="back-to-console link">« Back to Console</span>
      |
      <span class="link">Air Program Manager</span>
    </div>
  </div>
</template>

<script>
import { GET_CLIENTS, GET_CLIENT, GET_USER } from '@/graphql/queries';
import { UPDATE_CLIENT } from '@/graphql/mutations';

export default {
  name: 'Header',
  apollo: {
    user: {
      query: GET_USER
    },
    clientList: {
      query: GET_CLIENTS,
      variables() {
        return {
          clientId: this.user.clientId,
          sessionToken: this.user.sessionToken
        };
      }
    },
    client: {
      query: GET_CLIENT
    }
  },
  data: function() {
    return {
      selected: null,
      clientList: [],
      client: null,
      user: null
    };
  },
  methods: {
    updateClient(id) {
      const variables = { id: null, name: null };
      if (id) {
        const client = this.clientList.filter(client => client.id === id)[0];
        variables.id = id;
        variables.name = client.name;
      }
      this.$apollo.mutate({
        mutation: UPDATE_CLIENT,
        variables
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.header-container {
  display: grid;
  grid-template-areas: 'logo . . . addy' 'navigation navigation . . .';
  grid-template-columns: 25% 17% 17% auto 75px;
  row-gap: 1em;
  column-gap: 1em;
  align-items: flex-end;
}
.el-select {
  width: 100%;
}
.logo {
  max-width: 294px;
  width: 100%;
}

.icon-container {
  color: $tradewind;
  cursor: pointer;
  grid-area: addy;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fa-comment-alt {
  font-size: 2.5em;
}

.navigation {
  grid-area: navigation;
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
