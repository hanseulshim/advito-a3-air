<template>
  <div class="rule-container">
    <p class="rule-title">Connection Point</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <label>Connection: </label>
      <el-select
        v-model="connection"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        value-key="name"
      >
        <el-option
          v-for="country in geographyRuleList"
          :key="country.index"
          :label="country.name"
          :value="country"
        ></el-option>
      </el-select>
      <label> Exclude: </label>
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
        >{{ ` ${rule.connection} ` }}</el-tag
      >
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
        >{{ ` ${rule.connection} ` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { removeTypename } from '@/helper';
import {
  GET_GEO_RULE_LIST,
  GET_CONNECTION_POINT_LIST
} from '@/graphql/queries';
import { UPDATE_CONNECTION_POINT_LIST } from '@/graphql/mutations';
export default {
  name: 'ConnectionPoint',
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
    geographyRuleList: {
      query: GET_GEO_RULE_LIST
    },
    connectionPointList: {
      query: GET_CONNECTION_POINT_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { connectionPointList } }) {
        return removeTypename(connectionPointList);
      }
    }
  },
  data() {
    return {
      editMode: false,
      exclude: false,
      connection: {},
      connectionPointList: []
    };
  },
  computed: {
    excludedRules() {
      return this.connectionPointList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.connectionPointList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.connectionPointList.length) {
        this.$emit('delete-rule', 'ConnectionPoint');
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_CONNECTION_POINT_LIST,
          variables: {
            parentId: this.parentId,
            connectionPointList: this.connectionPointList
          },
          refetchQueries: () => [
            {
              query: GET_CONNECTION_POINT_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.connection = {};
    },
    createTag() {
      const ruleContainerId = this.connectionPointList.length
        ? this.connectionPointList[0].ruleContainerId
        : null;

      this.connectionPointList.push({
        id: null,
        ruleContainerId,
        connection: this.connection.name,
        connectionGeoType: this.connection.locationType,
        exclude: this.exclude,
        isDeleted: false
      });

      this.connection = {};
    },
    async deleteTag(tag) {
      const idx = this.connectionPointList.indexOf(tag);
      this.connectionPointList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_CONNECTION_POINT_LIST,
          variables: {
            parentId: this.parentId,
            connectionPointList: this.connectionPointList
          },
          refetchQueries: () => [
            {
              query: GET_CONNECTION_POINT_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.connectionPointList.some(
            rule => !rule.isDeleted
          );
          if (!this.connectionPointList.length || !rulesRemaining) {
            this.$emit('delete-rule', 'ConnectionPoint');
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
