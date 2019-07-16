<template>
  <div class="rule-container">
    <p class="rule-title">Ticket Designation</p>
    <!-- <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
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
      >
        {{ formatDate(rule.startDate) }} -
        {{ formatDate(rule.endDate) }}
      </el-tag>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'TicketDesignation',
  props: {},

  data() {
    return {
      //   editMode: false,
      //   startDate: '',
      //   endDate: '',
      //   updateRule: null,
      //   ticketingDateList: [],
      //   discountQueries: [
      //     {
      //       query: GET_TICKETING_DATE_LIST,
      //       variables: {
      //         parentId: this.parentId,
      //         parentType: this.parentType
      //       }
      //     },
      //     {
      //       query: GET_DISCOUNT,
      //       variables: {
      //         id: this.parentId
      //       }
      //     },
      //     {
      //       query: GET_PRICING_TERM,
      //       variables: {
      //         id: this.pricingTermId
      //       }
      //     },
      //     {
      //       query: GET_CONTRACT,
      //       variables: {
      //         id: this.contractId
      //       }
      //     }
      //   ],
      //   targetTermQueries: [
      //     {
      //       query: GET_TICKETING_DATE_LIST,
      //       variables: {
      //         parentId: this.parentId,
      //         parentType: this.parentType
      //       }
      //     },
      //     {
      //       query: GET_TARGET_TERM,
      //       variables: {
      //         id: this.parentId
      //       }
      //     },
      //     {
      //       query: GET_CONTRACT,
      //       variables: {
      //         id: this.contractId
      //       }
      //     }
      //   ]
    };
  },
  methods: {
    // async saveRules() {
    //   if (this.editMode && !this.ticketingDateList.length) {
    //     this.$emit('delete-rule', 'TicketingDates');
    //   } else if (this.editMode) {
    //     await this.$apollo.mutate({
    //       mutation: UPDATE_TICKETING_DATES,
    //       variables: {
    //         parentId: this.parentId,
    //         parentType: this.parentType,
    //         ticketingDateList: this.ticketingDateList
    //       },
    //       refetchQueries: () =>
    //         this.parentType === 1
    //           ? this.discountQueries
    //           : this.targetTermQueries
    //     });
    //     if (this.parentType === 1) {
    //       this.$emit('toggle-row', this.pricingTermId);
    //     }
    //   }
    //   this.editMode = !this.editMode;
    //   this.startDate = '';
    //   this.endDate = '';
    //   this.updateRule = null;
    // },
    // createTag() {
    //   const ruleContainerId = this.ticketingDateList.length
    //     ? this.ticketingDateList[0].ruleContainerId
    //     : null;
    //   this.ticketingDateList.push({
    //     id: null,
    //     ruleContainerId,
    //     startDate: new Date(this.startDate),
    //     endDate: new Date(this.endDate),
    //     isDeleted: false
    //   });
    //   this.startDate = '';
    //   this.endDate = '';
    // },
    // async deleteTag(tag) {
    //   const idx = this.ticketingDateList.indexOf(tag);
    //   this.ticketingDateList[idx].isDeleted = true;
    //   await this.$apollo
    //     .mutate({
    //       mutation: UPDATE_TICKETING_DATES,
    //       variables: {
    //         parentId: this.parentId,
    //         parentType: this.parentType,
    //         ticketingDateList: this.ticketingDateList
    //       },
    //       refetchQueries: () =>
    //         this.parentType === 1
    //           ? this.discountQueries
    //           : this.targetTermQueries
    //     })
    //     .then(() => {
    //       const rulesRemaining = this.ticketingDateList.some(
    //         rule => !rule.isDeleted
    //       );
    //       if (!this.ticketingDateList.length || !rulesRemaining) {
    //         this.$emit('delete-rule', 'TicketingDates');
    //         this.$emit('toggle-row', this.pricingTermId);
    //       }
    //     });
    //   if (this.parentType === 1) {
    //     this.$emit('toggle-row', this.pricingTermId);
    //   }
    // },
    // editTag(rule) {
    //   if (this.editMode) {
    //     this.updateRule = rule;
    //     this.startDate = new Date(rule.startDate);
    //     this.endDate = new Date(rule.endDate);
    //   } else return;
    // },
    // updateTag() {
    //   const ruleIndex = this.ticketingDateList.indexOf(this.updateRule);
    //   this.ticketingDateList[ruleIndex].startDate = new Date(this.startDate);
    //   this.ticketingDateList[ruleIndex].endDate = new Date(this.endDate);
    //   this.updateRule = null;
    //   this.startDate = '';
    //   this.endDate = '';
    // },
    // formatDate(date) {
    //   return formatDate(date);
    // }
  }
};
</script>
<style lang="scss">
@import '../Rules/ruleStyles.scss';
</style>
