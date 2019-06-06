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
    <component
      :is="rule.type"
      v-for="rule in ruleList"
      :key="rule.id"
    ></component>
  </modal>
</template>

<script>
import TicketingDates from '../../Rules/TicketingDates';
import TravelDates from '../../Rules/TravelDates';
import PointOfSale from '../../Rules/PoS';
import PointOfOrigin from '../../Rules/PoO';
export default {
  name: 'RulesModal',
  apollo: {},
  components: {
    TicketingDates,
    TravelDates,
    PointOfSale,
    PointOfOrigin
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
          type: 'TicketingDates',
          title: 'Ticketing Dates',
          active: true
        },
        {
          id: 2,
          type: 'TravelDates',
          title: 'Travel Dates',
          active: false
        },
        {
          id: 3,
          type: 'PointOfSale',
          title: 'Point Of Sale',
          active: true
        },
        {
          id: 4,
          type: 'PointOfOrigin',
          title: 'Point Of Origin',
          active: true
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
