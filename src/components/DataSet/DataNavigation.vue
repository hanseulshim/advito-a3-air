<template>
  <div class="navigation-container">
    <div><i class="fas fa-gopuram data-icon" />PoS Trends</div>
    <div><i class="fas fa-ticket-alt data-icon" />Division Trends</div>
    <div><i class="fas fa-file-alt data-icon" />Import Errors</div>
    <button class="button long annualization">ANNUALIZATION</button>
    <div class="dataset">
      <el-select placeholder="Select Client">
        <!-- <el-option
          v-for="item in clientList"
          :key="item.value"
          :label="item.name"
          :value="item.id"
        ></el-option> -->
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataNavigation'
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.navigation-container {
  display: grid;
  grid-template-areas: 'pos division import . annualization dataset';
  grid-template-columns: 15% 15% 15% auto 150px 200px;
  row-gap: 1em;
  column-gap: 1em;
  align-items: center;
}
.annualization {
  grid-area: annualization;
}
.dataset {
  grid-area: dataset;
}
.data-icon {
  font-size: 1.5em;
  border: 1px solid $gray-nurse;
  border-radius: 100%;
  padding: 10px;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
}
</style>
