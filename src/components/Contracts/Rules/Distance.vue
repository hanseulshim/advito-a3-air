<template>
  <div class="rule-container">
    <p class="rule-title">Distance</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="toggleEditMode"
    />
    <button v-if="editMode" class="save-rule" @click="toggleEditMode">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <label>Unit: </label>
      <el-select
        v-model="selectedUnit"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="unit in units"
          :key="unit"
          :label="unit"
          :value="unit"
        ></el-option>
      </el-select>
      <label>Min: </label>
      <el-input
        v-model="min"
        size="mini"
        min="0"
        type="number"
        class="number-input"
        clearable
      />
      <label>Max: </label>
      <el-input
        v-model="max"
        size="mini"
        min="0"
        type="number"
        class="number-input"
        clearable
      />
      <button v-if="!updateRule" @click="createTag">Add</button>
      <button v-if="updateRule" @click="updateTag">Update</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in rules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @click="editTag(rule)"
        @close="deleteTag(rule)"
        >{{
          ` ${rule.min !== null ? rule.min : '0'} - ${rule.max} ${rule.unit}`
        }}</el-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'Distance',
  apollo: {},
  data() {
    return {
      units: ['Km', 'Miles'],
      selectedUnit: '',
      editMode: true,
      min: null,
      max: null,
      updateRule: null,
      rules: []
    };
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'Distance');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.rules.push({
        min: this.min,
        max: this.max,
        unit: this.selectedUnit
      });

      this.min = '';
      this.max = '';
      this.selectedUnit = '';
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'Distance');
      }
    },
    editTag(rule) {
      if (this.editMode) {
        this.updateRule = rule;
        this.min = rule.min;
        this.max = rule.max;
        this.selectedUnit = rule.unit;
      } else return;
    },
    updateTag() {
      const ruleIndex = this.rules.indexOf(this.updateRule);
      this.rules[ruleIndex].min = this.min;
      this.rules[ruleIndex].max = this.max;
      this.rules[ruleIndex].unit = this.selectedUnit;
      this.updateRule = null;
      this.min = null;
      this.max = null;
      this.selectedUnit = null;
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
