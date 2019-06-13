<template>
  <div class="rule-container">
    <p class="rule-title">Ticket Designator</p>
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
        v-model="TicketDesignator"
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
        >{{ ` ${rule.TicketDesignator}` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'TicketDesignator',
  apollo: {},
  data() {
    return {
      editMode: true,
      TicketDesignator: '',
      rules: []
    };
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit('delete-rule', 'TicketDesignator');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.rules.push({
        TicketDesignator: this.TicketDesignator
      });

      this.TicketDesignator = '';
    },
    deleteTag(tag) {
      this.rules.splice(this.rules.indexOf(tag), 1);
      if (!this.rules.length) {
        this.$emit('delete-rule', 'TicketDesignator');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
