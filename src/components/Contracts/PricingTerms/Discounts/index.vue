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
            @change="bulkAction"
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
      <el-table-column
        prop="contractOrder"
        sortable
        :min-width="discount.contractOrder"
      >
        <template slot="header">
          <i class="fas fa-list-ol sort-icon" />
        </template>
      </el-table-column>
      <el-table-column
        prop="appliedOrder"
        sortable
        :min-width="discount.appliedOrder"
      >
        <template slot="header">
          <i class="fas fa-list-ul sort-icon" />
        </template>
      </el-table-column>
      <el-table-column label="Bulk" :min-width="discount.bulk">
        <template slot-scope="props">
          <el-checkbox
            :value="bulkIdList.includes(props.row.id)"
            @change="toggleSelection(props.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="Discount Name"
        sortable
        :min-width="discount.name"
      >
        <template slot-scope="props">
          <div class="discount-name">
            {{ props.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="discountType"
        label="Discount Type"
        :min-width="discount.discountType"
      />
      <el-table-column
        label="Discount Value"
        :min-width="discount.discountValue"
        sortable
        sort-by="discountValue"
      >
        <template slot-scope="props">
          {{ formatPercent(props.row.discountValue) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="journeyType"
        label="Journey"
        :min-width="discount.journeyType"
      />
      <el-table-column
        prop="directionType"
        label="Direction"
        :min-width="discount.directionType"
      />
      <el-table-column
        prop="normalizationList"
        label="Normalization"
        :min-width="discount.normalization"
      />
      <el-table-column
        label="Notes"
        sortable
        sort-by="note"
        :min-width="discount.note"
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
      <el-table-column label="Actions" :min-width="discount.actions">
        <template slot-scope="props">
          <i
            class="far fa-copy icon-spacer"
            @click="showCopyDiscountModal(props.row)"
          />
          <i
            class="fas fa-pencil-alt icon-spacer"
            @click="showEditDiscountModal(props.row)"
          />
          <i
            class="fas fa-trash-alt"
            @click="showDeleteDiscountModal([props.row.id])"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate, formatPercent, pluralize } from '@/helper';
import { discount } from '@/config';
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
      discount,
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
    formatPercent(num) {
      return formatPercent(num);
    },
    toggleSelection(id) {
      const index = this.bulkIdList.indexOf(id);
      if (index === -1) {
        this.bulkIdList.push(id);
      } else {
        this.bulkIdList.splice(index, 1);
      }
    },
    bulkAction(value) {
      if (value === 1) {
        this.showDeleteDiscountModal(this.bulkIdList);
      }
    },
    showNewDiscountModal() {
      this.$modal.show('new-discount', { id: this.pricingTermId });
    },
    showCopyDiscountModal(discount) {
      this.$modal.show('copy-discount', {
        discount,
        pricingTermId: this.pricingTermId
      });
    },
    showDeleteDiscountModal(idList) {
      this.$modal.show('delete-discount', {
        pricingTermId: this.pricingTermId,
        idList
      });
    },
    showEditDiscountModal(discount) {
      this.$modal.show('edit-discount', {
        discount,
        pricingTermId: this.pricingTermId
      });
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
