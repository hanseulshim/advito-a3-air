<template>
  <div class="rule-container">
    <p class="rule-title">Stops</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <label>Min: </label>
      <el-input
        v-model="min"
        size="mini"
        min="0"
        type="number"
        class="number-input"
        clearable
      />
      <label>Max: </label>
      <el-input
        v-model="max"
        size="mini"
        min="0"
        type="number"
        class="number-input"
        clearable
      />
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in stopsList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{
          ` ${rule.minStops !== null ? rule.minStops : '0'} - ${rule.maxStops}`
        }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { removeTypename } from '@/helper';
import { GET_STOPS_LIST } from '@/graphql/queries';
import { UPDATE_STOPS_LIST } from '@/graphql/mutations';
export default {
  name: 'Stops',
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
    stopsList: {
      query: GET_STOPS_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { stopsList } }) {
        return removeTypename(stopsList);
      }
    }
  },
  data() {
    return {
      editMode: false,
      minStops: null,
      maxStops: null,
      stopsList: []
    };
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.stopsList.length) {
        this.$emit('delete-rule', 'Stops');
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_STOPS_LIST,
          variables: {
            parentId: this.parentId,
            stopsList: this.stopsList
          },
          refetchQueries: () => [
            {
              query: GET_STOPS_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.min = '';
      this.max = '';
    },
    createTag() {
      const ruleContainerId = this.stopsList.length
        ? this.stopsList[0].ruleContainerId
        : null;

      this.stopsList.push({
        id: null,
        ruleContainerId,
        minStops: this.minStops,
        maxStops: this.maxStops,
        isDeleted: false
      });

      this.minStops = '';
      this.maxStops = '';
    },
    async deleteTag(tag) {
      const idx = this.stopsList.indexOf(tag);
      this.stopsList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_STOPS_LIST,
          variables: {
            parentId: this.parentId,
            stopsList: this.stopsList
          },
          refetchQueries: () => [
            {
              query: GET_STOPS_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.stopsList.some(rule => !rule.isDeleted);
          if (!this.stopsList.length || !rulesRemaining) {
            this.$emit('delete-rule', 'Stops');
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
