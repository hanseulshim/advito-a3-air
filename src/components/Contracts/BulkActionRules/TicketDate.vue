<template>
  <div class="rule-container">
    <p class="rule-title">Set Ticket Dates</p>
    <div class="control-row">
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
      >
        {{ formatDate(rule.startDate) }} -
        {{ formatDate(rule.endDate) }}
      </el-tag>
    </div>
    <div class="bulk-save-container">
      <button class="save-rule-bulk" @click="saveRules">Save</button>
    </div>
  </div>
</template>
<script>
import { formatDate, removeTypename } from '@/helper';
// import { UPDATE_TICKETING_DATES } from '@/graphql/mutations';
export default {
  name: 'TicketDate',
  props: {
    parentType: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      updateRule: null,
      ticketingDateList: []
    };
  },
  methods: {
    async saveRules() {
      // await this.$apollo.mutate({
      //   mutation: UPDATE_TICKETING_DATES,
      //   variables: {
      //     parentId: this.parentId,
      //     parentType: this.parentType,
      //     ticketingDateList: this.ticketingDateList
      //   },
      //   refetchQueries: () =>
      //     this.parentType === 1 ? this.discountQueries : this.targetTermQueries
      // });
      // if (this.parentType === 1) {
      //   this.$emit('toggle-row', this.pricingTermId);
      // }
      alert('rule saved!');
      this.startDate = '';
      this.endDate = '';
      this.updateRule = null;
    },
    createTag() {
      this.ticketingDateList.push({
        id: null,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        isDeleted: false
      });
      this.startDate = '';
      this.endDate = '';
    },
    async deleteTag(tag) {
      const idx = this.ticketingDateList.indexOf(tag);
      this.ticketingDateList.splice(idx, 1);
      // await this.$apollo
      //   .mutate({
      //     mutation: UPDATE_TICKETING_DATES,
      //     variables: {
      //       parentId: this.parentId,
      //       parentType: this.parentType,
      //       ticketingDateList: this.ticketingDateList
      //     },
      //     refetchQueries: () =>
      //       this.parentType === 1
      //         ? this.discountQueries
      //         : this.targetTermQueries
      //   })
      //   .then(() => {
      //     const rulesRemaining = this.ticketingDateList.some(
      //       rule => !rule.isDeleted
      //     );
      //     if (!this.ticketingDateList.length || !rulesRemaining) {
      //       this.$emit('delete-rule', 'TicketingDates');
      //       this.$emit('toggle-row', this.pricingTermId);
      //     }
      //   });
      // if (this.parentType === 1) {
      //   this.$emit('toggle-row', this.pricingTermId);
      // }
    },
    editTag(rule) {
      this.updateRule = rule;
      this.startDate = new Date(rule.startDate);
      this.endDate = new Date(rule.endDate);
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
@import '../Rules/ruleStyles.scss';
</style>
