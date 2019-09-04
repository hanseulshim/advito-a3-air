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
      <el-table-column label="Fare Paid">
        <template slot-scope="props">
          {{ formatCurrency(props.row.farePaid) }}
        </template>
      </el-table-column>
      <el-table-column label="Usage" :formatter="formatUsage" />
      <el-table-column label="Override Usage" :render-header="renderHeader">
        <template slot-scope="props">
          {{
            `${props.row.usageOverride ? props.row.usageOverride + '%' : ''}`
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="Travel Date"
        :min-width="normalization.effectiveDates"
        :formatter="formatDate"
      />
      <el-table-column label="Compare" :formatter="formatCompare" />
      <el-table-column label="Resulting" :formatter="formatResulting" />
      <el-table-column
        label="Effective Discount"
        :render-header="renderHeader"
        :formatter="formatEffectiveDiscount"
      />
      <el-table-column
        label="Weighted Discount"
        :render-header="renderHeader"
        :formatter="formatWeightedDiscount"
      />
      <el-table-column
        label="Override Discount"
        :render-header="renderHeader"
        :formatter="formatOverrideDiscount"
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
import { DISCOUNT_LOOKUP } from '@/graphql/constants';
import { formatDate, formatCurrency, pluralize, formatPercent } from '@/helper';

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
    },
    discount: {
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
      normalizationMarketList: [],
      discountType: this.discount.discountTypeName
    };
  },
  computed: {
    farePaidAllMarkets() {
      return this.normalizationMarketList
        .map(market => market.farePaid)
        .reduce((prev, curr) => prev + curr, 0);
    }
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return `${formatDate(row.farePullDate)} `;
    },
    formatCurrency(num) {
      return formatCurrency(num);
    },
    formatPercent(num) {
      return formatPercent(num);
    },
    formatMarkets(row) {
      return `${row.marketA} - ${row.marketB}`;
    },
    formatUsage(row) {
      return `${((row.farePaid / this.farePaidAllMarkets) * 100).toFixed(2)}%`;
    },
    calcEffectiveDiscount(compare, resulting) {
      //Reusable function for getting the effective discount
      if (compare < resulting) {
        return 0;
      } else if (compare > resulting) {
        return ((compare - resulting) / compare).toFixed(2);
      } else if (compare === resulting) {
        return 0;
      }
    },
    formatCompare(row) {
      const { amount, directionType } = row.fareList[0];
      return `${this.formatCurrency(
        directionType === 'OW' ? amount * 2 : amount
      )}`;
    },
    formatResulting(row) {
      //Grab the direction type and the discount value from the discount
      const { journeyTypeName, amount } = this.discount;

      if (this.discountType === 'Fixed') {
        //Fixed discount just uses a dollar amount for a discount
        //If its oneway, multiply the result by 2 to roughly estimate what the value would be for a normal two way fare
        return `${this.formatCurrency(
          journeyTypeName === 'Oneway' ? amount * 2 : amount
        )}`;
      } else if (this.discountType === 'Percentage') {
        const { discountValue } = this.discount;
        const applicableFareList = row.fareList.find(
          fareList => fareList.fareType === DISCOUNT_LOOKUP.APPLICABLE_FARE_TYPE
        );

        const cost = applicableFareList.amount * (1 - discountValue);

        return `${this.formatCurrency(
          journeyTypeName === 'Oneway' ? cost * 2 : cost
        )}`;
      }
    },
    formatEffectiveDiscount(row) {
      //grab the compare and resulting column values and parse back to integers
      const compare = Number(this.formatCompare(row).replace(/[^0-9.-]+/g, ''));
      const resulting = Number(
        this.formatResulting(row).replace(/[^0-9.-]+/g, '')
      );

      return formatPercent(this.calcEffectiveDiscount(compare, resulting));
    },
    formatWeightedDiscount(row) {
      const usage = row.farePaid / this.farePaidAllMarkets;
      const effectiveDiscount =
        parseFloat(this.formatEffectiveDiscount(row)) / 100;

      return formatPercent((usage * effectiveDiscount).toFixed(2));
    },
    formatOverrideDiscount(row) {
      const usageOverride = row.usageOverride / 100;
      const effectiveDiscount =
        parseFloat(this.formatEffectiveDiscount(row)) / 100;

      if (usageOverride) {
        return formatPercent((usageOverride * effectiveDiscount).toFixed(2));
      } else return 'None';
    },
    renderHeader(h, { column }) {
      return h(
        'div',
        {
          style: {
            lineHeight: 1.5,
            padding: 0
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
        normalization: this.normalization,
        discount: this.discount
      });
    },
    showDeleteNormalizationMarketModal(normMarket) {
      this.$modal.show('delete-normalization-market-modal', {
        normMarket,
        normalization: this.normalization
      });
    },
    showEditNormalizationMarketModal(normMarket) {
      this.$modal.show('edit-normalization-market-modal', {
        normalization: this.normalization,
        normMarket,
        discount: this.discount
      });
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
