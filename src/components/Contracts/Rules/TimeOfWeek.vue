<template>
  <div class="rule-container">
    <p class="rule-title">Time Of Week</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="toggleEditMode"
    />
    <button v-if="editMode" class="save-rule" @click="toggleEditMode">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <label>Start Day: </label>
      <el-select
        v-model="startDate"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="day in days"
          :key="day"
          :label="day"
          :value="day"
        ></el-option>
      </el-select>
      <label>End Day: </label>
      <el-select
        v-model="endDate"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="day in days"
          :key="day"
          :label="day"
          :value="day"
        ></el-option>
      </el-select>
    </div>
    <div v-if="editMode" class="control-row">
      <label>Start Time: </label>
      <el-time-picker
        v-model="startTime"
        placeholder="Select"
        size="mini"
        clearable
        format="HH:mm"
      />
      <label>End Time: </label>
      <el-time-picker
        v-model="endTime"
        placeholder="Select"
        size="mini"
        format="HH:mm"
        clearable
      />
      <label> Exclude: </label>
      <el-checkbox v-model="exclude" name="exclude" />
      <button v-if="!updateRule" @click="createTag">Add</button>
      <button v-if="updateRule" @click="updateTag">Update</button>
    </div>
    <div class="rule-tags">
      <label v-if="includedRules.length">Included:</label>
      <el-tag
        v-for="rule in includedRules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @click="editTag(rule)"
        @close="deleteTag(rule)"
        >{{
          `${rule.startDate} after ${rule.startTime} -  ${
            rule.endDate
          } before ${rule.endTime}`
        }}</el-tag
      >
    </div>
    <div class="rule-tags">
      <label v-if="excludedRules.length">Excluded:</label>
      <el-tag
        v-for="rule in excludedRules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @click="editTag(rule)"
        @close="deleteTag(rule)"
        >{{
          `${rule.startDate} after ${rule.startTime} -  ${
            rule.endDate
          } before ${rule.endTime}`
        }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'TimeOfWeek',
  apollo: {},
  data() {
    return {
      days: [
        'Undefined',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      exclude: false,
      editMode: true,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      rules: [],
      updateRule: null
    };
  },
  computed: {
    excludedRules: function() {
      return this.rules.filter(rule => rule.exclude);
    },
    includedRules: function() {
      return this.rules.filter(rule => !rule.exclude);
    }
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'TimeOfWeek');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      const formattedStart = this.formatTime(this.startTime);
      const formattedEnd = this.formatTime(this.endTime);

      this.rules.push({
        startDate: this.startDate,
        endDate: this.endDate,
        exclude: this.exclude,
        startTime: formattedStart,
        endTime: formattedEnd,
        unformattedStart: this.startTime,
        unformattedEnd: this.endTime
      });

      this.startDate = '';
      this.endDate = '';
      this.startTime = '';
      this.endTime = '';
      this.exlcude = false;
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'TimeOfWeek');
      }
    },
    editTag(rule) {
      if (this.editMode) {
        this.updateRule = rule;
        this.startDate = rule.startDate;
        this.endDate = rule.endDate;
        this.startTime = rule.unformattedStart;
        this.endTime = rule.unformattedEnd;
        this.exclude = rule.exclude;
      } else return;
    },
    updateTag() {
      const formattedStart = this.formatTime(this.startTime);
      const formattedEnd = this.formatTime(this.endTime);
      const ruleIndex = this.rules.indexOf(this.updateRule);

      this.rules[ruleIndex].startDate = this.startDate;
      this.rules[ruleIndex].endDate = this.endDate;
      this.rules[ruleIndex].startTime = formattedStart;
      this.rules[ruleIndex].endTime = formattedEnd;
      this.rules[ruleIndex].unformattedStart = this.startTime;
      this.rules[ruleIndex].unformattedEnd = this.endTime;
      this.updateRule = null;
      this.startDate = '';
      this.endDate = '';
      this.startTime = '';
      this.endTime = '';
    },
    formatTime(date) {
      return date ? moment(date).format('H:mm') : '';
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
