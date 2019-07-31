<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Blackouts</p>
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
        format="dd MMM yyyy"
        size="mini"
        placeholder="Pick a day"
        class="date-picker"
      ></el-date-picker>
      <el-date-picker
        v-model="endDate"
        type="date"
        format="dd MMM yyyy"
        size="mini"
        placeholder="Pick a day"
        class="date-picker"
      ></el-date-picker>
      <button v-if="!updateRule" @click="createTag">Add</button>
      <button v-if="updateRule" @click="updateTag">Update</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in blackoutList"
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
import { GET_BLACKOUT_LIST, GET_DISCOUNT } from '@/graphql/queries';
import { UPDATE_BLACKOUT_LIST } from '@/graphql/mutations';

export default {
  name: 'Blackouts',
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
    blackoutList: {
      query: GET_BLACKOUT_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { blackoutList } }) {
        return removeTypename(blackoutList);
      }
    }
  },
  data() {
    return {
      editMode: false,
      startDate: '',
      endDate: '',
      updateRule: null,
      blackoutList: []
    };
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.blackoutList.length) {
          this.$emit('delete-rule', 'Blackouts');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_BLACKOUT_LIST,
            variables: {
              parentId: this.parentId,
              blackoutList: this.blackoutList
            },
            refetchQueries: () => [
              {
                query: GET_BLACKOUT_LIST,
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
      const ruleContainerId = this.blackoutList.length
        ? this.blackoutList[0].ruleContainerId
        : null;

      this.blackoutList.push({
        id: null,
        ruleContainerId,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        isDeleted: false
      });
      this.startDate = '';
      this.endDate = '';
    },
    async deleteTag(tag) {
      try {
        const idx = this.blackoutList.indexOf(tag);
        this.blackoutList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_BLACKOUT_LIST,
            variables: {
              parentId: this.parentId,
              blackoutList: this.blackoutList
            },
            refetchQueries: () => [
              {
                query: GET_BLACKOUT_LIST,
                variables: { parentId: this.parentId }
              }
            ]
          })
          .then(() => {
            const rulesRemaining = this.blackoutList.some(
              rule => !rule.isDeleted
            );
            if (!this.blackoutList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'Blackouts');
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
        this.startDate = new Date(rule.start);
        this.endDate = new Date(rule.end);
      } else return;
    },
    updateTag() {
      const ruleIndex = this.blackoutList.indexOf(this.updateRule);
      this.blackoutList[ruleIndex].start = formatDate(this.startDate);
      this.blackoutList[ruleIndex].end = formatDate(this.endDate);
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
