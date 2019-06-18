<template>
  <div class="rule-container">
    <p class="rule-title">Fare Category</p>
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
        v-model="selectedFares"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="fare in faresInDropdown"
          :key="fare"
          :label="fare"
          :value="fare"
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
        >{{ rule }}</el-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'FareCategory',
  apollo: {},
  data() {
    return {
      fares: [
        'Business Class',
        'First Class',
        'Highly Restricted Economy',
        'Premium Economy',
        'Restricted Economy',
        'Unrestricted Economy'
      ],
      editMode: true,
      selectedFares: [],
      rules: []
    };
  },
  computed: {
    faresInDropdown() {
      return this.fares.filter(fare => !this.rules.includes(fare));
    }
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'FareCategory');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.selectedFares.map(v => {
        const repeat = this.rules.includes(v);
        if (repeat) {
          return;
        } else {
          this.rules.push(v);
        }
      });

      this.selectedFares = [];
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'FareCategory');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
