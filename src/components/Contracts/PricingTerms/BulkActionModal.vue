<template>
  <modal
    classes="modal-container"
    name="bulk-action-modal"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">Bulk Action</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <component
      :is="componentToRender"
      :parent-type="parentType"
      :parent-id="parentId"
      :bulk-id-list="bulkIdList"
      :selected-contract="selectedContract.id"
      @hide-modal="hideModal"
    ></component>
  </modal>
</template>
<script>
import TicketDate from '../BulkActionRules/TicketDate';
import TicketDesignation from '../BulkActionRules/TicketDesignation';
import TourCode from '../BulkActionRules/TourCode';
import TravelDate from '../BulkActionRules/TravelDate';
import { GET_SELECTED_CONTRACT } from '@/graphql/queries';
export default {
  name: 'BulkActionModal',
  components: {
    TicketDate,
    TicketDesignation,
    TourCode,
    TravelDate
  },
  apollo: {
    selectedContract: {
      query: GET_SELECTED_CONTRACT
    }
  },
  props: {
    parentType: {
      default: null,
      type: Number
    },
    parentId: {
      default: null,
      type: Number
    },
    bulkIdList: {
      default: null,
      type: Array
    }
  },
  data() {
    return {
      bulkActionId: null,
      selectedContract: null,
      bulkActionComponents: [
        {
          name: 'Travel Date',
          id: 10,
          component: 'TravelDate'
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
