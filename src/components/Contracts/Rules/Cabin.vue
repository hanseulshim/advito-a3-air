<template>
  <div class="rule-container">
    <p class="rule-title">Cabin</p>
    <i v-if="!editMode" class="fas fa-pencil-alt edit-rule" @click="saveRules"/>
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <el-select
        v-model="selectedCabins"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option v-for="cabin in cabinsInDropdown" :key="cabin" :label="cabin" :value="cabin"></el-option>
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
      >{{ rule.cabin }}</el-tag>
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
      >{{ rule.cabin }}</el-tag>
    </div>
  </div>
</template>
<script>
import { removeTypename } from "@/helper";
import { GET_CABIN_LIST } from "@/graphql/queries";
import { UPDATE_CABIN_LIST } from "@/graphql/mutations";
export default {
  name: "Cabin",
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
    cabinList: {
      query: GET_CABIN_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { cabinList } }) {
        return removeTypename(cabinList);
      }
    }
  },
  data() {
    return {
      cabins: [
        "Cabin C",
        "Cabin D",
        "Cabin F",
        "Cabin L",
        "Cabin P",
        "Cabin Y"
      ],
      selectedCabins: [],
      cabinList: [],
      exclude: false,
      editMode: true
    };
  },
  computed: {
    cabinsInDropdown() {
      return this.cabins.filter(
        cabin => !this.cabinList.some(v => v.cabin === cabin)
      );
    },
    excludedRules() {
      return this.cabinList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.cabinList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.cabinList.length) {
        this.$emit("delete-rule", "Cabin");
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_CABIN_LIST,
          variables: {
            parentId: this.parentId,
            cabinList: this.cabinList
          },
          refetchQueries: () => [
            {
              query: GET_CABIN_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.selectedCabins = [];
    },
    createTag() {
      const ruleContainerId = this.cabinList.length
        ? this.cabinList[0].ruleContainerId
        : null;

      this.selectedCabins.map(v =>
        this.cabinList.push({
          id: null,
          ruleContainerId,
          cabin: v,
          exclude: this.exclude,
          isDeleted: false
        })
      );

      this.selectedCabins = [];
    },
    async deleteTag(tag) {
      const idx = this.cabinList.indexOf(tag);
      this.cabinList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_CABIN_LIST,
          variables: {
            parentId: this.parentId,
            cabinList: this.cabinList
          },
          refetchQueries: () => [
            {
              query: GET_CABIN_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.cabinList.some(rule => !rule.isDeleted);
          if (!this.cabinList.length || !rulesRemaining) {
            this.$emit("delete-rule", "Cabin");
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "./ruleStyles.scss";
</style>
