<template>
  <div class="rule-container">
    <p class="rule-title">Set Travel Dates</p>
    <div class="control-row">
      <el-date-picker
        v-model="startDate"
        type="date"
        format="dd MMM yyyy"
        size="mini"
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
import { UPDATE_TRAVEL_DATE_BULK } from '@/graphql/mutations';
import {
  GET_DISCOUNT_LIST,
  GET_PRICING_TERM,
  GET_CONTRACT,
  GET_TARGET_TERM_LIST,
  GET_PRICING_TERM_LIST
} from '@/graphql/queries';
export default {
  name: 'TravelDate',
  props: {
    parentType: {
      default: null,
      type: Number
    },
    parentId: {
      default: null,
      type: Number
    },
    selectedContract: {
      default: null,
      type: Number
    },
    bulkIdList: {
      default: null,
      type: Array
    }
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      updateRule: null,
      travelDateList: [],
      discountQueries: [
        {
          query: GET_DISCOUNT_LIST,
          variables: {
            pricingTermId: this.parentId
          }
        },
        {
          query: GET_PRICING_TERM,
          variables: {
            id: this.parentId
          }
        },
        {
          query: GET_CONTRACT,
          variables: {
            id: this.selectedContract
          }
        }
      ],
      targetTermQueries: [
        {
          query: GET_TARGET_TERM_LIST,
          variables: {
            contractId: this.selectedContract
          }
        },
        {
          query: GET_CONTRACT,
          variables: {
            id: this.selectedContract
          }
        }
      ],
      pricingTermQueries: [
        {
          query: GET_PRICING_TERM_LIST,
          variables: {
            contractId: this.selectedContract
          }
        },
        {
          query: GET_CONTRACT,
          variables: {
            id: this.selectedContract
          }
        }
      ]
    };
  },
  methods: {
    async saveRules() {
      try {
        let bulkList = [];
        this.bulkIdList.map(bulkId =>
          this.travelDateList.map(travelDate =>
            bulkList.push({
              id: bulkId,
              ...travelDate
            })
          )
        );
        await this.$apollo.mutate({
          mutation: UPDATE_TRAVEL_DATE_BULK,
          variables: {
            parentType: this.parentType,
            travelDateList: bulkList
          },
          refetchQueries: () =>
            this.parentType === 1
              ? this.discountQueries
              : this.parentType === 2
              ? this.targetTermQueries
              : this.pricingTermQueries
        });
        if (this.parentType === 1) {
          this.$emit('toggle-row', this.parentId);
        }
        this.$emit('hide-modal');
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
      this.startDate = '';
      this.endDate = '';
      this.updateRule = null;
    },
    createTag() {
      this.travelDateList.push({
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate)
      });
      this.startDate = '';
      this.endDate = '';
    },
    async deleteTag(tag) {
      const idx = this.travelDateList.indexOf(tag);
      this.travelDateList.splice(idx, 1);
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
