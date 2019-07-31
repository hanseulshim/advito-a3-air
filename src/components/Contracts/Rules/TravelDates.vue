<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Travel Dates</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <el-date-picker
        v-model="startDate"
        type="date"
        size="mini"
        format="dd MMM yyyy"
        placeholder="Pick a day"
        class="date-picker"
      ></el-date-picker>
      <el-date-picker
        v-model="endDate"
        type="date"
        size="mini"
        format="dd MMM yyyy"
        placeholder="Pick a day"
        class="date-picker"
      ></el-date-picker>
      <button v-if="!updateRule" @click="createTag">Add</button>
      <button v-if="updateRule" @click="updateTag">Update</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in travelDateList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        @click="editTag(rule)"
      >
        {{ formatDate(rule.startDate) }} -
        {{ formatDate(rule.endDate) }}
      </el-tag>
    </div>
  </div>
</template>
<script>
import { formatDate, removeTypename } from '@/helper';
import {
  GET_TRAVEL_DATE_LIST,
  GET_DISCOUNT,
  GET_TARGET_TERM
} from '@/graphql/queries';
import { UPDATE_TRAVEL_DATES } from '@/graphql/mutations';
export default {
  name: 'TravelDates',
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
    }
  },
  apollo: {
    travelDateList: {
      query: GET_TRAVEL_DATE_LIST,
      fetchPolicy: 'network-only',
      variables() {
        return {
          parentId: this.parentId,
          parentType: this.parentType
        };
      },
      result({ data: { travelDateList } }) {
        return removeTypename(travelDateList);
      }
    }
  },
  data() {
    return {
      editMode: false,
      startDate: '',
      endDate: '',
      updateRule: null,
      travelDateList: []
    };
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.travelDateList.length) {
          this.$emit('delete-rule', 'TravelDates');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_TRAVEL_DATES,
            variables: {
              parentId: this.parentId,
              parentType: this.parentType,
              travelDateList: this.travelDateList
            },
            refetchQueries: () => [
              {
                query: GET_TRAVEL_DATE_LIST,
                variables: {
                  parentId: this.parentId,
                  parentType: this.parentType
                }
              },
              {
                query: this.parentType === 1 ? GET_DISCOUNT : GET_TARGET_TERM,
                variables: {
                  id: this.parentId
                }
              }
            ]
          });
        }
        this.editMode = !this.editMode;
        this.startDate = '';
        this.endDate = '';
        this.updateRule = null;
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      if (this.startDate && this.endDate) {
        const ruleContainerId = this.travelDateList.length
          ? this.travelDateList[0].ruleContainerId
          : null;

        this.travelDateList.push({
          id: null,
          ruleContainerId,
          startDate: new Date(this.startDate),
          endDate: new Date(this.endDate),
          isDeleted: false
        });
        this.startDate = '';
        this.endDate = '';
      } else {
        this.$modal.show('error', {
          message: 'Please enter both a start date and an end date'
        });
      }
    },
    async deleteTag(tag) {
      try {
        const idx = this.travelDateList.indexOf(tag);
        this.travelDateList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_TRAVEL_DATES,
            variables: {
              parentId: this.parentId,
              parentType: this.parentType,
              travelDateList: this.travelDateList
            },
            refetchQueries: () => [
              {
                query: GET_TRAVEL_DATE_LIST,
                variables: {
                  parentId: this.parentId,
                  parentType: this.parentType
                }
              }
            ]
          })
          .then(() => {
            const rulesRemaining = this.travelDateList.some(
              rule => !rule.isDeleted
            );
            if (!this.travelDateList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'TravelDates');
            }
          });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    editTag(rule) {
      if (this.editMode) {
        this.updateRule = rule;
        this.startDate = new Date(rule.startDate);
        this.endDate = new Date(rule.endDate);
      } else return;
    },
    updateTag() {
      const ruleIndex = this.travelDateList.indexOf(this.updateRule);
      this.travelDateList[ruleIndex].startDate = new Date(this.startDate);
      this.travelDateList[ruleIndex].endDate = new Date(this.endDate);
      this.updateRule = null;
      this.startDate = '';
      this.endDate = '';
    },
    formatDate(date) {
      return formatDate(date);
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
