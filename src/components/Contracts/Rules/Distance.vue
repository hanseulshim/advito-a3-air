<template>
  <div class="rule-container">
    <p class="rule-title">Distance</p>
    <i v-if="!editMode" class="fas fa-pencil-alt edit-rule" @click="saveRules"/>
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <label>Unit:</label>
      <el-select v-model="distanceUnit" filterable placeholder="Select" size="mini" clearable>
        <el-option v-for="unit in units" :key="unit.label" :label="unit.label" :value="unit.value"></el-option>
      </el-select>
      <label>Min:</label>
      <el-input-number v-model="minDistance" size="mini" :min="0" class="number-input" clearable/>
      <label>Max:</label>
      <el-input-number v-model="maxDistance" size="mini" :min="0" class="number-input" clearable/>
      <button v-if="!updateRule" @click="createTag">Add</button>
      <button v-if="updateRule" @click="updateTag">Update</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in distanceList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @click="editTag(rule)"
        @close="deleteTag(rule)"
      >{{ getTagString(rule) }}</el-tag>
    </div>
  </div>
</template>
<script>
import { removeTypename } from "@/helper";
import { GET_DISTANCE_LIST, GET_DISCOUNT } from "@/graphql/queries";
import { UPDATE_DISTANCE_LIST } from "@/graphql/mutations";
import { PRICING_TERM_LOOKUP } from "@/graphql/constants";
export default {
  name: "Distance",
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
    distanceList: {
      query: GET_DISTANCE_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { distanceList } }) {
        return removeTypename(distanceList);
      }
    }
  },
  data() {
    return {
      units: [
        { label: "Miles", value: PRICING_TERM_LOOKUP.DISTANCE_UNIT_MILES },
        { label: "Km", value: PRICING_TERM_LOOKUP.DISTANCE_UNIT_KILOMETERS }
      ],
      distanceUnit: null,
      minDistance: null,
      maxDistance: null,
      updateRule: null,
      distanceList: [],
      editMode: false
    };
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.distanceList.length) {
        this.$emit("delete-rule", "Distance");
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_DISTANCE_LIST,
          variables: {
            parentId: this.parentId,
            distanceList: this.distanceList
          },
          refetchQueries: () => [
            {
              query: GET_DISTANCE_LIST,
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
      this.updateRule = null;
      this.minDistance = null;
      this.maxDistance = null;
      this.distanceUnit = null;
    },
    createTag() {
      const ruleContainerId = this.distanceList.length
        ? this.distanceList[0].ruleContainerId
        : null;

      this.distanceList.push({
        id: null,
        ruleContainerId,
        distanceUnit: this.distanceUnit,
        minDistance: this.minDistance,
        maxDistance: this.maxDistance,
        isDeleted: false
      });

      this.updateRule = null;
      this.minDistance = null;
      this.maxDistance = null;
      this.distanceUnit = null;
    },
    async deleteTag(tag) {
      const idx = this.distanceList.indexOf(tag);
      this.distanceList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_DISTANCE_LIST,
          variables: {
            parentId: this.parentId,
            distanceList: this.distanceList
          },
          refetchQueries: () => [
            {
              query: GET_DISTANCE_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.distanceList.some(
            rule => !rule.isDeleted
          );
          if (!this.distanceList.length || !rulesRemaining) {
            this.$emit("delete-rule", "Distance");
          }
        });
    },
    editTag(rule) {
      if (this.editMode) {
        this.updateRule = rule;
        this.minDistance = rule.minDistance;
        this.maxDistance = rule.maxDistance;
        this.distanceUnit = rule.distanceUnit;
      } else return;
    },
    updateTag() {
      const ruleIndex = this.distanceList.indexOf(this.updateRule);
      this.distanceList[ruleIndex].minDistance = this.minDistance;
      this.distanceList[ruleIndex].maxDistance = this.maxDistance;
      this.distanceList[ruleIndex].distanceUnit = this.distanceUnit;
      this.updateRule = null;
      this.minDistance = null;
      this.maxDistance = null;
      this.distanceUnit = null;
    },
    getTagString(rule) {
      if (!this.distanceList.length) {
        return;
      } else {
        const unit = this.units.filter(
          unit => unit.value === rule.distanceUnit
        )[0];
        return ` ${rule.minDistance !== null ? rule.minDistance : "0"} - ${
          rule.maxDistance
        } ${unit.label}`;
      }
    }
  }
};
</script>
<style lang="scss">
@import "./ruleStyles.scss";
</style>
