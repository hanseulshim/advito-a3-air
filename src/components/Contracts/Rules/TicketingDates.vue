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
      >{{ rule.startDate }} - {{ rule.endDate }}</el-tag>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../../../helper";
import { GET_TICKETING_DATE_LIST } from "@/graphql/queries";
export default {
  name: "TicketingDates",
  props: {
    parentId: Number
  },
  apollo: {
    ticketingDateList: {
      query: GET_TICKETING_DATE_LIST,
      variables: {
        parentId: 34
      },
      result({ data: { ticketingDateList } }) {
        console.log(ticketingDateList);
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
      ticketingDateList: []
    };
  },
  computed: {
    //to handle any ticketingDateList that are "deleted" from UI
    filteredRuleList() {
      return this.ticketingDateList.filter(rule => !rule.isDeleted);
    }
    // ruleContainerId() {
    //   return this.ticketingDateList.length ? this.ticketingDateList[0].ruleContainerId : null;
    // }
  },
  methods: {
    toggleEditMode() {
      if (this.editMode && !this.filteredRuleList.length) {
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

      this.ticketingDateList.push({
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
      const idx = this.ticketingDateList.indexOf(tag);
      this.ticketingDateList[idx].isDeleted = true;

      if (!this.filteredRuleList.length) {
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
      const ruleIndex = this.ticketingDateList.indexOf(this.updateRule);
      this.ticketingDateList[ruleIndex].start = formatDate(this.startDate);
      this.ticketingDateList[ruleIndex].end = formatDate(this.endDate);
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
