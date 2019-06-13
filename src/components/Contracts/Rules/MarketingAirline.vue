<template>
  <div class="rule-container">
    <p class="rule-title">Marketing Airline</p>
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
        v-model="selectedAirline"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="item in airlines"
          :key="item.code"
          :label="item.name"
          :value="item.code"
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
import { airlines } from './helper';
export default {
  name: 'MarketingAirline',
  apollo: {},
  data() {
    return {
      airlines,
      exclude: false,
      editMode: true,
      selectedAirline: [],
      rules: []
    };
  },
  computed: {
    excludedRules: function() {
      return this.rules.filter(rule => rule.exclude);
    },
    includedRules: function() {
      return this.rules.filter(rule => !rule.exclude);
    }
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'MarketingAirline');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.selectedAirline.map(v => {
        this.rules.push({
          name: v,
          exclude: this.exclude
        });
      });

      this.selectedAirline = [];
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'MarketingAirline');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
