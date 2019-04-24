<template>
  <div>
    <Navigation :selected-contract="selectedContract" />
    <div class="title-row space-between">
      <div class="section-header">
        <el-tooltip v-if="checkQc" placement="top" effect="light">
          <div slot="content">QC must be 100%</div>
          <i class="fas fa-exclamation-circle" />
        </el-tooltip>
        <span>{{
          pluralize('pricing term', filteredPricingTermList.length)
        }}</span>
      </div>
      <div class="menu-container">
        <el-checkbox v-model="showInactive">Show inactive</el-checkbox>
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
        <button class="button long" @click="showNewPricingTermModal">
          + NEW PRICING TERM
        </button>
      </div>
    </div>
    <el-table
      ref="pricingTermList"
      :data="filteredPricingTermList"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <Discounts
            :discount-list="props.row.discountList"
            :pricing-term-id="props.row.id"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="contractOrder"
        sortable
        :min-width="term.contractOrder"
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
        :min-width="term.appliedOrder"
      >
        <template slot="header">
          <el-tooltip content="Applied Order" placement="top" effect="dark">
            <i class="fas fa-list-ul sort-icon" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Bulk" :min-width="term.bulk">
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
        sort-by="name"
        :min-width="term.name"
      >
        <template slot-scope="props">
          <div :class="{ 'error-qc': checkErrorQc(props.row.qc) }">
            {{ props.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Effective Dates"
        :min-width="term.effectiveDates"
        :formatter="formatDate"
        sortable
        sort-by="effectiveEndDate"
      />
      <el-table-column label="QC" sortable sort-by="qc" :min-width="term.qc">
        <template slot-scope="props">
          <el-checkbox
            :class="{ invalid: props.row.qc !== 1 }"
            :value="props.row.qc === 1"
            @change="togglePricingTermQC(props.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Discounts" :min-width="term.discounts">
        <template slot-scope="props">
          {{ props.row.discountList.length }}
        </template>
      </el-table-column>
      <el-table-column label="Airlines" :min-width="term.airlines">
        <template slot-scope="props">
          <el-tooltip
            v-if="props.row.airlineList.length > 1"
            effect="dark"
            placement="top"
          >
            <div slot="content">{{ props.row.airlineList.join(', ') }}</div>
            <span>
              {{ props.row.airlineList.length }}
            </span>
          </el-tooltip>
          <span v-else>
            {{
              props.row.airlineList.length ? props.row.airlineList.join('') : 0
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="PoS/PoO" :min-width="term.pos">
        <template slot-scope="props">
          <el-tooltip
            effect="dark"
            placement="top"
            popper-class="pos-popup-container"
          >
            <div slot="content">
              PoS: {{ props.row.pointOfSaleList.join(', ') }}
              <br />
              PoO: {{ props.row.pointOfOriginList.join(', ') }}
            </div>
            <span>
              <span>
                {{
                  props.row.pointOfSaleList.length > 1 ||
                  !props.row.pointOfSaleList.length
                    ? props.row.pointOfSaleList.length
                    : props.row.pointOfSaleList.join('')
                }}
              </span>
              <span
                v-if="
                  props.row.pointOfOriginList.length > 1 ||
                    !props.row.pointOfOriginList.length
                "
              >
                /
              </span>
              <span>{{
                props.row.pointOfOriginList.length > 1 ||
                !props.row.pointOfOriginList.length
                  ? props.row.pointOfOriginList.length
                  : props.row.pointOfOriginList.join('')
              }}</span>
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="Notes"
        sortable
        sort-by="note"
        :min-width="term.note"
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
      <el-table-column label="Actions" :min-width="term.actions">
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
    <NewPricingTermModal />
    <CopyPricingTermModal />
    <EditPricingTermModal />
    <DeletePricingTermModal @clear-bulk-actions="clearBulkActions" />
    <NewDiscountModal @toggle-row="toggleRow" />
    <CopyDiscountModal @toggle-row="toggleRow" />
    <EditDiscountModal @toggle-row="toggleRow" />
    <DeleteDiscountModal @toggle-row="toggleRow" />
  </div>
</template>

<script>
import Navigation from '../Navigation';
import { pluralize, formatDate } from '@/helper';
import { term } from '@/config';
import { GET_PRICING_TERM_LIST } from '@/graphql/queries';
import { TOGGLE_PRICING_TERM_QC } from '@/graphql/mutations';
import CopyPricingTermModal from './CopyPricingTermModal';
import NewPricingTermModal from './NewPricingTermModal';
import EditPricingTermModal from './EditPricingTermModal';
import DeletePricingTermModal from './DeletePricingTermModal';
import NewDiscountModal from './Discounts/NewDiscountModal';
import CopyDiscountModal from './Discounts/CopyDiscountModal';
import EditDiscountModal from './Discounts/EditDiscountModal';
import DeleteDiscountModal from './Discounts/DeleteDiscountModal';
import Discounts from './Discounts';
export default {
  name: 'PricingTerms',
  components: {
    Navigation,
    Discounts,
    CopyPricingTermModal,
    NewPricingTermModal,
    EditPricingTermModal,
    DeletePricingTermModal,
    NewDiscountModal,
    CopyDiscountModal,
    EditDiscountModal,
    DeleteDiscountModal
  },
  apollo: {
    pricingTermList: {
      query: GET_PRICING_TERM_LIST
    }
  },
  props: {
    selectedContract: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pricingTermList: [],
      showInactive: false,
      bulkActionId: null,
      term,
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
  computed: {
    filteredPricingTermList: function() {
      return this.pricingTermList
        .filter(term => this.showInactive || term.effectiveEndDate > new Date())
        .map(term => ({
          ...term,
          inactive: term.effectiveEndDate < new Date()
        }));
    }
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
    checkQc() {
      return this.pricingTermList.some(term => term.qc !== 1);
    },
    checkErrorQc(qc) {
      return qc !== 1;
    },
    tableRowClassName({ row }) {
      return row.inactive ? 'inactive-row' : '';
    },
    toggleSelection(id) {
      const index = this.bulkIdList.indexOf(id);
      if (index === -1) {
        this.bulkIdList.push(id);
      } else {
        this.bulkIdList.splice(index, 1);
      }
    },
    showNewPricingTermModal() {
      this.$modal.show('new-pricing-term');
    },
    showCopyPricingTermModal(pricingTerm) {
      this.$modal.show('copy-pricing-term', { pricingTerm });
    },
    showEditPricingTermModal(pricingTerm) {
      this.$modal.show('edit-pricing-term', { pricingTerm });
    },
    showDeletePricingTermModal(idList) {
      this.$modal.show('delete-pricing-term', { idList });
    },
    bulkAction(value) {
      if (value === 1) {
        this.showDeletePricingTermModal(this.bulkIdList);
      }
    },
    clearBulkActions() {
      this.bulkIdList = [];
      this.bulkActionId = null;
    },
    toggleRow(id) {
      const row = this.$refs.pricingTermList.data.filter(
        term => term.id === id
      )[0];
      this.$refs.pricingTermList.toggleRowExpansion(row);
    },
    async togglePricingTermQC(id) {
      try {
        await this.$apollo.mutate({
          mutation: TOGGLE_PRICING_TERM_QC,
          variables: {
            id
          }
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.menu-container {
  display: flex;
  align-items: flex-end;
  .bulk-action {
    width: 200px;
    margin: 0 1em;
  }
}
.sort-icon {
  font-size: 1.5em;
  + .caret-wrapper {
    display: none !important;
  }
}
.fa-sticky-note {
  &.important {
    color: $tree-poppy;
  }
}
#app {
  .invalid {
    .el-checkbox__inner {
      border-color: $monza;
    }
  }
}
</style>
