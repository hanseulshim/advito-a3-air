<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Connection Point</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <label>Connection:</label>
      <el-select
        v-model="connection"
        filterable
        clearable
        remote
        size="mini"
        reserve-keyword
        placeholder="Please enter a keyword"
        :remote-method="filterGeoList"
        :loading="loading"
        value-key="name"
        @change="clearGeo()"
        @clear="clearGeo()"
        @blur="clearGeo()"
      >
        <el-option
          v-for="country in filteredGeoList"
          :key="country.index"
          :label="country.name"
          :value="country"
        ></el-option>
      </el-select>
      <label>Exclude:</label>
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
import { removeTypename, filterGeography } from '@/helper';
import {
  GET_GEOGRAPHY_LIST,
  GET_CONNECTION_POINT_LIST,
  GET_DISCOUNT
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
    geographyList: {
      query: GET_GEOGRAPHY_LIST
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
      connectionPointList: [],
      options: [],
      loading: false
    };
  },
  computed: {
    excludedRules() {
      return this.connectionPointList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.connectionPointList.filter(rule => !rule.exclude);
    },
    filteredGeoList() {
      return this.options.filter(
        geo =>
          !this.connectionPointList.some(rule => rule.connection === geo.name)
      );
    }
  },
  methods: {
    async saveRules() {
      try {
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
        this.connection = {};
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      if (
        this.connectionPointList.some(
          rule =>
            rule.connection === this.connection.name &&
            rule.connectionGeoType === this.connection.locationType
        )
      ) {
        this.$modal.show('error', {
          message: 'Error: Duplicate rule'
        });
      } else if (!this.connection.name) {
        this.$modal.show('error', {
          message: 'Error: Connection Point selection is required.'
        });
      } else {
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
      }
    },
    async deleteTag(tag) {
      try {
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
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    filterGeoList(query) {
      if (query !== '') {
        this.loading = true;
        this.options = this.geographyList.filter(item => {
          return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
        this.loading = false;
      } else {
        this.options = [];
      }
    },
    clearGeo() {
      this.options = [];
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
