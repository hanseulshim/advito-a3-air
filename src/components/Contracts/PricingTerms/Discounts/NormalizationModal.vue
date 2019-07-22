<template>
  <modal
    classes="modal-container normalization-modal"
    name="normalization-modal"
    height="auto"
    width="1000px"
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
        <button class="button long" @click="hideModal">
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
          <p>Expanded!</p>
        </template>
      </el-table-column>
      <el-table-column
        label="Effective Dates"
        :min-width="discount.effectiveDates"
        :formatter="formatDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveTo"
      />
      <el-table-column
        label="Data Date Range"
        :min-width="discount.effectiveDates"
        :formatter="formatDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveTo"
      />
      <el-table-column
        label="Made By"
        :min-width="discount.effectiveDates"
        sortable
      />
      <el-table-column
        label="Created Date"
        :min-width="discount.effectiveDates"
        :formatter="formatDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveTo"
      />
      <el-table-column label="Markets" :min-width="discount.effectiveDates">
        <template>
          <p>2</p>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        :min-width="discount.effectiveDates"
        :formatter="formatDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveTo"
      />
      <el-table-column label="Actions" :min-width="discount.actions">
        <template>
          <el-tooltip effect="dark" content="Copy Discount" placement="top">
            <i class="far fa-copy icon-spacer" />
          </el-tooltip>
          <el-tooltip effect="dark" content="Edit Discount" placement="top">
            <i class="fas fa-pencil-alt icon-spacer" />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete Discount" placement="top">
            <i class="fas fa-trash-alt" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </modal>
</template>

<script>
import { formatDate, pluralize } from '@/helper';
export default {
  name: 'NormalizationModal',
  components: {},
  data() {
    return {
      discount: {},
      normalizationList: [{ id: 1 }, { id: 2 }]
    };
  },
  computed: {},
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return `${formatDate(row.effectiveFrom)} — ${formatDate(
        row.effectiveTo
      )}`;
    },
    hideModal() {
      this.$modal.hide('normalization-modal');
    },
    beforeOpen(event) {
      this.discount = event.params.discount;
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
