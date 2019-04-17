<template>
  <div>
    <div class="title-row space-between">
      <div class="section-header">
        {{ pluralize('discount', discountList.length) }}
      </div>
      <div class="menu-container">
        <button class="button long">
          Change Applied Order
        </button>
        <div class="bulk-action">
          <el-select
            v-model="bulkActionId"
            placeholder="Bulk Actions"
            filterable
            clearable
          >
            <el-option
              v-for="item in bulkActionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <button class="button long" @click="showNewDiscountModal">
          + NEW DISCOUNT
        </button>
      </div>
    </div>
    <el-table ref="discountList" :data="discountList" class="level-two-table">
      <el-table-column prop="contractOrder" :width="tableColumnWidth.bulk">
        <template slot="header">
          <i class="fas fa-list-ol sort-icon" />
        </template>
      </el-table-column>
      <el-table-column prop="appliedOrder" :width="tableColumnWidth.bulk">
        <template slot="header">
          <i class="fas fa-list-ul sort-icon" />
        </template>
      </el-table-column>
      <el-table-column label="Bulk" :width="tableColumnWidth.bulk">
        <template slot-scope="props">
          <el-checkbox
            :value="bulkIdList.includes(props.row.id)"
            @change="toggleSelection(props.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="Term Name"
        sortable
        :width="tableColumnWidth.shortName"
      >
        <template slot-scope="props">
          <div class="discount-name">
            {{ props.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Effective Dates"
        :width="tableColumnWidth.dateRange"
        :formatter="formatDate"
        sortable
        sort-by="effectiveEndDate"
      />
      <el-table-column
        prop="discountType"
        label="Discount Type"
        :width="tableColumnWidth.code"
      />
      <el-table-column
        label="Discount Type"
        :width="150"
        sortable
        sort-by="discountValue"
      >
        <template slot-scope="props">
          {{ props.row.discountValue * 10 }}%
        </template>
      </el-table-column>
      <el-table-column
        prop="journeyType"
        label="Journey"
        :width="tableColumnWidth.code"
      />
      <el-table-column
        prop="directionType"
        label="Direction"
        :width="tableColumnWidth.code"
      />
      <el-table-column
        prop="normalizationList"
        label="Normalization"
        :width="tableColumnWidth.code"
      />
      <el-table-column
        label="Notes"
        sortable
        sort-by="note"
        :width="tableColumnWidth.count"
      >
        <template slot-scope="props">
          <i v-if="!props.row.note" class="far fa-sticky-note" />
          <i
            v-else
            class="fas fa-sticky-note"
            :class="{ important: props.row.note === 'important' }"
          />
        </template>
      </el-table-column>
      <el-table-column label="Actions" :width="tableColumnWidth.nestedActions">
        <template slot-scope="props">
          <i
            class="far fa-copy icon-spacer"
            @click="showCopyPricingTermModal(props.row)"
          />
          <i
            class="fas fa-pencil-alt icon-spacer"
            @click="showEditPricingTermModal(props.row)"
          />
          <i
            class="fas fa-trash-alt"
            @click="showDeletePricingTermModal([props.row.id])"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate, pluralize } from '@/helper';
import { tableColumnWidth } from '@/config';
export default {
  name: 'Discounts',
  props: {
    discountList: {
      type: Array,
      required: true
    },
    pricingTermId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      bulkActionId: null,
      tableColumnWidth,
      bulkIdList: [],
      bulkActionList: [
        {
          id: 1,
          name: 'Delete'
        },
        {
          id: 2,
          name: 'QC'
        },
        {
          id: 3,
          name: 'Ticket Date'
        },
        {
          id: 4,
          name: 'Travel Data'
        },
        {
          id: 5,
          name: 'Tour Code'
        },
        {
          id: 6,
          name: 'Ticket Designation'
        }
      ]
    };
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return `${formatDate(row.effectiveStartDate)} — ${formatDate(
        row.effectiveEndDate
      )}`;
    },
    toggleSelection(id) {
      const index = this.bulkIdList.indexOf(id);
      if (index === -1) {
        this.bulkIdList.push(id);
      } else {
        this.bulkIdList.splice(index, 1);
      }
    },
    showNewDiscountModal() {
      this.$modal.show('new-pricing-term');
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.discount-name {
  cursor: pointer;
  color: $tree-poppy;
  &:hover {
    text-decoration: underline;
  }
}
</style>
