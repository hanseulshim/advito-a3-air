<template>
  <div>
    <i
      v-if="collapse"
      class="fas fa-user sidebar-icon"
      @click="collapse = false"
    />
    <div v-else class="sidebar-container">
      <i
        class="fas fa-times sidebar-icon sidebar-close-icon"
        @click="collapse = true"
      />
      <UserInfo />
    </div>
  </div>
</template>

<script>
import UserInfo from './UserInfo.vue';
export default {
  name: 'Sidebar',
  components: {
    UserInfo
  },
  data() {
    return {
      collapse: true
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.sidebar-icon {
  position: absolute;
  font-size: 1.3em;
  padding: 0.5em;
  background: $white;
  border: 1px solid $gray-nurse;
  border-left: none;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  color: $tree-poppy;
  cursor: pointer;
  top: 3em;
  left: 0;
}
.sidebar-close-icon {
  right: calc(-2em + 6px);
  left: initial;
}
.sidebar-container {
  background: $white;
  border: 1px solid $gray-nurse;
  padding: 2.5em 4em;
  height: 100%;
  position: absolute;
  opacity: 0.95;
  z-index: 5;
}
</style>
