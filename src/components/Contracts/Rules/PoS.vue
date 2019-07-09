<template>
  <div class="rule-container">
    <p class="rule-title">Point of Sale</p>
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
        v-for="rule in pointOfSaleList"
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
import { GET_GEO_LIST, GET_POINT_OF_SALE_LIST } from "@/graphql/queries";
import { UPDATE_POINT_OF_SALE } from "@/graphql/mutations";
export default {
  name: "PointOfSale",
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
    pointOfSaleList: {
      query: GET_POINT_OF_SALE_LIST,
      variables() {
        return {
          parentId: this.parentId,
          parentType: this.parentType
        };
      },
      result({ data: { pointOfSaleList } }) {
        return removeTypename(pointOfSaleList);
      }
    }
  },
  data() {
    return {
      geographyRuleList: [],
      editMode: false,
      selectedCountry: [],
      pointOfSaleList: []
    };
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.pointOfSaleList.length) {
        this.$emit("delete-rule", "PointOfSale");
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_POINT_OF_SALE,
          variables: {
            parentId: this.parentId,
            parentType: this.parentType,
            pointOfSaleList: this.pointOfSaleList
          },
          refetchQueries: () => [
            {
              query: GET_POINT_OF_SALE_LIST,
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
      const ruleContainerId = this.pointOfSaleList.length
        ? this.pointOfSaleList[0].ruleContainerId
        : null;

      this.selectedCountry.map(country => {
        this.pointOfSaleList.push({
          id: null,
          countryCode: country,
          ruleContainerId,
          isDeleted: false
        });
      });

      this.selectedCountry = [];
    },
    async deleteTag(tag) {
      const idx = this.pointOfSaleList.indexOf(tag);
      this.pointOfSaleList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_POINT_OF_SALE,
          variables: {
            parentId: this.parentId,
            pointOfSaleList: this.pointOfSaleList,
            parentType: this.parentType
          },
          refetchQueries: () => [
            {
              query: GET_POINT_OF_SALE_LIST,
              variables: {
                parentId: this.parentId,
                parentType: this.parentType
              }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.pointOfSaleList.some(
            rule => !rule.isDeleted
          );
          if (!this.pointOfSaleList.length || !rulesRemaining) {
            this.$emit("delete-rule", "PointOfSale");
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "./ruleStyles.scss";
</style>
