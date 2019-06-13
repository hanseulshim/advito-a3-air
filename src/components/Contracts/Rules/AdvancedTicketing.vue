<template>
  <div class="rule-container">
    <p class="rule-title">Advanced Ticketing</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="toggleEditMode"
    />
    <button v-if="editMode" class="save-rule" @click="toggleEditMode">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <label>Within: </label>
      <el-input
        v-model="timeframe"
        size="mini"
        class="number-input"
        type="number"
        clearable
        min="0"
      />
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
        >{{ `Within ${rule.timeframe} ${rule.unit}` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdvancedTicketing',
  apollo: {},
  data() {
    return {
      units: ['Hours', 'Days', 'Months'],
      selectedUnit: '',
      editMode: true,
      timeframe: null,
      rules: []
    };
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'AdvancedTicketing');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.rules.push({
        timeframe: this.timeframe,
        unit: this.selectedUnit
      });

      this.timeframe = null;
      this.selectedUnit = '';
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'AdvancedTicketing');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
