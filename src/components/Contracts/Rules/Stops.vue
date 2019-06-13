<template>
  <div class="rule-container">
    <p class="rule-title">Stops</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="toggleEditMode"
    />
    <button v-if="editMode" class="save-rule" @click="toggleEditMode">
      Save
    </button>
    <div v-if="editMode" class="control-row">
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
        >{{ ` ${rule.min !== null ? rule.min : '0'} - ${rule.max}` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'Stops',
  apollo: {},
  data() {
    return {
      editMode: true,
      min: null,
      max: null,
      rules: []
    };
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'Stops');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.rules.push({
        min: this.min,
        max: this.max
      });

      this.min = '';
      this.max = '';
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'Stops');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
