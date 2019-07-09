<template>
  <div class="rule-container">
    <p class="rule-title">Point of Origin</p>
    <i v-if="!editMode" class="fas fa-pencil-alt edit-rule" @click="saveRules"/>
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <el-select
        v-model="selectedCountry"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="item in geographyRuleList"
          :key="item.name"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in pointOfOriginList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
      >{{ rule.countryCode }}</el-tag>
    </div>
  </div>
</template>
<script>
import { removeTypename } from "@/helper";
import {
  GET_GEO_LIST,
  GET_POINT_OF_ORIGIN_LIST,
  GET_DISCOUNT,
  GET_TARGET_TERM
} from "@/graphql/queries";
import { UPDATE_POINT_OF_ORIGIN } from "@/graphql/mutations";
export default {
  name: "PointOfOrigin",
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
    geographyRuleList: {
      query: GET_GEO_LIST
    },
    pointOfOriginList: {
      query: GET_POINT_OF_ORIGIN_LIST,
      variables() {
        return {
          parentId: this.parentId,
          parentType: this.parentType
        };
      },
      result({ data: { pointOfOriginList } }) {
        return removeTypename(pointOfOriginList);
      }
    }
  },
  data() {
    return {
      geographyRuleList: [],
      editMode: false,
      selectedCountry: [],
      pointOfOriginList: []
    };
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.pointOfOriginList.length) {
        this.$emit("delete-rule", "PointOfOrigin");
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_POINT_OF_ORIGIN,
          variables: {
            parentId: this.parentId,
            parentType: this.parentType,
            pointOfOriginList: this.pointOfOriginList
          },
          refetchQueries: () => [
            {
              query: GET_POINT_OF_ORIGIN_LIST,
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
    },
    createTag() {
      const ruleContainerId = this.pointOfOriginList.length
        ? this.pointOfOriginList[0].ruleContainerId
        : null;

      this.selectedCountry.map(country => {
        this.pointOfOriginList.push({
          id: null,
          countryCode: country,
          ruleContainerId,
          isDeleted: false
        });
      });

      this.selectedCountry = [];
    },
    async deleteTag(tag) {
      const idx = this.pointOfOriginList.indexOf(tag);
      this.pointOfOriginList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_POINT_OF_ORIGIN,
          variables: {
            parentId: this.parentId,
            pointOfOriginList: this.pointOfOriginList,
            parentType: this.parentType
          },
          refetchQueries: () => [
            {
              query: GET_POINT_OF_ORIGIN_LIST,
              variables: {
                parentId: this.parentId,
                parentType: this.parentType
              }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.pointOfOriginList.some(
            rule => !rule.isDeleted
          );
          if (!this.pointOfOriginList.length || !rulesRemaining) {
            this.$emit("delete-rule", "PointOfOrigin");
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "./ruleStyles.scss";
</style>
