<template>
  <div class="rule-container">
    <p class="rule-title">Market</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="toggleEditMode"
    />
    <button v-if="editMode" class="save-rule" @click="toggleEditMode">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <label>Origin: </label>
      <el-select
        v-model="origin"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="country in countries"
          :key="country.index"
          :label="country.name"
          :value="country.code"
        ></el-option>
      </el-select>
      <label>Destination: </label>
      <el-select
        v-model="destination"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="country in countries"
          :key="country.index"
          :label="country.name"
          :value="country.code"
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
        >{{ `${rule.origin} - ${rule.destination}` }}</el-tag
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
        >{{ `${rule.origin} - ${rule.destination}` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { countries } from './helper';
export default {
  name: 'Market',
  apollo: {},
  data() {
    return {
      countries,
      exclude: false,
      editMode: true,
      origin: '',
      destination: '',
      rules: []
    };
  },
  computed: {
    excludedRules() {
      return this.rules.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.rules.filter(rule => !rule.exclude);
    }
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'Market');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.rules.push({
        origin: this.origin,
        destination: this.destination,
        exclude: this.exclude
      });

      this.origin = '';
      this.destination = '';
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'Market');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
