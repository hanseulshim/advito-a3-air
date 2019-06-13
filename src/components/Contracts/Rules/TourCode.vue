<template>
  <div class="rule-container">
    <p class="rule-title">Tour Code</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="toggleEditMode"
    />
    <button v-if="editMode" class="save-rule" @click="toggleEditMode">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <el-input v-model="tourcode" size="mini" class="number-input" clearable />
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
        >{{ ` ${rule.tourcode}` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'TourCode',
  apollo: {},
  data() {
    return {
      editMode: true,
      tourcode: '',
      rules: []
    };
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'TourCode');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.rules.push({
        tourcode: this.tourcode
      });

      this.tourcode = '';
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'TourCode');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
