<template>
  <modal
    classes="modal-container"
    name="rules"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">Discount : {{ discount.name }}</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <div class="rules-menu-container">
      <p class="rule-count">9 RULES</p>
      <el-select
        v-model="selectedRule"
        placeholder="Create New Rule"
        size="small"
      >
        <el-option
          v-for="rule in ruleList"
          :key="rule.id"
          :label="rule.title"
          :value="rule.type"
        ></el-option>
      </el-select>
    </div>
    <TicketingDates />
    <TravelDates />
  </modal>
</template>

<script>
import TicketingDates from '../../Rules/TicketingDates';
import TravelDates from '../../Rules/TravelDates';
export default {
  name: 'RulesModal',
  apollo: {},
  components: {
    TicketingDates,
    TravelDates
  },
  data() {
    return {
      discount: {
        name: ''
      },
      ruleTypes: [''],
      ruleList: [
        {
          id: 1,
          type: 'ticketingDates',
          title: 'Ticketing Dates',
          active: true
        },
        {
          id: 2,
          type: 'travelDates',
          title: 'Travel Dates',
          active: false
        }
      ],
      selectedRule: ''
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('rules');
    },
    validateForm() {
      // console.log('validated!');
    },
    beforeOpen(event) {
      this.discount = event.params.discount;
      //   this.discount.name = name;
    },
    beforeClose() {}
  }
};
</script>
<style lang="scss">
.rules-menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1em;

  .rule-count {
    flex: 2;
  }

  .el-select {
    flex: 1;
  }
}
</style>
