<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Ticketing Dates</p>
    <i
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
        format="dd MMM yyyy"
        placeholder="Pick a day"
        class="date-picker"
      ></el-date-picker>
      <el-date-picker
        v-model="endDate"
        format="dd MMM yyyy"
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
        v-loading="$apollo.loading"
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
  </div>
</template>
<script>
import { formatDate, removeTypename } from '@/helper';
import {
  GET_TICKETING_DATE_LIST,
  GET_DISCOUNT,
  GET_TARGET_TERM,
  GET_PRICING_TERM,
  GET_CONTRACT
} from '@/graphql/queries';
import { UPDATE_TICKETING_DATES } from '@/graphql/mutations';
import moment from 'moment';

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
    },
    parentType: {
      default: null,
      type: Number
    },
    pricingTermId: {
      default: null,
      type: Number
    },
    contractId: {
      default: null,
      type: Number
    }
  },
  apollo: {
    ticketingDateList: {
      query: GET_TICKETING_DATE_LIST,
      fetchPolicy: 'network-only',
      variables() {
        return {
          parentId: this.parentId,
          parentType: this.parentType
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
      ticketingDateList: [],
      discountQueries: [
        {
          query: GET_TICKETING_DATE_LIST,
          variables: {
            parentId: this.parentId,
            parentType: this.parentType
          }
        },
        {
          query: GET_DISCOUNT,
          variables: {
            id: this.parentId
          }
        },
        {
          query: GET_PRICING_TERM,
          variables: {
            id: this.pricingTermId
          }
        },
        {
          query: GET_CONTRACT,
          variables: {
            id: this.contractId
          }
        }
      ],
      targetTermQueries: [
        {
          query: GET_TICKETING_DATE_LIST,
          variables: {
            parentId: this.parentId,
            parentType: this.parentType
          }
        },
        {
          query: GET_TARGET_TERM,
          variables: {
            id: this.parentId
          }
        },
        {
          query: GET_CONTRACT,
          variables: {
            id: this.contractId
          }
        }
      ]
    };
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.ticketingDateList.length) {
          this.$emit('delete-rule', 'TicketingDates');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_TICKETING_DATES,
            variables: {
              parentId: this.parentId,
              parentType: this.parentType,
              ticketingDateList: this.ticketingDateList
            },
            refetchQueries: () =>
              this.parentType === 1
                ? this.discountQueries
                : this.targetTermQueries
          });
          if (this.parentType === 1) {
            this.$emit('toggle-row', this.pricingTermId);
          }
        }
        this.editMode = !this.editMode;
        this.startDate = '';
        this.endDate = '';
        this.updateRule = null;
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      if (
        this.startDate &&
        this.endDate &&
        this.startDate.getTime() !== this.endDate.getTime()
      ) {
        const ruleContainerId = this.ticketingDateList.length
          ? this.ticketingDateList[0].ruleContainerId
          : null;

        this.ticketingDateList.push({
          id: null,
          ruleContainerId,
          startDate: moment.utc(this.startDate),
          endDate: moment.utc(this.endDate),
          isDeleted: false
        });
        this.startDate = '';
        this.endDate = '';
      } else if (!this.startDate || !this.endDate) {
        this.$modal.show('error', {
          message: 'Please enter both a start date and an end date.'
        });
      } else if (this.startDate.getTime() === this.endDate.getTime()) {
        this.$modal.show('error', {
          message: 'Please enter a valid start date and end date.'
        });
      }
    },
    async deleteTag(tag) {
      try {
        const idx = this.ticketingDateList.indexOf(tag);
        this.ticketingDateList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_TICKETING_DATES,
            variables: {
              parentId: this.parentId,
              parentType: this.parentType,
              ticketingDateList: this.ticketingDateList
            },
            refetchQueries: () =>
              this.parentType === 1
                ? this.discountQueries
                : this.targetTermQueries
          })
          .then(() => {
            const rulesRemaining = this.ticketingDateList.some(
              rule => !rule.isDeleted
            );
            if (!this.ticketingDateList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'TicketingDates');
              this.$emit('toggle-row', this.pricingTermId);
            }
          });
        if (this.parentType === 1) {
          this.$emit('toggle-row', this.pricingTermId);
        }
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    editTag(rule) {
      if (this.editMode) {
        this.updateRule = rule;
        this.startDate = moment.utc(rule.startDate);
        this.endDate = moment.utc(rule.endDate);
      } else return;
    },
    updateTag() {
      const ruleIndex = this.ticketingDateList.indexOf(this.updateRule);
      this.ticketingDateList[ruleIndex].startDate = moment.utc(this.startDate);
      this.ticketingDateList[ruleIndex].endDate = moment.utc(this.endDate);
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
