<template>
  <div class="rule-container">
    <p class="rule-title">Market</p>
    <i v-if="!editMode" class="fas fa-pencil-alt edit-rule" @click="saveRules"/>
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <label>Origin:</label>
      <el-select
        v-model="origin"
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
      <label>Destination:</label>
      <el-select
        v-model="arrival"
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
      <label>Exclude:</label>
      <el-checkbox v-model="exclude" name="exclude"/>
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
      >{{ `${rule.origin} - ${rule.arrival}` }}</el-tag>
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
      >{{ `${rule.origin} - ${rule.arrival}` }}</el-tag>
    </div>
  </div>
</template>
<script>
import { removeTypename } from "@/helper";
import { GET_GEO_LIST, GET_MARKET_RULE_LIST } from "@/graphql/queries";
import { UPDATE_MARKET } from "@/graphql/mutations";
export default {
  name: "Market",
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
      query: GET_GEO_LIST
    },
    marketList: {
      query: GET_MARKET_RULE_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { marketList } }) {
        return removeTypename(marketList);
      }
    }
  },
  data() {
    return {
      geographyRuleList: [],
      exclude: false,
      editMode: false,
      origin: {},
      arrival: {},
      marketList: []
    };
  },
  computed: {
    excludedRules() {
      return this.marketList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.marketList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.marketList.length) {
        this.$emit("delete-rule", "Market");
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_MARKET,
          variables: {
            parentId: this.parentId,
            marketList: this.marketList
          },
          refetchQueries: () => [
            {
              query: GET_MARKET_RULE_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.origin = {};
      this.arrival = {};
    },
    createTag() {
      const ruleContainerId = this.marketList.length
        ? this.marketList[0].ruleContainerId
        : null;

      this.marketList.push({
        id: null,
        ruleContainerId,
        origin: this.origin.name,
        originType: this.origin.locationType,
        arrival: this.arrival.name,
        arrivalType: this.arrival.locationType,
        exclude: this.exclude,
        isDeleted: false
      });

      this.selectedCountry = [];
      this.origin = {};
      this.arrival = {};
    },
    async deleteTag(tag) {
      const idx = this.marketList.indexOf(tag);
      this.marketList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_MARKET,
          variables: {
            parentId: this.parentId,
            marketList: this.marketList
          },
          refetchQueries: () => [
            {
              query: GET_MARKET_RULE_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.marketList.some(rule => !rule.isDeleted);
          if (!this.marketList.length || !rulesRemaining) {
            this.$emit("delete-rule", "Market");
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "./ruleStyles.scss";
</style>
