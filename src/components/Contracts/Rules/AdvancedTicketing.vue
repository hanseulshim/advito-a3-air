<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Advance Ticketing</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <label>Within:</label>
      <el-input
        v-model="endRange"
        type="number"
        size="mini"
        :min="0"
        class="number-input"
        clearable
      />
      <label>Unit:</label>
      <el-select
        v-model="selectedUnit"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        disabled
      >
        <el-option
          v-for="unit in units"
          :key="unit.label"
          :label="unit.label"
          :value="unit.value"
        ></el-option>
      </el-select>
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in advancedTicketingList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ `Within ${rule.endRange} Days` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { TIME_UNIT_LOOKUP } from '@/graphql/constants';
import { removeTypename } from '@/helper';
import { GET_ADVANCED_TICKETING_LIST, GET_DISCOUNT } from '@/graphql/queries';
import { UPDATE_ADVANCED_TICKETING_LIST } from '@/graphql/mutations';
export default {
  name: 'AdvanceTicketing',
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
    advancedTicketingList: {
      query: GET_ADVANCED_TICKETING_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { advancedTicketingList } }) {
        return removeTypename(advancedTicketingList);
      }
    }
  },
  data() {
    return {
      units: [
        { label: 'Hours', value: TIME_UNIT_LOOKUP.HOURS },
        { label: 'Days', value: TIME_UNIT_LOOKUP.DAYS },
        { label: 'Months', value: TIME_UNIT_LOOKUP.MONTHS }
      ],
      selectedUnit: TIME_UNIT_LOOKUP.DAYS,
      editMode: false,
      startRange: 0,
      endRange: null,
      advancedTicketingList: []
    };
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.advancedTicketingList.length) {
          this.$emit('delete-rule', 'AdvanceTicketing');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_ADVANCED_TICKETING_LIST,
            variables: {
              parentId: this.parentId,
              advancedTicketingList: this.advancedTicketingList
            },
            refetchQueries: () => [
              {
                query: GET_ADVANCED_TICKETING_LIST,
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
        this.endRange = null;
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      if (!this.endRange) {
        this.$modal.show('error', {
          message: 'Error: Please enter a valid timeframe'
        });
      } else if (
        this.advancedTicketingList.some(
          rule => rule.endRange === parseInt(this.endRange)
        )
      ) {
        this.$modal.show('error', {
          message: 'Error: Duplicate range value'
        });
      } else {
        const ruleContainerId = this.advancedTicketingList.length
          ? this.advancedTicketingList[0].ruleContainerId
          : null;

        this.advancedTicketingList.push({
          id: null,
          ruleContainerId,
          startRange: this.startRange,
          endRange: parseInt(this.endRange),
          unit: this.selectedUnit,
          isDeleted: false
        });

        this.endRange = null;
      }
    },
    async deleteTag(tag) {
      try {
        const idx = this.advancedTicketingList.indexOf(tag);
        this.advancedTicketingList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_ADVANCED_TICKETING_LIST,
            variables: {
              parentId: this.parentId,
              advancedTicketingList: this.advancedTicketingList
            },
            refetchQueries: () => [
              {
                query: GET_ADVANCED_TICKETING_LIST,
                variables: { parentId: this.parentId }
              }
            ]
          })
          .then(() => {
            const rulesRemaining = this.advancedTicketingList.some(
              rule => !rule.isDeleted
            );
            if (!this.advancedTicketingList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'AdvanceTicketing');
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
