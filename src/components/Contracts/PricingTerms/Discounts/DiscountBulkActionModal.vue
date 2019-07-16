<template>
  <modal
    classes="modal-container"
    name="discount-bulk-action-modal"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">Bulk Action: Discounts</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <component :is="componentToRender" :parent-type="parentType"></component>
  </modal>
</template>
<script>
import TicketDate from '../../BulkActionRules/TicketDate';
import TicketDesignation from '../../BulkActionRules/TicketDesignation';
import TourCode from '../../BulkActionRules/TourCode';
import TravelData from '../../BulkActionRules/TravelData';
export default {
  name: 'DiscountBulkActionModal',
  components: {
    TicketDate,
    TicketDesignation,
    TourCode,
    TravelData
  },
  props: {
    parentType: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      bulkActionId: null,
      bulkActionComponents: [
        {
          name: 'Travel Data',
          id: 16,
          component: 'TravelData'
        },
        {
          name: 'Ticket Date',
          id: 15,
          component: 'TicketDate'
        },
        {
          name: 'Tour Code',
          id: 17,
          component: 'TourCode'
        },
        {
          name: 'Ticket Designation',
          id: 18,
          component: 'TicketDesignation'
        }
      ]
    };
  },
  computed: {
    componentToRender() {
      if (this.bulkActionId) {
        return this.bulkActionComponents.filter(
          comp => comp.id === this.bulkActionId
        )[0].component;
      } else return null;
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('discount-bulk-action-modal');
    },
    beforeOpen(event) {
      this.bulkActionId = event.params.bulkActionId;
    },
    beforeClose() {
      this.bulkActionId = null;
      this.$emit('clear-selection');
    }
  }
};
</script>
