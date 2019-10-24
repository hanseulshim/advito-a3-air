<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Point of Origin</p>
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
        :filter-method="setQueryString"
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="item in filteredCountryList"
          :key="item.name"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in pointOfOriginList"
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
import { removeTypename, filterByNameAndCode } from '@/helper';
import {
  GET_COUNTRY_LIST,
  GET_POINT_OF_ORIGIN_LIST,
  GET_DISCOUNT,
  GET_TARGET_TERM,
  GET_PRICING_TERM,
  GET_CONTRACT
} from '@/graphql/queries';
import { UPDATE_POINT_OF_ORIGIN } from '@/graphql/mutations';
export default {
  name: 'PointOfOrigin',
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
    countryList: {
      query: GET_COUNTRY_LIST
    },
    pointOfOriginList: {
      query: GET_POINT_OF_ORIGIN_LIST,
      variables() {
        return {
          parentId: this.parentId,
          parentType: this.parentType
        };
      },
      result({ data: { pointOfOriginList } }) {
        return removeTypename(pointOfOriginList);
      }
    }
  },
  data() {
    return {
      countryList: [],
      editMode: false,
      query: '',
      selectedCountry: [],
      pointOfOriginList: [],
      discountQueries: [
        {
          query: GET_POINT_OF_ORIGIN_LIST,
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
          query: GET_POINT_OF_ORIGIN_LIST,
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
  computed: {
    filteredCountryList() {
      if (this.query) {
        return filterByNameAndCode(this.countryList, this.query).filter(
          country =>
            !this.pointOfOriginList.some(
              rule => rule.countryCode === country.code
            )
        );
      } else {
        return this.countryList.filter(
          country =>
            !this.pointOfOriginList.some(
              rule => rule.countryCode === country.code
            )
        );
      }
    }
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.pointOfOriginList.length) {
          this.$emit('delete-rule', 'PointOfOrigin');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_POINT_OF_ORIGIN,
            variables: {
              parentId: this.parentId,
              parentType: this.parentType,
              pointOfOriginList: this.pointOfOriginList
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
      const ruleContainerId = this.pointOfOriginList.length
        ? this.pointOfOriginList[0].ruleContainerId
        : null;

      this.selectedCountry.map(country => {
        this.pointOfOriginList.push({
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
        const idx = this.pointOfOriginList.indexOf(tag);
        this.pointOfOriginList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_POINT_OF_ORIGIN,
            variables: {
              parentId: this.parentId,
              pointOfOriginList: this.pointOfOriginList,
              parentType: this.parentType
            },
            refetchQueries: () =>
              this.parentType === 1
                ? this.discountQueries
                : this.targetTermQueries
          })
          .then(() => {
            const rulesRemaining = this.pointOfOriginList.some(
              rule => !rule.isDeleted
            );
            if (!this.pointOfOriginList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'PointOfOrigin');
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
    setQueryString(query) {
      this.query = query;
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
