<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Min Stay</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <label>Value:</label>
      <el-input
        v-model="value"
        type="number"
        size="mini"
        class="number-input"
        :min="0"
        clearable
      />
      <label>Unit:</label>
      <el-select
        v-model="unit"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="dayUnit in dayUnitList"
          :key="dayUnit.name"
          :label="dayUnit.name"
          :value="dayUnit.id"
        ></el-option>
      </el-select>
      <label>Include Day of the week:</label>
      <el-select
        v-model="dayOfWeekInclusion"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="day in dayOfWeekUnitList"
          :key="day.id"
          :label="day.name"
          :value="day.id"
        ></el-option>
      </el-select>
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in minStayList"
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
  GET_MIN_STAY_LIST,
  GET_DAY_OF_WEEK_UNIT_LIST,
  GET_DAY_UNIT_LIST,
  GET_DISCOUNT
} from '@/graphql/queries';
import { UPDATE_MIN_STAY_LIST } from '@/graphql/mutations';
export default {
  name: 'MinStay',
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
    minStayList: {
      query: GET_MIN_STAY_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { minStayList } }) {
        return removeTypename(minStayList);
      }
    },
    dayOfWeekUnitList: {
      query: GET_DAY_OF_WEEK_UNIT_LIST
    },
    dayUnitList: {
      query: GET_DAY_UNIT_LIST
    }
  },
  data() {
    return {
      minStayList: [],
      dayUnitList: [],
      dayOfWeekUnitList: [],
      value: 0,
      unit: 70,
      dayOfWeekInclusion: null,
      editMode: false
    };
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.minStayList.length) {
          this.$emit('delete-rule', 'MinStay');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_MIN_STAY_LIST,
            variables: {
              parentId: this.parentId,
              minStayList: this.minStayList
            },
            refetchQueries: () => [
              {
                query: GET_MIN_STAY_LIST,
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
        this.value = null;
        this.dayOfWeekInclusion = null;
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      if (!this.value) {
        this.$modal.show('error', {
          message: 'Error: Please enter a value'
        });
      } else if (
        this.minStayList.some(
          rule =>
            rule.value === parseInt(this.value) &&
            rule.unit === this.unit &&
            rule.dayOfWeekInclusion === this.dayOfWeekInclusion
        )
      ) {
        this.$modal.show('error', {
          message: 'Error: Duplicate rule values'
        });
      } else {
        const ruleContainerId = this.minStayList.length
          ? this.minStayList[0].ruleContainerId
          : null;

        this.minStayList.push({
          id: null,
          ruleContainerId,
          unit: this.unit,
          value: parseInt(this.value),
          dayOfWeekInclusion: this.dayOfWeekInclusion,
          isDeleted: false
        });

        this.value = null;
        this.unit = 70;
        this.dayOfWeekInclusion = null;
      }
    },
    async deleteTag(tag) {
      try {
        const idx = this.minStayList.indexOf(tag);
        this.minStayList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_MIN_STAY_LIST,
            variables: {
              parentId: this.parentId,
              minStayList: this.minStayList
            },
            refetchQueries: () => [
              {
                query: GET_MIN_STAY_LIST,
                variables: { parentId: this.parentId }
              }
            ]
          })
          .then(() => {
            const rulesRemaining = this.minStayList.some(
              rule => !rule.isDeleted
            );
            if (!this.minStayList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'MinStay');
            }
          });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    getTagString(rule) {
      if (
        !this.minStayList.length ||
        !this.dayOfWeekUnitList.length ||
        !this.dayUnitList.length
      ) {
        return;
      } else {
        const unit = this.dayUnitList.filter(unit => unit.id === rule.unit)[0];
        const dayOfWeek = rule.dayOfWeekInclusion
          ? this.dayOfWeekUnitList.filter(
              day => day.id === rule.dayOfWeekInclusion
            )[0]
          : null;

        return `${rule.value} ${unit.name} ${
          !!rule.dayOfWeekInclusion && rule.dayOfWeekInclusion !== 'Undefined'
            ? `including ${dayOfWeek.name}`
            : ''
        }`;
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
