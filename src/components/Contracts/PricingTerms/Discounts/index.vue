<template>
  <div>
    <div class="title-row space-between">
      <div class="section-header">
        {{ pluralize('discount', discountList.length) }}
      </div>
      <div class="menu-container">
        <button class="button long" @click="showChangeAppliedOrderModal">
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
        :sort-orders="['ascending', 'descending']"
        :min-width="discount.contractOrder"
        class-name="sort-cell"
      >
        <template slot="header">
          <el-tooltip content="Read Order" placement="top" effect="dark">
            <i class="fas fa-list-ol sort-icon" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="appliedOrder"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="discount.appliedOrder"
        class-name="sort-cell"
      >
        <template slot="header">
          <el-tooltip content="Applied Order" placement="top" effect="dark">
            <i class="fas fa-list-ul sort-icon" />
          </el-tooltip>
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
        label="Name"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="discount.name"
      >
        <template slot-scope="props">
          <div class="discount-name">
            {{ props.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="discountType.name"
        label="Type"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="discount.discountType"
      />
      <el-table-column
        label="Value"
        :min-width="discount.discountValue"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="discountValue"
      >
        <template slot-scope="props">
          {{
            props.row.discountType.id === 2
              ? formatPercent(props.row.discountValue)
              : props.row.discountValue
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="journeyType.name"
        label="Journey"
        :min-width="discount.journeyType"
      />
      <el-table-column
        prop="directionType.name"
        label="Direction"
        :min-width="discount.directionType"
      />
      <el-table-column
        prop="normalizationList"
        label="Rules"
        :min-width="discount.rules"
      >
        <template slot-scope="props">
          <button class="button number">
            {{ props.row.normalizationList }}
          </button>
        </template>
      </el-table-column>
      <el-table-column
        prop="normalizationList"
        label="Normalization"
        :min-width="discount.normalization"
      >
        <template slot-scope="props">
          <button class="button number">
            {{ props.row.normalizationList }}
          </button>
        </template>
      </el-table-column>
      <el-table-column
        label="Notes"
        sortable
        :sort-orders="['ascending', 'descending']"
        :sort-method="sortByNote"
        sort-by="note"
        :min-width="discount.note"
      >
        <template slot-scope="props">
          <el-tooltip
            v-if="props.row.note && props.row.note.noteList.length"
            effect="dark"
            content="Show Note"
            placement="top"
          >
            <i
              class="fas fa-sticky-note"
              :class="{ important: props.row.note.important }"
              @click="toggleNoteModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip v-else effect="dark" content="Show Note" placement="top">
            <i
              class="far fa-sticky-note"
              :class="{ important: props.row.note && props.row.note.important }"
              @click="toggleNoteModal(props.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Actions" :min-width="discount.actions">
        <template slot-scope="props">
          <el-tooltip effect="dark" content="Copy Discount" placement="top">
            <i
              class="far fa-copy icon-spacer"
              @click="showCopyDiscountModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Edit Discount" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditDiscountModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete Discount" placement="top">
            <i
              class="fas fa-trash-alt"
              @click="showDeleteDiscountModal([props.row.id])"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate, formatPercent, pluralize } from '@/helper';
import { discount } from '@/config';
import { GET_DISCOUNT_LIST } from '@/graphql/queries';
export default {
  name: 'Discounts',
  apollo: {
    discountList: {
      query: GET_DISCOUNT_LIST,
      variables() {
        return {
          pricingTermId: this.pricingTermId
        };
      }
    }
  },
  props: {
    pricingTermId: {
      type: Number,
      required: true,
      default: null
    }
  },
  data() {
    return {
      discountList: [],
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
      this.$modal.show('new-discount', { pricingTermId: this.pricingTermId });
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
    },
    toggleNoteModal(discount) {
      this.$modal.show('save-discount-note', {
        pricingTermId: this.pricingTermId,
        discountId: discount.id,
        note: discount.note
      });
    },
    showChangeAppliedOrderModal() {
      this.$modal.show('change-discount-order', {
        pricingTermId: this.pricingTermId,
        discountList: this.discountList
      });
    },
    sortByNote(a, b) {
      if (a.note === null && b.note === null) {
        return 0;
      }
      if (b.note === null && a.note !== null) {
        return -1;
      }
      if (a.note === null && b.note !== null) {
        return 1;
      }
      if (a.note.important && !b.note.important) {
        return -1;
      }
      if (!a.note.important && b.note.important) {
        return 1;
      }
      if (a.note.length > b.note.length) {
        return -1;
      }
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
