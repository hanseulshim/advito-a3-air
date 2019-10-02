<template>
  <div v-loading="$apollo.loading" class="user-info-container">
    <div class="sidebar-avatar-container">
      <img id="sidebar-avatar" alt="avatar" src="@/assets/shayan.jpeg" />
      <i class="fas fa-cog" />
    </div>
    <div>{{ user.name }}</div>
    <button type="button" class="button logout-button" @click="logout">
      Logout
    </button>
  </div>
</template>

<script>
import { logout, getToken } from '@/helper';
import { apolloClient } from '@/main';
import { GET_USER } from '@/graphql/queries';
import { LOGOUT } from '@/graphql/mutations';
export default {
  name: 'UserInfo',
  apollo: {
    user: {
      query: GET_USER
    }
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    async logout() {
      try {
        await this.$apollo.mutate({
          mutation: LOGOUT,
          variables: {
            sessionToken: getToken()
          },
          client: 'advitoClient'
        });
        logout(this.$router, apolloClient);
      } catch (err) {
        // console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.user-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $black;
  font-weight: 400;
}
.sidebar-avatar-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
#sidebar-avatar {
  border-radius: 50%;
  width: 30%;
}

.logout-button {
  margin: 2.5% 0 2.5% 0;
}

.fa-cog {
  color: $tree-poppy;
  font-size: 1.5em;
  position: absolute;
  right: 27%;
  bottom: 0;
  cursor: pointer;
  &:hover {
    color: $tradewind;
  }
}
</style>
