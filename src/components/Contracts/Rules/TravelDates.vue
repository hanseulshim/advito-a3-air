<template>
  <div class="rule-container">
    <p class="rule-title">Travel Dates</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">
      Save
    </button>
    <div v-if="editMode" class="control-row">
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
      <button v-if="!updateRule" @click="createTag">Add</button>
      <button v-if="updateRule" @click="updateTag">
        Update
      </button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in travelDateList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        @click="editTag(rule)"
        >{{ formatDate(rule.startDate) }} -
        {{ formatDate(rule.endDate) }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { formatDate, removeTypename } from '@/helper';
import { GET_TRAVEL_DATE_LIST } from '@/graphql/queries';
import { UPDATE_TRAVEL_DATES, DELETE_RULE } from '@/graphql/mutations';
export default {
  name: 'TravelDates',
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
    travelDateList: {
      query: GET_TRAVEL_DATE_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { travelDateList } }) {
        return removeTypename(travelDateList);
      }
    }
  },
  data() {
    return {
      editMode: false,
      startDate: '',
      endDate: '',
      updateRule: null,
      travelDateList: []
    };
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.travelDateList.length) {
        this.$emit('delete-rule', 'TravelDates');
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_TRAVEL_DATES,
          variables: {
            parentId: this.parentId,
            travelDateList: this.travelDateList
          },
          refetchQueries: () => [
            {
              query: GET_TRAVEL_DATE_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.startDate = '';
      this.endDate = '';
      this.updateRule = null;
    },
    createTag() {
      const ruleContainerId = this.travelDateList.length
        ? this.travelDateList[0].ruleContainerId
        : null;

      this.travelDateList.push({
        id: null,
        ruleContainerId,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        isDeleted: false
      });
      this.startDate = '';
      this.endDate = '';
    },
    async deleteTag(tag) {
      const idx = this.travelDateList.indexOf(tag);
      this.travelDateList[idx].isDeleted = true;
      const tagId = this.travelDateList[idx].id;

      await this.$apollo.mutate({
        mutation: DELETE_RULE,
        variables: {
          id: tagId,
          ruleType: this.tableId
        },
        refetchQueries: () => [
          {
            query: GET_TRAVEL_DATE_LIST,
            variables: { parentId: this.parentId }
          }
        ]
      });

      if (!this.travelDateList.length) {
        await this.$emit('delete-rule', 'TravelDates');
      }
    },
    editTag(rule) {
      if (this.editMode) {
        this.updateRule = rule;
        this.startDate = new Date(rule.startDate);
        this.endDate = new Date(rule.endDate);
      } else return;
    },
    updateTag() {
      const ruleIndex = this.travelDateList.indexOf(this.updateRule);
      this.travelDateList[ruleIndex].startDate = new Date(this.startDate);
      this.travelDateList[ruleIndex].endDate = new Date(this.endDate);
      this.updateRule = null;
      this.startDate = '';
      this.endDate = '';
    },
    formatDate(date) {
      return formatDate(date);
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
