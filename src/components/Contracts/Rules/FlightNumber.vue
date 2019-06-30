<template>
  <div class="rule-container">
    <p class="rule-title">Flight Number: Main Segment</p>
    <i v-if="!editMode" class="fas fa-pencil-alt edit-rule" @click="saveRules"/>
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <el-select
        v-model="selectedAirline"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="airline in airlineCodeList"
          :key="airline.code"
          :label="airline.name"
          :value="airline.code"
        ></el-option>
      </el-select>
      <label>Start:</label>
      <el-input-number v-model="startRange" size="mini" :min="0" class="number-input" clearable/>
      <label>End:</label>
      <el-input-number v-model="endRange" size="mini" :min="0" class="number-input" clearable/>
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
      >
        {{
        rule.carrierCode +
        ' ' +
        `${rule.startRange !== null ? rule.startRange : '0'} - ${
        rule.endRange
        }`
        }}
      </el-tag>
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
      >
        {{
        rule.carrierCode +
        ' ' +
        `${rule.startRange !== null ? rule.startRange : '0'} - ${
        rule.endRange
        }`
        }}
      </el-tag>
    </div>
  </div>
</template>
<script>
import { removeTypename } from "@/helper";
import {
  GET_AIRLINE_CODE_LIST,
  GET_FLIGHT_NUMBER_LIST
} from "@/graphql/queries";
import { UPDATE_FLIGHT_NUMBER_LIST } from "@/graphql/mutations";
import { PRICING_TERM_LOOKUP } from "@/graphql/constants";
export default {
  name: "FlightNumber",
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
    airlineCodeList: {
      query: GET_AIRLINE_CODE_LIST
    },
    flightNumberList: {
      query: GET_FLIGHT_NUMBER_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { flightNumberList } }) {
        return removeTypename(flightNumberList);
      }
    }
  },
  data() {
    return {
      airlineCodeList: [],
      flightNumberList: [],
      selectedAirline: [],
      startRange: null,
      endRange: null,
      segmentType: PRICING_TERM_LOOKUP.SEGMENT_TYPE,
      exclude: false,
      editMode: false
    };
  },
  computed: {
    excludedRules() {
      return this.flightNumberList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.flightNumberList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.flightNumberList.length) {
        this.$emit("delete-rule", "FlightNumber");
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_FLIGHT_NUMBER_LIST,
          variables: {
            parentId: this.parentId,
            flightNumberList: this.flightNumberList
          },
          refetchQueries: () => [
            {
              query: GET_FLIGHT_NUMBER_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.startRange = null;
      this.endRange = null;
      this.selectedAirline = [];
    },
    createTag() {
      const ruleContainerId = this.flightNumberList.length
        ? this.flightNumberList[0].ruleContainerId
        : null;

      this.selectedAirline.map(v => {
        this.flightNumberList.push({
          id: null,
          ruleContainerId,
          carrierCode: v,
          segmentType: this.segmentType,
          startRange: this.startRange,
          endRange: this.endRange,
          exclude: this.exclude,
          isDeleted: false
        });
      });

      this.startRange = null;
      this.endRange = null;
      this.selectedAirline = [];
    },
    async deleteTag(tag) {
      const idx = this.flightNumberList.indexOf(tag);
      this.flightNumberList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_FLIGHT_NUMBER_LIST,
          variables: {
            parentId: this.parentId,
            flightNumberList: this.flightNumberList
          },
          refetchQueries: () => [
            {
              query: GET_FLIGHT_NUMBER_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.flightNumberList.some(
            rule => !rule.isDeleted
          );
          if (!this.flightNumberList.length || !rulesRemaining) {
            this.$emit("delete-rule", "FlightNumber");
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "./ruleStyles.scss";
</style>
