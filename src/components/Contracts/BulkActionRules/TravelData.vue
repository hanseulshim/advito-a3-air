<template>
  <div class="rule-container">
    <p class="rule-title">Set Travel Dates</p>
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
        v-for="rule in travelDateList"
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
import { formatDate } from '@/helper';
// import { UPDATE_TICKETING_DATES } from '@/graphql/mutations';
export default {
  name: 'TravelData',
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
      travelDateList: []
    };
  },
  methods: {
    async saveRules() {
      // await this.$apollo.mutate({
      //   mutation: UPDATE_TICKETING_DATES,
      //   variables: {
      //     parentId: this.parentId,
      //     parentType: this.parentType,
      //     travelDateList: this.travelDateList
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
      this.travelDateList.push({
        id: null,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        isDeleted: false
      });
      this.startDate = '';
      this.endDate = '';
    },
    async deleteTag(tag) {
      const idx = this.travelDateList.indexOf(tag);
      this.travelDateList.splice(idx, 1);
      // await this.$apollo
      //   .mutate({
      //     mutation: UPDATE_TICKETING_DATES,
      //     variables: {
      //       parentId: this.parentId,
      //       parentType: this.parentType,
      //       travelDateList: this.travelDateList
      //     },
      //     refetchQueries: () =>
      //       this.parentType === 1
      //         ? this.discountQueries
      //         : this.targetTermQueries
      //   })
      //   .then(() => {
      //     const rulesRemaining = this.travelDateList.some(
      //       rule => !rule.isDeleted
      //     );
      //     if (!this.travelDateList.length || !rulesRemaining) {
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
@import '../Rules/ruleStyles.scss';
</style>
