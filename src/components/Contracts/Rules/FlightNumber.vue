<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Flight Number: Main Segment</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
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
          v-for="airline in filteredAirlineList"
          :key="airline.code"
          :label="airline.name"
          :value="airline.code"
        ></el-option>
      </el-select>
      <label>Start:</label>
      <el-input
        v-model="startRange"
        type="number"
        size="mini"
        :min="1"
        class="number-input"
        clearable
      />
      <label>End:</label>
      <el-input
        v-model="endRange"
        type="number"
        size="mini"
        :min="1"
        class="number-input"
        clearable
      />
      <label for="exclude">Exclude:</label>
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
import { removeTypename } from '@/helper';
import {
  GET_AIRLINE_LIST,
  GET_FLIGHT_NUMBER_LIST,
  GET_DISCOUNT
} from '@/graphql/queries';
import { UPDATE_FLIGHT_NUMBER_LIST } from '@/graphql/mutations';
import { PRICING_TERM_LOOKUP } from '@/graphql/constants';
export default {
  name: 'FlightNumber',
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
    airlineList: {
      query: GET_AIRLINE_LIST
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
      airlineList: [],
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
    },
    filteredAirlineList() {
      return this.airlineList.filter(
        airline =>
          !this.flightNumberList.some(rule => rule.carrierCode === airline.code)
      );
    }
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.flightNumberList.length) {
          this.$emit('delete-rule', 'FlightNumber');
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
        this.startRange = null;
        this.endRange = null;
        this.selectedAirline = [];
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      if (this.selectedAirline.length && this.startRange && this.endRange) {
        const ruleContainerId = this.flightNumberList.length
          ? this.flightNumberList[0].ruleContainerId
          : null;

        this.selectedAirline.map(v => {
          this.flightNumberList.push({
            id: null,
            ruleContainerId,
            carrierCode: v,
            segmentType: this.segmentType,
            startRange: parseInt(this.startRange),
            endRange: parseInt(this.endRange),
            exclude: this.exclude,
            isDeleted: false
          });
        });

        this.startRange = null;
        this.endRange = null;
        this.selectedAirline = [];
      } else {
        this.$modal.show('error', {
          message: 'Error: Airline, Start, & End are all required values'
        });
      }
    },
    async deleteTag(tag) {
      try {
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
              this.$emit('delete-rule', 'FlightNumber');
            }
          });
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
