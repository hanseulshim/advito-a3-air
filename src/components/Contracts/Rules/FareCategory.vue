<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Fare Category</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <el-select
        v-model="selectedFares"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="fare in faresInDropdown"
          :key="fare.name"
          :label="fare.name"
          :value="fare.cabinId"
        ></el-option>
      </el-select>
      <label>Exclude:</label>
      <el-checkbox v-model="exclude" name="exclude" />
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <label v-if="includedRules.length">Included:</label>
      <el-tag
        v-for="rule in includedRules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ getTagString(rule) }}</el-tag
      >
    </div>
    <div class="rule-tags">
      <label v-if="excludedRules.length">Excluded:</label>
      <el-tag
        v-for="rule in excludedRules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ getTagString(rule) }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { removeTypename } from '@/helper';
import {
  GET_FARE_CATEGORY_LIST,
  GET_FARE_CATEGORY_UNIT_LIST,
  GET_DISCOUNT
} from '@/graphql/queries';
import { UPDATE_FARE_CATEGORY_LIST } from '@/graphql/mutations';
export default {
  name: 'FareCategory',
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
    fareCategoryUnitList: {
      query: GET_FARE_CATEGORY_UNIT_LIST
    },
    fareCategoryList: {
      query: GET_FARE_CATEGORY_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { fareCategoryList } }) {
        return removeTypename(fareCategoryList);
      }
    }
  },
  data() {
    return {
      fareCategoryUnitList: [],
      fareCategoryList: [],
      selectedFares: [],
      exclude: false,
      editMode: false
    };
  },
  computed: {
    faresInDropdown() {
      return this.fareCategoryUnitList.filter(
        fare => !this.fareCategoryList.some(v => v.fareCategory === fare.id)
      );
    },
    excludedRules() {
      return this.fareCategoryList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.fareCategoryList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.fareCategoryList.length) {
          this.$emit('delete-rule', 'FareCategory');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_FARE_CATEGORY_LIST,
            variables: {
              parentId: this.parentId,
              fareCategoryList: this.fareCategoryList
            },
            refetchQueries: () => [
              {
                query: GET_FARE_CATEGORY_LIST,
                variables: { parentId: this.parentId }
              },
              {
                query: GET_DISCOUNT,
                variables: {
                  id: this.parentId
                }
              }
            ]
          });
        }
        this.editMode = !this.editMode;
        this.selectedFares = [];
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      const ruleContainerId = this.fareCategoryList.length
        ? this.fareCategoryList[0].ruleContainerId
        : null;

      this.selectedFares.map(v =>
        this.fareCategoryList.push({
          id: null,
          ruleContainerId,
          fareCategory: v,
          exclude: this.exclude,
          isDeleted: false
        })
      );

      this.selectedFares = [];
    },
    async deleteTag(tag) {
      try {
        const idx = this.fareCategoryList.indexOf(tag);
        this.fareCategoryList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_FARE_CATEGORY_LIST,
            variables: {
              parentId: this.parentId,
              fareCategoryList: this.fareCategoryList
            },
            refetchQueries: () => [
              {
                query: GET_FARE_CATEGORY_LIST,
                variables: { parentId: this.parentId }
              }
            ]
          })
          .then(() => {
            const rulesRemaining = this.fareCategoryList.some(
              rule => !rule.isDeleted
            );
            if (!this.fareCategoryList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'FareCategory');
            }
          });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    getTagString(rule) {
      if (!this.fareCategoryList.length || !this.fareCategoryUnitList.length) {
        return;
      } else {
        const unit = this.fareCategoryUnitList.filter(
          unit => unit.id === rule.fareCategory
        )[0];

        return `${unit.name}`;
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
