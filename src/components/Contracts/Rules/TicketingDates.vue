<template>
  <div class="rule-container">
    <p class="rule-title">Ticketing Dates</p>
    <i v-if="!editMode" class="fas fa-pencil-alt edit-rule" @click="toggleEditMode"/>
    <button v-if="editMode" class="save-rule" @click="toggleEditMode">Save</button>
    <div v-if="editMode" class="control-row">
      <el-date-picker
        v-model="startDate"
        type="date"
        size="mini"
        placeholder="Pick a day"
        class="date-picker"
        format="dd-MMM-yyyy"
      ></el-date-picker>
      <el-date-picker
        v-model="endDate"
        type="date"
        size="mini"
        placeholder="Pick a day"
        class="date-picker"
        format="dd-MMM-yyyy"
      ></el-date-picker>
      <button v-if="!updateRule" @click="createTag">Add</button>
      <button v-if="updateRule" @click="updateTag">Update</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in filteredRuleList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        @click="editTag(rule)"
      >{{ rule.start }} - {{ rule.end }}</el-tag>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../../../helper";
import { GET_TICKETING_DATE_LIST } from "@/graphql/queries";
export default {
  name: "TicketingDates",
  apollo: {
    rules: {
      query: GET_TICKETING_DATE_LIST,
      result({ data: { ticketingDateList } }) {
        ticketDateList.length
          ? this.$emit("create-rule", "TicketingDates")
          : [];
      }
    }
  },
  data() {
    return {
      editMode: true,
      ruleContainerId: "",
      startDate: "",
      endDate: "",
      updateRule: null,
      rules: []
    };
  },
  computed: {
    //to handle any rules that are "deleted" from UI
    filteredRuleList() {
      return this.rules.filter(rule => !rule.isDeleted);
    },
    ruleContainerId() {
      return this.rules.length ? this.rules[0].ruleContainerId : null;
    }
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.rules.length) {
        this.$emit("delete-rule", "TicketingDates");
      }
      this.editMode = !this.editMode;
      this.startDate = "";
      this.endDate = "";
      this.updateRule = null;
    },
    createTag() {
      const startDate = formatDate(this.startDate);
      const endDate = formatDate(this.endDate);

      this.rules.push({
        id: null,
        //this needs to be grabbed somewhere!
        ruleContainerId: null,
        startDate,
        endDate,
        isDeleted: false
      });
      this.startDate = "";
      this.endDate = "";
    },
    deleteTag(tag) {
      //dont delete from array anymore! just filter out any isDeleted with computed.
      const idx = this.rules.indexOf(tag);
      this.rules[idx].isDeleted = true;

      if (!this.rules.length) {
        this.$emit("delete-rule", "TicketingDates");
      }
    },
    editTag(rule) {
      if (this.editMode) {
        this.updateRule = rule;
        this.startDate = new Date(rule.start);
        this.endDate = new Date(rule.end);
      } else return;
    },
    updateTag() {
      const ruleIndex = this.rules.indexOf(this.updateRule);
      this.rules[ruleIndex].start = formatDate(this.startDate);
      this.rules[ruleIndex].end = formatDate(this.endDate);
      this.updateRule = null;
      this.startDate = "";
      this.endDate = "";
    }
  }
};
</script>
<style lang="scss">
@import "./ruleStyles.scss";
</style>
