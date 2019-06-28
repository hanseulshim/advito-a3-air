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
    <el-table
      ref="discountList"
      v-loading="$apollo.loading"
      :data="discountList"
      class="level-two-table"
    >
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
        prop="name"
        label="Name"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="discount.name"
      />
      <el-table-column
        prop="discountTypeName"
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
            props.row.discountTypeId === DISCOUNT_LOOKUP.PERCENTAGE
              ? formatPercent(props.row.discountValue)
              : props.row.discountValue
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="journeyTypeName"
        label="Journey"
        :min-width="discount.journeyType"
      />
      <el-table-column
        prop="directionTypeName"
        label="Direction"
        :min-width="discount.directionType"
      />
      <el-table-column label="Rules" :min-width="discount.rules">
        <template slot-scope="props">
          <button class="button number" @click="toggleRulesModal(props.row)">
            {{ props.row.ruleCount }}
          </button>
        </template>
      </el-table-column>
      <el-table-column
        label="Normalization"
        :min-width="discount.normalization"
      >
        <template slot-scope="props">
          <button class="button number">
            {{ props.row.normalizationCount }}
          </button>
        </template>
      </el-table-column>
      <el-table-column
        label="Notes"
        sortable
        :sort-method="sortByNote"
        :min-width="discount.note"
        :sort-orders="['ascending', 'descending']"
      >
        <template slot-scope="props">
          <el-tooltip effect="dark" content="Show Note" placement="top">
            <div class="note-count-container">
              <i
                class="fa-sticky-note"
                :class="[
                  { important: props.row.noteImportant },
                  props.row.noteContent ? 'fas' : 'far'
                ]"
                @click="toggleNoteModal(props.row)"
              />
            </div>
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
    <NewDiscountModal @toggle-row="toggleRow" />
    <CopyDiscountModal @toggle-row="toggleRow" />
    <EditDiscountModal />
    <DeleteDiscountModal @toggle-row="toggleRow" />
    <DiscountNoteModal @toggle-row="toggleRow" />
    <ChangeDiscountAppliedOrderModal />
    <RulesModal />
  </div>
</template>

<script>
import { formatDate, formatPercent, pluralize } from '@/helper';
import { discount } from '@/config';
import { GET_DISCOUNT_LIST, GET_BULK_ACTION_LIST } from '@/graphql/queries';
import { DISCOUNT_LOOKUP } from '@/graphql/constants';
import NewDiscountModal from './NewDiscountModal';
import CopyDiscountModal from './CopyDiscountModal';
import EditDiscountModal from './EditDiscountModal';
import DeleteDiscountModal from './DeleteDiscountModal';
import DiscountNoteModal from './DiscountNoteModal';
import RulesModal from './RulesModal';
import ChangeDiscountAppliedOrderModal from './ChangeDiscountAppliedOrderModal';
export default {
  name: 'Discounts',
  components: {
    NewDiscountModal,
    CopyDiscountModal,
    EditDiscountModal,
    DeleteDiscountModal,
    DiscountNoteModal,
    ChangeDiscountAppliedOrderModal,
    RulesModal
  },
  apollo: {
    discountList: {
      query: GET_DISCOUNT_LIST,
      variables() {
        return {
          pricingTermId: this.pricingTermId
        };
      }
    },
    bulkActionList: {
      query: GET_BULK_ACTION_LIST,
      variables: {
        parentId: DISCOUNT_LOOKUP.BULK_ACTION
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
      DISCOUNT_LOOKUP,
      discountList: [],
      bulkActionId: null,
      discount,
      bulkIdList: [],
      bulkActionList: []
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
      if (value === DISCOUNT_LOOKUP.BULK_ACTION_DELETE) {
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
        discount
      });
    },
    toggleNoteModal(discount) {
      this.$modal.show('save-discount-note', {
        parentId: discount.id,
        pricingTermId: this.pricingTermId,
        important: discount.noteImportant
      });
    },
    toggleRulesModal(discount) {
      this.$modal.show('rules', {
        discount
      });
    },
    showChangeAppliedOrderModal() {
      this.$modal.show('change-discount-order', {
        pricingTermId: this.pricingTermId,
        discountList: this.discountList
      });
    },
    toggleRow(id) {
      this.$emit('toggle-row', id);
    },
    sortByNote(a, b) {
      if (a.noteImportant && !b.noteImportant) {
        return -1;
      } else if (a.noteImportant && b.noteImportant) {
        return 0;
      } else if (!a.noteImportant && b.noteImportant) {
        return 1;
      } else if (a.noteContent && !b.noteContent) {
        return -1;
      } else if (!a.noteContent && b.noteContent) {
        return 1;
      } else if (a.noteContent && b.noteContent) {
        return 0;
      }
    }
  }
};
</script>
