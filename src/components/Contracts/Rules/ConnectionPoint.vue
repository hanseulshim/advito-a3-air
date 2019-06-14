<template>
  <div class="rule-container">
    <p class="rule-title">Connection Point</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="toggleEditMode"
    />
    <button v-if="editMode" class="save-rule" @click="toggleEditMode">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <el-input
        v-model="connection"
        size="mini"
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
        >{{ ` ${rule.connection} ` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConnectionPoint',
  apollo: {},
  data() {
    return {
      editMode: true,
      connection: '',
      rules: []
    };
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'ConnectionPoint');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.rules.push({
        connection: this.connection
      });

      this.connection = '';
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'ConnectionPoint');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
