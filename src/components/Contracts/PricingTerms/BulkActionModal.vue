<template>
  <modal
    classes="modal-container"
    name="bulk-action-modal"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <component :is="componentToRender" :parent-type="parentType"></component>
  </modal>
</template>
<script>
import TicketDate from '../BulkActionRules/TicketDate';
import TicketDesignation from '../BulkActionRules/TicketDesignation';
import TourCode from '../BulkActionRules/TourCode';
import TravelData from '../BulkActionRules/TravelData';
export default {
  name: 'BulkActionModal',
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
          id: 10,
          component: 'TravelData'
        },
        {
          name: 'Ticket Date',
          id: 9,
          component: 'TicketDate'
        },
        {
          name: 'Tour Code',
          id: 11,
          component: 'TourCode'
        },
        {
          name: 'Ticket Designation',
          id: 12,
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
      this.$modal.hide('bulk-action-modal');
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
