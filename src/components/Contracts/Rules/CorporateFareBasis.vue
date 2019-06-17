<template>
  <div class="rule-container">
    <p class="rule-title">Corporate Fare Basis</p>
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
        v-model="selectedBasis"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="item in basis"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <el-input
        v-model="input"
        size="mini"
        class="number-input"
        min="0"
        clearable
      />
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
        >{{ `${rule.basis} ${rule.input}` }}</el-tag
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
        >{{ `${rule.basis} ${rule.input}` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'CorporateFareBasis',
  apollo: {},
  data() {
    return {
      basis: [
        'Matches',
        'Starts With',
        'Ends With',
        'Contains Any',
        'Contains All'
      ],
      selectedBasis: '',
      exclude: false,
      editMode: true,
      input: '',
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
        this.$emit('delete-rule', 'CorporateFareBasis');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.rules.push({
        basis: this.selectedBasis,
        input: this.input,
        exclude: this.exclude
      });

      this.selectedBasis = '';
      this.input = '';
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'CorporateFareBasis');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
