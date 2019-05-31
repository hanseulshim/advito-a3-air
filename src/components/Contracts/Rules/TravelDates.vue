<template>
  <div class="rule-container">
    <p class="rule-title">Travel Dates</p>
    <i class="fas fa-pencil-alt edit-rule" @click="toggleEditMode" v-if="!editMode"/>
    <button class="button save-rule" @click="toggleEditMode" v-if="editMode">Save</button>
    <div class="datepicker-row" v-if="editMode">
      <el-date-picker
        v-model="startDate"
        type="date"
        size="mini"
        placeholder="Pick a day"
        class="date-picker"
      ></el-date-picker>
      <el-date-picker
        v-model="endDate"
        type="date"
        size="mini"
        placeholder="Pick a day"
        class="date-picker"
      ></el-date-picker>
      <button class="button">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag type="info" size="small" closable>05 MAR 2019 - 31 DEC 2019</el-tag>
      <el-tag type="info" size="small" closable>15 FEB 2018 - 31 NOV 2019</el-tag>
    </div>
  </div>
</template>
<script>
export default {
  name: "TravelDates",
  apollo: {},
  data() {
    return {
      editMode: false,
      startDate: "",
      endDate: "",
      rules: []
    };
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
    }
  }
};
</script>
<style lang='scss'>
@import "./ruleStyles.scss";
</style>