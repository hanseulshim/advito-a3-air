<template>
  <div class="rule-container">
    <p class="rule-title">Max Stay</p>
    <i v-if="!editMode" class="fas fa-pencil-alt edit-rule" @click="saveRules"/>
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <label>Value:</label>
      <el-input-number v-model="value" size="mini" class="number-input" :min="0" clearable/>
      <label>Unit:</label>
      <el-select v-model="unit" filterable placeholder="Select" size="mini" clearable>
        <el-option
          v-for="dayUnit in dayUnitList"
          :key="dayUnit.name"
          :label="dayUnit.name"
          :value="dayUnit.id"
        ></el-option>
      </el-select>
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in maxStayList"
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
import { GET_MAX_STAY_LIST, GET_DAY_UNIT_LIST } from "@/graphql/queries";
import { UPDATE_MAX_STAY_LIST } from "@/graphql/mutations";
export default {
  name: "MaxStay",
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
    maxStayList: {
      query: GET_MAX_STAY_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { maxStayList } }) {
        return removeTypename(maxStayList);
      }
    },
    dayUnitList: {
      query: GET_DAY_UNIT_LIST
    }
  },
  data() {
    return {
      maxStayList: [],
      dayUnitList: [],
      value: null,
      unit: null,
      dayOfWeekInclusion: null,
      editMode: false
    };
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.maxStayList.length) {
        this.$emit("delete-rule", "MaxStay");
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_MAX_STAY_LIST,
          variables: {
            parentId: this.parentId,
            maxStayList: this.maxStayList
          },
          refetchQueries: () => [
            {
              query: GET_MAX_STAY_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.value = null;
      this.unit = null;
    },
    createTag() {
      const ruleContainerId = this.maxStayList.length
        ? this.maxStayList[0].ruleContainerId
        : null;

      this.maxStayList.push({
        id: null,
        ruleContainerId,
        unit: this.unit,
        value: this.value,
        isDeleted: false
      });

      this.value = null;
      this.unit = null;
    },
    async deleteTag(tag) {
      const idx = this.maxStayList.indexOf(tag);
      this.maxStayList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_MAX_STAY_LIST,
          variables: {
            parentId: this.parentId,
            maxStayList: this.maxStayList
          },
          refetchQueries: () => [
            {
              query: GET_MAX_STAY_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.maxStayList.some(rule => !rule.isDeleted);
          if (!this.maxStayList.length || !rulesRemaining) {
            this.$emit("delete-rule", "MaxStay");
          }
        });
    },
    getTagString(rule) {
      if (!this.maxStayList.length || !this.dayUnitList.length) {
        return;
      } else {
        const unit = this.dayUnitList.filter(unit => unit.id === rule.unit)[0];
        return `${rule.value} ${unit.name}`;
      }
    }
  }
};
</script>
<style lang="scss">
@import "./ruleStyles.scss";
</style>
