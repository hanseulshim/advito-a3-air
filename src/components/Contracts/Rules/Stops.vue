<template>
  <div class="rule-container">
    <p class="rule-title">Stops</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <label>Min:</label>
      <el-inputNumber
        v-model="minStops"
        size="mini"
        :min="0"
        class="number-input"
        clearable
      />
      <label>Max:</label>
      <el-inputNumber
        v-model="maxStops"
        size="mini"
        :min="0"
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
      >
        {{
          ` ${rule.minStops !== null ? rule.minStops : '0'} - ${rule.maxStops}`
        }}
      </el-tag>
    </div>
  </div>
</template>
<script>
import { removeTypename } from '@/helper';
import { GET_STOPS_LIST, GET_DISCOUNT } from '@/graphql/queries';
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
      try {
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
        this.min = null;
        this.max = null;
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
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

      this.minStops = null;
      this.maxStops = null;
    },
    async deleteTag(tag) {
      try {
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
