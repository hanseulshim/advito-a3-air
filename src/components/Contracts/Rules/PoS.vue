<template>
  <div class="rule-container">
    <p class="rule-title">Point of Sale</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <el-select
        v-model="selectedCountry"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="item in geographyRuleList"
          :key="item.name"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in pointOfSaleList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ rule.countryCode }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { removeTypename } from '@/helper';
import {
  GET_GEO_LIST,
  GET_POINT_OF_SALE_LIST,
  GET_DISCOUNT,
  GET_TARGET_TERM,
  GET_PRICING_TERM,
  GET_CONTRACT
} from '@/graphql/queries';
import { UPDATE_POINT_OF_SALE } from '@/graphql/mutations';
export default {
  name: 'PointOfSale',
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
    geographyRuleList: {
      query: GET_GEO_LIST
    },
    pointOfSaleList: {
      query: GET_POINT_OF_SALE_LIST,
      variables() {
        return {
          parentId: this.parentId,
          parentType: this.parentType
        };
      },
      result({ data: { pointOfSaleList } }) {
        return removeTypename(pointOfSaleList);
      }
    }
  },
  data() {
    return {
      geographyRuleList: [],
      editMode: false,
      selectedCountry: [],
      pointOfSaleList: [],
      discountQueries: [
        {
          query: GET_POINT_OF_SALE_LIST,
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
          query: GET_POINT_OF_SALE_LIST,
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
        if (this.editMode && !this.pointOfSaleList.length) {
          this.$emit('delete-rule', 'PointOfSale');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_POINT_OF_SALE,
            variables: {
              parentId: this.parentId,
              parentType: this.parentType,
              pointOfSaleList: this.pointOfSaleList
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
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      const ruleContainerId = this.pointOfSaleList.length
        ? this.pointOfSaleList[0].ruleContainerId
        : null;

      this.selectedCountry.map(country => {
        this.pointOfSaleList.push({
          id: null,
          countryCode: country,
          ruleContainerId,
          isDeleted: false
        });
      });

      this.selectedCountry = [];
    },
    async deleteTag(tag) {
      try {
        const idx = this.pointOfSaleList.indexOf(tag);
        this.pointOfSaleList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_POINT_OF_SALE,
            variables: {
              parentId: this.parentId,
              pointOfSaleList: this.pointOfSaleList,
              parentType: this.parentType
            },
            refetchQueries: () =>
              this.parentType === 1
                ? this.discountQueries
                : this.targetTermQueries
          })
          .then(() => {
            const rulesRemaining = this.pointOfSaleList.some(
              rule => !rule.isDeleted
            );
            if (!this.pointOfSaleList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'PointOfSale');
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
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
