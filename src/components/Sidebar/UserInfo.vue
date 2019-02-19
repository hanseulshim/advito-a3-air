<template>
  <div class="user-info-container">
    <div class="sidebar-avatar-container">
      <img id="sidebar-avatar" alt="avatar" src="@/assets/shayan.jpeg" />
      <i class="fas fa-cog" />
    </div>
    <div>Shayan</div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo'
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
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
.fa-cog {
  color: $tree-poppy;
  font-size: 1.5em;
  position: absolute;
  right: 30%;
  bottom: 0;
  cursor: pointer;
  &:hover {
    color: $tradewind;
  }
}
</style>
