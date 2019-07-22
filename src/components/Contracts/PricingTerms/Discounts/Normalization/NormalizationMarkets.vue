<template>
  <!-- <div class="title-row space-between">
    <div class="section-header">Discount : {{ discount.name }}</div>
    <el-tooltip effect="dark" content="Close Modal" placement="top">
      <i class="fas fa-times close-modal-button" @click="hideModal" />
    </el-tooltip>
  </div> -->
  <div>
    <div class="title-row space-between">
      <div class="section-header">
        <span>{{ pluralize('normalization markets', 1) }}</span>
      </div>
      <div class="menu-container">
        <button class="button long" @click="showNewNormalizationMarketModal()">
          + NEW MARKET
        </button>
      </div>
    </div>
    <el-table
      ref="normalizationMarketList"
      v-loading="$apollo.loading"
      :data="normalizationMarketList"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="Market">{{ 'ORD - LHR' }}</el-table-column>
      <el-table-column label="Fare Paid" :min-width="discount.effectiveDates" />
      <el-table-column label="Usage" />
      <el-table-column label="Override Usage" :render-header="renderHeader">
        <template>
          <p>2</p>
        </template>
      </el-table-column>
      <el-table-column
        label="Travel Date"
        :min-width="discount.effectiveDates"
        :formatter="formatDate"
      />
      <el-table-column label="Compare" />
      <el-table-column label="Resulting" />
      <el-table-column
        label="Effective Discount"
        :render-header="renderHeader"
      />
      <el-table-column
        label="Weighted Dsicount"
        :render-header="renderHeader"
      />
      <el-table-column
        label="Override Discount"
        :render-header="renderHeader"
      />
      <el-table-column :min-width="discount.actions">
        <template slot-scope="props">
          <el-tooltip
            effect="dark"
            content="Edit Normalization Market"
            placement="top"
          >
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditNormalizationModal()"
            />
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="Delete Normalization Market"
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
    <NewNormalizationMarketModal />
  </div>
</template>
<script>
// import CopyNormalizationModal from './Normalization/CopyNormalizationModal';
// import NewNormalizationModal from './Normalization/NewNormalizationModal';
// import DeleteNormalizationModal from './Normalization/DeleteNormalizationModal';
// import EditNormalizationModal from './Normalization/EditNormalizationModal';
import NewNormalizationMarketModal from './NewNormalizationMarketModal';
import { formatDate, pluralize } from '@/helper';
export default {
  name: 'NormalizationMarkets',
  components: {
    NewNormalizationMarketModal
    // CopyNormalizationModal,
    // NewNormalizationModal,
    // DeleteNormalizationModal
  },
  data() {
    return {
      discount: {},
      normalizationMarketList: [{ id: 1 }, { id: 2 }]
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
    renderHeader(h, { column }) {
      return h(
        'div',
        {
          style: {
            lineHeight: 1.5
          }
        },
        [
          h('span', column.label.split(' ')[0]),
          h('br'),
          h('span', column.label.split(' ')[1])
        ]
      );
    },
    showNewNormalizationMarketModal() {
      this.$modal.show('new-normalization-market-modal');
    },
    showDeleteNormalizationModal() {
      this.$modal.show('delete-normalization-modal');
    },
    showEditNormalizationModal() {
      this.$modal.show('edit-normalization-modal');
    },
    tableRowClassName({ row }) {
      return row.inactive ? 'inactive-row' : '';
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
