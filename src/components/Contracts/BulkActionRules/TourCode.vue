<template>
  <div class="rule-container">
    <p class="rule-title">Tour Code</p>
    <div class="control-row">
      <el-input v-model="tourCode" size="mini" class="number-input" clearable />
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in tourCodeList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ ` ${rule.tourCode}` }}</el-tag
      >
    </div>
    <div class="bulk-save-container">
      <button class="save-rule-bulk" @click="saveRules">Save</button>
    </div>
  </div>
</template>
<script>
import { UPDATE_TOUR_CODE_BULK } from '@/graphql/mutations';
import {
  GET_DISCOUNT_LIST,
  GET_PRICING_TERM,
  GET_CONTRACT,
  GET_TARGET_TERM_LIST,
  GET_PRICING_TERM_LIST
} from '@/graphql/mutations';
export default {
  name: 'TourCode',
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
      tourCode: '',
      tourCodeList: [],
      discountQueries: [
        {
          query: GET_DISCOUNT_LIST,
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
          query: GET_TARGET_TERM_LIST,
          variables: {
            contractId: this.contractId
          }
        },
        {
          query: GET_CONTRACT,
          variables: {
            id: this.contractId
          }
        }
      ],
      pricingTermQueries: [
        {
          query: GET_PRICING_TERM_LIST,
          vairables: {
            contractId: this.contractId
          }
        },
        {
          query: GET_CONTRACT,
          vairables: {
            contractId: this.contractId
          }
        }
      ]
    };
  },
  methods: {
    async saveRules() {
      let bulkList = [];

      this.bulkIdList.map(bulkId =>
        this.tourCodeList.map(tourcode =>
          bulkList.push({
            id: bulkId,
            ...tourcode
          })
        )
      );

      await this.$apollo.mutate({
        mutation: UPDATE_TOUR_CODE_BULK,
        variables: {
          parentType: this.parentType,
          tourCodeList: bulkList
        },
        refetchQueries: () =>
          this.parentType === 1
            ? this.discountQueries
            : this.parentType === 2
            ? this.targetTermQueries
            : this.pricingTermQueries
      });
      if (this.parentType === 1) {
        this.$emit('toggle-row', this.pricingTermId);
      }

      this.tourCode = '';
    },
    createTag() {
      this.tourCodeList.push({
        tourCode: this.tourCode
      });

      this.tourCode = '';
    },
    async deleteTag(tag) {
      const idx = this.tourCodeList.indexOf(tag);
      this.tourCodeList.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss">
@import '../Rules/ruleStyles.scss';
</style>
