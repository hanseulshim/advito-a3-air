<template>
  <div class="rule-container">
    <p class="rule-title">Corporate Fare Basis</p>
    <i v-if="!editMode" class="fas fa-pencil-alt edit-rule" @click="saveRules"/>
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <el-select
        v-model="basisType"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        value-key="name"
      >
        <el-option
          v-for="item in fareBasisUnitList"
          :key="item.id"
          :label="item.name"
          :value="item"
        ></el-option>
      </el-select>
      <el-input v-model="value" size="mini" class="number-input" clearable/>
      <label v-if="basisType && basisType.id === 86 ||  basisType && basisType.id === 87">Position:</label>
      <el-input-number
        v-if="basisType && basisType.id === 86 || basisType && basisType.id === 87"
        v-model="position"
        size="mini"
        class="number-input"
        :min="0"
        clearable
      />
      <label for="exclude">Exclude:</label>
      <el-checkbox v-model="exclude" name="exclude"/>
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
      >{{ getTagString(rule) }}</el-tag>
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
      >{{ getTagString(rule) }}</el-tag>
    </div>
  </div>
</template>
<script>
import { removeTypename } from "@/helper";
import {
  GET_FARE_BASIS_LIST,
  GET_FARE_BASIS_UNIT_LIST
} from "@/graphql/queries";
import { UPDATE_FARE_BASIS_LIST } from "@/graphql/mutations";
import { PRICING_TERM_LOOKUP } from "@/graphql/constants";
export default {
  name: "CorporateFareBasis",
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
    fareBasisUnitList: {
      query: GET_FARE_BASIS_UNIT_LIST
    },
    fareBasisList: {
      query: GET_FARE_BASIS_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { fareBasisList } }) {
        return removeTypename(fareBasisList);
      }
    }
  },
  data() {
    return {
      fareBasisList: [],
      fareBasisUnitList: [],
      basisType: null,
      exclude: false,
      editMode: true,
      value: "",
      position: null
    };
  },
  computed: {
    excludedRules() {
      return this.fareBasisList.filter(
        rule =>
          rule.matchExclude ||
          rule.endsWithExclude ||
          rule.startsWithExclude ||
          rule.containsExclude ||
          rule.containsMultipleExclude
      );
    },
    includedRules() {
      return this.fareBasisList.filter(
        rule =>
          !rule.matchExclude &&
          !rule.endsWithExclude &&
          !rule.startsWithExclude &&
          !rule.containsExclude &&
          !rule.containsMultipleExclude
      );
    }
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.fareBasisList.length) {
        this.$emit("delete-rule", "CorporateFareBasis");
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_FARE_BASIS_LIST,
          variables: {
            parentId: this.parentId,
            fareBasisList: this.fareBasisList,
            fareBasisType: PRICING_TERM_LOOKUP.CORPORATE_FARE_BASIS_TYPE
          },
          refetchQueries: () => [
            {
              query: GET_FARE_BASIS_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.basisType = null;
      this.value = "";
      this.position = null;
    },
    createTag() {
      const ruleContainerId = this.fareBasisList.length
        ? this.fareBasisList[0].ruleContainerId
        : null;

      if (this.basisType.id === 83) {
        this.fareBasisList.push({
          id: null,
          ruleContainerId,
          name: this.basisType.name,
          type: PRICING_TERM_LOOKUP.CORPORATE_FARE_BASIS_TYPE,
          basisType: this.basisType.id,
          matchExclude: this.exclude,
          matchValue: this.value,
          endsWithExclude: null,
          endsWithValue: null,
          startsWithExclude: null,
          startsWithValue: null,
          containsExclude: null,
          containsValue: null,
          containsPosition: null,
          containsMultipleExclude: null,
          containsMultipleValue: null,
          containsMultiplePosition: null,
          isDeleted: false
        });
      }

      if (this.basisType.id === 84) {
        this.fareBasisList.push({
          id: null,
          ruleContainerId,
          name: this.basisType.name,
          type: PRICING_TERM_LOOKUP.CORPORATE_FARE_BASIS_TYPE,
          basisType: this.basisType.id,
          matchExclude: null,
          matchValue: null,
          endsWithExclude: null,
          endsWithValue: null,
          startsWithExclude: this.exclude,
          startsWithValue: this.value,
          containsExclude: null,
          containsValue: null,
          containsPosition: null,
          containsMultipleExclude: null,
          containsMultipleValue: null,
          containsMultiplePosition: null,
          isDeleted: false
        });
      }

      if (this.basisType.id === 85) {
        this.fareBasisList.push({
          id: null,
          ruleContainerId,
          name: this.basisType.name,
          type: PRICING_TERM_LOOKUP.CORPORATE_FARE_BASIS_TYPE,
          basisType: this.basisType.id,
          matchExclude: null,
          matchValue: null,
          endsWithExclude: this.exclude,
          endsWithValue: this.value,
          startsWithExclude: null,
          startsWithValue: null,
          containsExclude: null,
          containsValue: null,
          containsPosition: null,
          containsMultipleExclude: null,
          containsMultipleValue: null,
          containsMultiplePosition: null,
          isDeleted: false
        });
      }

      if (this.basisType.id === 86) {
        this.fareBasisList.push({
          id: null,
          ruleContainerId,
          name: this.basisType.name,
          type: PRICING_TERM_LOOKUP.CORPORATE_FARE_BASIS_TYPE,
          basisType: this.basisType.id,
          matchExclude: null,
          matchValue: null,
          endsWithExclude: null,
          endsWithValue: null,
          startsWithExclude: null,
          startsWithValue: null,
          containsExclude: this.exclude,
          containsValue: this.value,
          containsPosition: this.position,
          containsMultipleExclude: null,
          containsMultipleValue: null,
          containsMultiplePosition: null,
          isDeleted: false
        });
      }

      if (this.basisType.id === 87) {
        this.fareBasisList.push({
          id: null,
          ruleContainerId,
          name: this.basisType.name,
          type: PRICING_TERM_LOOKUP.CORPORATE_FARE_BASIS_TYPE,
          basisType: this.basisType.id,
          matchExclude: null,
          matchValue: null,
          endsWithExclude: null,
          endsWithValue: null,
          startsWithExclude: null,
          startsWithValue: null,
          containsExclude: null,
          containsValue: null,
          containsPosition: null,
          containsMultipleExclude: this.exclude,
          containsMultipleValue: this.value,
          containsMultiplePosition: this.position,
          isDeleted: false
        });
      }

      this.basisType = null;
      this.value = "";
      this.position = null;
    },
    async deleteTag(tag) {
      const idx = this.fareBasisList.indexOf(tag);
      this.fareBasisList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_FARE_BASIS_LIST,
          variables: {
            parentId: this.parentId,
            fareBasisList: this.fareBasisList,
            fareBasisType: PRICING_TERM_LOOKUP.CORPORATE_FARE_BASIS_TYPE
          },
          refetchQueries: () => [
            {
              query: GET_FARE_BASIS_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.fareBasisList.some(
            rule => !rule.isDeleted
          );
          if (!this.fareBasisList.length || !rulesRemaining) {
            this.$emit("delete-rule", "CorporateFareBasis");
          }
        });
    },
    getTagString(rule) {
      if (!this.fareBasisList.length || !this.fareBasisUnitList.length) {
        return;
      } else {
        const propName = Object.keys(rule).filter(
          key => key.includes("Value") && rule[key] !== null
        );

        const value = rule[propName];

        return `${rule.name} ${value} ${
          rule.basisType === 86 || rule.basisType === 87
            ? ` at position ${rule.containsPosition ||
                rule.containsMultiplePosition}`
            : ""
        }`;
      }
    }
  }
};
</script>
<style lang="scss">
@import "./ruleStyles.scss";
</style>
