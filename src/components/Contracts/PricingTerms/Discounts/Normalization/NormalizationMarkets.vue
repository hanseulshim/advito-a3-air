<template>
  <div>
    <div class="title-row space-between">
      <div class="section-header">
        <span>{{
          pluralize('normalization market', normalizationMarketList.length)
        }}</span>
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
      <el-table-column label="Market" :formatter="formatMarkets" />
      <el-table-column label="Fare Paid" prop="farePaid" />
      <el-table-column label="Usage" prop="usageOverride" />
      <el-table-column
        label="Override Usage"
        :render-header="renderHeader"
        prop="usageOverride"
      />
      <el-table-column
        label="Travel Date"
        :min-width="normalization.effectiveDates"
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
      <el-table-column :min-width="normalization.actions">
        <template slot-scope="props">
          <el-tooltip
            effect="dark"
            content="Edit Normalization Market"
            placement="top"
          >
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditNormalizationMarketModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="Delete Normalization Market"
            placement="top"
          >
            <i
              class="fas fa-trash-alt"
              @click="showDeleteNormalizationMarketModal(props.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NewNormalizationMarketModal />
    <EditNormalizationMarketModal />
    <DeleteNormalizationMarketModal />
  </div>
</template>
<script>
import NewNormalizationMarketModal from './NewNormalizationMarketModal';
import EditNormalizationMarketModal from './EditNormalizationMarketModal';
import DeleteNormalizationMarketModal from './DeleteNormalizationMarketModal';
import { GET_NORMALIZATION_MARKET_LIST } from '@/graphql/queries';
import { formatDate, pluralize } from '@/helper';
export default {
  name: 'NormalizationMarkets',
  components: {
    NewNormalizationMarketModal,
    EditNormalizationMarketModal,
    DeleteNormalizationMarketModal
  },
  props: {
    normalization: {
      default: null,
      type: Object
    }
  },
  apollo: {
    normalizationMarketList: {
      query: GET_NORMALIZATION_MARKET_LIST,
      fetchPolicy: 'network-only',
      variables() {
        return {
          normalizationId: this.normalization.id
        };
      }
    }
  },
  data() {
    return {
      normalizationMarketList: []
    };
  },
  computed: {},
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return `${formatDate(row.farePullDate)} `;
    },
    formatMarkets(row) {
      return `${row.marketA} - ${row.marketB}`;
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
      this.$modal.show('new-normalization-market-modal', {
        normalization: this.normalization
      });
    },
    showDeleteNormalizationMarketModal() {
      this.$modal.show('delete-normalization-market-modal');
    },
    showEditNormalizationMarketModal() {
      this.$modal.show('edit-normalization-market-modal');
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
