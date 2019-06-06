<template>
  <div class="rule-container">
    <p class="rule-title">Point of Origin</p>
    <i class="fas fa-pencil-alt edit-rule" @click="toggleEditMode" v-if="!editMode"/>
    <button class="button save-rule" @click="toggleEditMode" v-if="editMode">Save</button>
    <div class="control-row" v-if="editMode">
      <el-select v-model="selectedCountry" filterable placeholder="Select" size="mini" clearable>
        <el-option v-for="item in countries" :key="item.value" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <button class="button" @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        type="info"
        v-for="rule in rules"
        v-bind:key="rule.index"
        size="small"
        closable
        @close="deleteTag(rule)"
      >{{rule.code}}</el-tag>
    </div>
  </div>
</template>
<script>
import { countries } from "./helper";
export default {
  name: "PointOfOrigin",
  apollo: {},
  data() {
    return {
      countries: countries,
      editMode: false,
      selectedCountry: "",
      rules: [
        {
          name: "Great Britain",
          code: "GB",
          id: 5
        },
        {
          name: "United States",
          code: "USA",
          id: 6
        }
      ]
    };
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    createTag() {
      const matched = this.countries.filter(
        country => country.id === this.selectedCountry
      )[0];

      this.rules.push({
        name: matched.name,
        code: matched.code
      });

      this.selectedCountry = "";
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
    }
  }
};
</script>
<style lang='scss'>
@import "./ruleStyles.scss";
</style>