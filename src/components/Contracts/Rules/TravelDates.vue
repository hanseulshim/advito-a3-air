<template>
  <div class="rule-container">
    <p class="rule-title">Travel Dates</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="toggleEditMode"
    />
    <button v-if="editMode" class="button save-rule" @click="toggleEditMode">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <el-date-picker
        v-model="startDate"
        type="date"
        size="mini"
        placeholder="Pick a day"
        class="date-picker"
        format="DD-MMM-yyyy"
      ></el-date-picker>
      <el-date-picker
        v-model="endDate"
        type="date"
        size="mini"
        placeholder="Pick a day"
        class="date-picker"
        format="DD-MMM-yyyy"
      ></el-date-picker>
      <button class="button" @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in rules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ rule.start }} - {{ rule.end }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { formatDate } from '../../../helper';
export default {
  name: 'TravelDates',
  apollo: {},
  data() {
    return {
      editMode: false,
      startDate: '',
      endDate: '',
      rules: [
        {
          start: '04 JUN 2018',
          end: '31 DEC 2019'
        },
        {
          start: '04 JUN 2018',
          end: '31 DEC 2019'
        }
      ]
    };
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    createTag() {
      const start = formatDate(this.startDate);
      const end = formatDate(this.endDate);

      this.rules.push({
        start,
        end
      });
      this.startDate = '';
      this.endDate = '';
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
