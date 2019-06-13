<template>
  <div class="rule-container">
    <p class="rule-title">Max Stay</p>
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
      <label>Value: </label>
      <el-input
        v-model="value"
        size="mini"
        class="number-input"
        type="number"
        min="0"
        clearable
      />
      <label>Include Day of the week: </label>
      <el-select
        v-model="selectedDay"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="day in days"
          :key="day"
          :label="day"
          :value="day"
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
        >{{
          `${rule.value} ${rule.unit} ${
            !!rule.selectedDay && rule.selectedDay !== 'Undefined'
              ? `including ${rule.selectedDay}`
              : ''
          } `
        }}}</el-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'MaxStay',
  apollo: {},
  data() {
    return {
      units: ['Hours', 'Days', 'Months'],
      days: [
        'Undefined',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      selectedUnit: '',
      selectedDay: 'Undefined',
      editMode: true,
      value: null,
      rules: []
    };
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'MaxStay');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.rules.push({
        value: this.value,
        unit: this.selectedUnit,
        selectedDay: this.selectedDay
      });

      this.value = null;
      this.selectedUnit = '';
      this.selectedDay = '';
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'MaxStay');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
