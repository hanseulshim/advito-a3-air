<template>
  <div class="rule-container">
    <p class="rule-title">Point of Sale</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="toggleEditMode"
    />
    <button v-if="editMode" class="save-rule" @click="toggleEditMode">
      Save
    </button>
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
          v-for="item in countries"
          :key="item.value"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in rules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ rule.code }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { countries } from './helper';
export default {
  name: 'PointOfSale',
  apollo: {},
  data() {
    return {
      countries,
      editMode: false,
      selectedCountry: [],
      rules: []
    };
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'Market');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.selectedCountry.map(country => {
        let matched = this.countries.filter(v => v.name === country)[0];

        this.rules.push({
          name: matched.name,
          code: matched.code
        });
      });

      this.selectedCountry = [];
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'PointOfSale');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
