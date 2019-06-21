<template>
  <div class="rule-container">
    <p class="rule-title">Ticketing Dates</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="toggleEditMode"
    />
    <button v-if="editMode" class="save-rule" @click="toggleEditMode">
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
      <button v-if="updateRule" @click="updateTag">Update</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in ticketingDateList"
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
import { GET_TICKETING_DATE_LIST } from '@/graphql/queries';
import { UPDATE_TICKETING_DATES, DELETE_RULE } from '@/graphql/mutations';
export default {
  name: 'TicketingDates',
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
    ticketingDateList: {
      query: GET_TICKETING_DATE_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { ticketingDateList } }) {
        return removeTypename(ticketingDateList);
      }
    }
  },
  data() {
    return {
      editMode: false,
      startDate: '',
      endDate: '',
      updateRule: null,
      ticketingDateList: []
    };
  },

  methods: {
    async toggleEditMode() {
      if (this.editMode && !this.filteredRuleList.length) {
        this.$emit('delete-rule', 'TicketingDates');
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_TICKETING_DATES,
          variables: {
            parentId: this.parentId,
            ticketingDateList: this.ticketingDateList
          },
          refetchQueries: () => [
            {
              query: GET_TICKETING_DATE_LIST,
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
      const ruleContainerId = this.ticketingDateList.length
        ? this.ticketingDateList[0].ruleContainerId
        : null;

      this.ticketingDateList.push({
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
      const idx = this.ticketingDateList.indexOf(tag);
      this.ticketingDateList[idx].isDeleted = true;
      const tagId = this.ticketingDateList[idx].id;

      await this.$apollo.mutate({
        mutation: DELETE_RULE,
        variables: {
          id: tagId,
          ruleType: this.tableId
        },
        refetchQueries: () => [
          {
            query: GET_TICKETING_DATE_LIST,
            variables: { parentId: this.parentId }
          }
        ]
      });

      if (!this.filteredRuleList.length) {
        await this.$emit('delete-rule', 'TicketingDates');
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
      const ruleIndex = this.ticketingDateList.indexOf(this.updateRule);
      this.ticketingDateList[ruleIndex].startDate = new Date(this.startDate);
      this.ticketingDateList[ruleIndex].endDate = new Date(this.endDate);
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
