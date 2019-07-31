<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Time/Day Of Week</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <label>Start Day:</label>
      <el-select
        v-model="startDay"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="dayUnit in dayOfWeekUnitList"
          :key="dayUnit.name"
          :label="dayUnit.name"
          :value="dayUnit.id"
        ></el-option>
      </el-select>
      <label>End Day:</label>
      <el-select
        v-model="endDay"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="dayUnit in dayOfWeekUnitList"
          :key="dayUnit.name"
          :label="dayUnit.name"
          :value="dayUnit.id"
        ></el-option>
      </el-select>
    </div>
    <div v-if="editMode" class="control-row">
      <label>Start Time:</label>
      <el-time-picker
        v-model="startTime"
        placeholder="Select"
        size="mini"
        clearable
        format="HH:mm"
      />
      <label>End Time:</label>
      <el-time-picker
        v-model="endTime"
        placeholder="Select"
        size="mini"
        format="HH:mm"
        clearable
      />
      <label>Exclude:</label>
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
        >{{ getTagString(rule) }}</el-tag
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
        >{{ getTagString(rule) }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { removeTypename } from '@/helper';
import {
  GET_DAY_OF_WEEK_LIST,
  GET_DAY_OF_WEEK_UNIT_LIST,
  GET_DISCOUNT
} from '@/graphql/queries';
import { UPDATE_DAY_OF_WEEK_LIST } from '@/graphql/mutations';
import moment from 'moment';
export default {
  name: 'TimeOfWeek',
  props: {
    parentId: {
      default: null,
      type: Number
    },
    tableId: {
      default: null,
      type: Number
    }
  },
  apollo: {
    dayOfWeekList: {
      query: GET_DAY_OF_WEEK_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { dayOfWeekList } }) {
        return removeTypename(dayOfWeekList);
      }
    },
    dayOfWeekUnitList: {
      query: GET_DAY_OF_WEEK_UNIT_LIST
    }
  },
  data() {
    return {
      dayOfWeekList: [],
      dayOfWeekUnitList: [],
      startDay: null,
      endDay: null,
      startTime: '',
      endTime: '',
      exclude: false,
      updateRule: null,
      editMode: false
    };
  },
  computed: {
    excludedRules() {
      return this.dayOfWeekList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.dayOfWeekList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.dayOfWeekList.length) {
          this.$emit('delete-rule', 'TimeOfWeek');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_DAY_OF_WEEK_LIST,
            variables: {
              parentId: this.parentId,
              dayOfWeekList: this.dayOfWeekList
            },
            refetchQueries: () => [
              {
                query: GET_DAY_OF_WEEK_LIST,
                variables: { parentId: this.parentId }
              },
              {
                query: GET_DISCOUNT,
                variables: {
                  id: this.parentId
                }
              }
            ]
          });
        }
        this.editMode = !this.editMode;
        this.startDay = null;
        this.endDay = null;
        this.startTime = '';
        this.endTime = '';
        this.updateRule = null;
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      const ruleContainerId = this.dayOfWeekList.length
        ? this.dayOfWeekList[0].ruleContainerId
        : null;

      this.dayOfWeekList.push({
        id: null,
        ruleContainerId,
        startDay: this.startDay,
        endDay: this.endDay,
        startTime: this.formatTime(this.startTime),
        endTime: this.formatTime(this.endTime),
        exclude: this.exclude,
        isDeleted: false
      });

      this.startDay = null;
      this.endDay = null;
      this.startTime = '';
      this.endTime = '';
      this.updateRule = null;
    },
    async deleteTag(tag) {
      try {
        const idx = this.dayOfWeekList.indexOf(tag);
        this.dayOfWeekList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_DAY_OF_WEEK_LIST,
            variables: {
              parentId: this.parentId,
              dayOfWeekList: this.dayOfWeekList
            },
            refetchQueries: () => [
              {
                query: GET_DAY_OF_WEEK_LIST,
                variables: { parentId: this.parentId }
              }
            ]
          })
          .then(() => {
            const rulesRemaining = this.dayOfWeekList.some(
              rule => !rule.isDeleted
            );
            if (!this.dayOfWeekList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'TimeOfWeek');
            }
          });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    editTag(rule) {
      if (this.editMode) {
        this.updateRule = rule;
        this.startDay = rule.startDay;
        this.endDay = rule.endDay;
        this.startTime = rule.unformattedStart;
        this.endTime = rule.unformattedEnd;
        this.exclude = rule.exclude;
      } else return;
    },
    updateTag() {
      const formattedStart = this.formatTime(this.startTime);
      const formattedEnd = this.formatTime(this.endTime);
      const ruleIndex = this.dayOfWeekList.indexOf(this.updateRule);

      this.dayOfWeekList[ruleIndex].startDay = this.startDay;
      this.dayOfWeekList[ruleIndex].endDay = this.endDay;
      this.dayOfWeekList[ruleIndex].startTime = formattedStart;
      this.dayOfWeekList[ruleIndex].endTime = formattedEnd;

      this.updateRule = null;
      this.startDay = '';
      this.endDay = '';
      this.startTime = '';
      this.endTime = '';
    },
    formatTime(date) {
      return date ? moment(date).format('H:mm') : '';
    },
    getTagString(rule) {
      if (!this.dayOfWeekList.length || !this.dayOfWeekUnitList.length) {
        return;
      } else {
        const startDayMatch = rule.startDay
          ? this.dayOfWeekUnitList.filter(day => day.id === rule.startDay)[0]
          : null;

        const endDayMatch = rule.endDay
          ? this.dayOfWeekUnitList.filter(day => day.id === rule.endDay)[0]
          : null;

        return `${startDayMatch.name} after ${rule.startTime} -  ${
          endDayMatch.name
        } before ${rule.endTime}`;
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
