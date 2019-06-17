<template>
  <div class="rule-container">
    <p class="rule-title">Published Booking Class</p>
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
        v-model="selectedClass"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="item in classes"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <label for="exclude"> Exclude: </label>
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
        >{{ rule.name }}</el-tag
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
        >{{ rule.name }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { classes } from './helper';
export default {
  name: 'PublishedBookingClass',
  apollo: {},
  data() {
    return {
      classes,
      exclude: false,
      editMode: true,
      selectedClass: [],
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
        this.$emit('delete-rule', 'PublishedBookingClass');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.selectedClass.map(v => {
        this.rules.push({
          name: v,
          exclude: this.exclude
        });
      });

      this.selectedClass = [];
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'PublishedBookingClass');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
