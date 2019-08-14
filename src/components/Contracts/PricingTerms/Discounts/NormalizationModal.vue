<template>
  <modal
    classes="modal-container normalization-modal"
    name="normalization-modal"
    height="auto"
    width="1300px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">Discount : {{ discount.name }}</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <div class="title-row space-between">
      <div class="section-header">
        <span>{{ pluralize('normalization', normalizationList.length) }}</span>
      </div>
      <div class="menu-container">
        <button class="button long" @click="showNewNormalizationModal()">
          + NEW NORMALIZATION
        </button>
      </div>
    </div>
    <el-table
      ref="normalizationList"
      v-loading="$apollo.loading"
      :data="normalizationList"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template>
          <NormalizationMarkets />
        </template>
      </el-table-column>
      <el-table-column
        label="Effective Dates"
        :formatter="formatEffectiveDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveTo"
      />
      <el-table-column
        label="Data Date Range"
        :min-width="discount.effectiveDates"
        :formatter="formatUsageDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="usageTo"
      />
      <el-table-column
        label="Made By"
        :min-width="discount.effectiveDates"
        sortable
        prop="createdby"
      />
      <el-table-column
        label="Created Date"
        :formatter="formatCreatedDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveTo"
      />
      <el-table-column label="Markets" prop="marketCount" />

      <el-table-column
        label="Actions"
        :min-width="discount.effectiveDates"
        :formatter="formatDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveTo"
      />
      <el-table-column label="Actions" :min-width="discount.actions">
        <template slot-scope="props">
          <el-tooltip
            effect="dark"
            content="Copy Normalization"
            placement="top"
          >
            <i
              class="far fa-copy icon-spacer"
              @click="showCopyNormalizationModal()"
            />
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="Edit Normalization"
            placement="top"
          >
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditNormalizationModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="Delete Normalization"
            placement="top"
          >
            <i
              class="fas fa-trash-alt"
              @click="showDeleteNormalizationModal()"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <CopyNormalizationModal />
    <NewNormalizationModal @toggle-row="toggleRow" />
    <DeleteNormalizationModal />
    <EditNormalizationModal />
  </modal>
</template>
<script>
import CopyNormalizationModal from './Normalization/CopyNormalizationModal';
import NewNormalizationModal from './Normalization/NewNormalizationModal';
import DeleteNormalizationModal from './Normalization/DeleteNormalizationModal';
import EditNormalizationModal from './Normalization/EditNormalizationModal';
import NormalizationMarkets from './Normalization/NormalizationMarkets';
import { formatDate, pluralize } from '@/helper';
import { GET_NORMALIZATION_LIST } from '@/graphql/queries';
export default {
  name: 'NormalizationModal',
  components: {
    CopyNormalizationModal,
    NewNormalizationModal,
    DeleteNormalizationModal,
    EditNormalizationModal,
    NormalizationMarkets
  },
  apollo: {
    normalizationList: {
      query: GET_NORMALIZATION_LIST,
      fetchPolicy: 'network-only',
      variables() {
        return {
          discountId: this.discount.id
        };
      }
    }
  },
  data() {
    return {
      discount: {},
      pricingTermId: null,
      normalizationList: []
    };
  },
  computed: {},
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatCreatedDate(row) {
      return `${formatDate(row.created)}`;
    },
    formatEffectiveDate(row) {
      return `${formatDate(row.effectiveFrom)} — ${formatDate(
        row.effectiveTo
      )}`;
    },
    formatUsageDate(row) {
      return `${formatDate(row.usageFrom)} — ${formatDate(row.usageTo)}`;
    },
    hideModal() {
      this.$modal.hide('normalization-modal');
    },
    beforeOpen(event) {
      this.discount = event.params.discount;
      this.pricingTermId = event.params.pricingTermId;
    },
    showCopyNormalizationModal() {
      this.$modal.show('copy-normalization-modal');
    },
    showNewNormalizationModal() {
      this.$modal.show('new-normalization-modal', {
        discountId: this.discount.id,
        pricingTermId: this.pricingTermId
      });
    },
    showDeleteNormalizationModal() {
      this.$modal.show('delete-normalization-modal');
    },
    showEditNormalizationModal(normalization) {
      this.$modal.show('edit-normalization-modal', {
        normalization
      });
    },
    tableRowClassName({ row }) {
      return row.inactive ? 'inactive-row' : '';
    },
    beforeClose() {
      this.discount = {};
    },
    toggleRow(id) {
      this.$emit('toggle-row', id);
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/global.scss';
</style>
