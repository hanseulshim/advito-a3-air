<template>
  <div class="rule-container">
    <p class="rule-title">Cabin</p>
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
        v-model="selectedCabins"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="cabin in cabinsInDropdown"
          :key="cabin"
          :label="cabin"
          :value="cabin"
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
  name: 'Cabin',
  apollo: {},
  data() {
    return {
      cabins: [
        'Cabin C',
        'Cabin D',
        'Cabin F',
        'Cabin L',
        'Cabin P',
        'Cabin Y'
      ],
      editMode: true,
      selectedCabins: [],
      rules: []
    };
  },
  computed: {
    cabinsInDropdown() {
      return this.cabins.filter(cabin => !this.rules.includes(cabin));
    }
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'Cabin');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.selectedCabins.map(v => {
        const repeat = this.rules.includes(v);

        if (repeat) {
          return;
        } else {
          this.rules.push(v);
        }
      });

      this.selectedCabins = [];
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'Cabin');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
