<template>
  <div>
    <Navigation />
    <div class="title-row space-between">
      <div class="section-header">
        <el-tooltip
          v-if="pricingTermList.some(term => !term.qc)"
          placement="top"
          effect="light"
        >
          <div slot="content">QC must be 100%</div>
          <i class="fas fa-exclamation-circle" />
        </el-tooltip>
        <span>{{
          pluralize('pricing term', filteredPricingTermList.length)
        }}</span>
      </div>
      <div class="menu-container">
        <el-checkbox v-model="showInactive">Show inactive</el-checkbox>
        <button class="button long" @click="showChangeAppliedOrderModal">
          Change Applied Order
        </button>
        <div class="bulk-action">
          <el-select
            v-model="bulkActionId"
            placeholder="Bulk Actions"
            filterable
            clearable
            :disabled="!bulkIdList.length"
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
      v-loading="$apollo.loading"
      :data="filteredPricingTermList"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <Discounts
            :pricing-term-id="props.row.id"
            :contract-id="selectedContract.id"
            @toggle-row="toggleRow"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="contractOrder"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="term.contractOrder"
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
        :min-width="term.appliedOrder"
        class-name="sort-cell"
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
        :sort-orders="['ascending', 'descending']"
        sort-by="name"
        :min-width="term.name"
      >
        <template slot-scope="props">
          <div :class="{ 'error-qc': !props.row.qc }">{{ props.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="Effective Dates"
        :min-width="term.effectiveDates"
        :formatter="formatDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveTo"
      />
      <el-table-column
        label="QC"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="qc"
        :min-width="term.qc"
      >
        <template slot-scope="props">
          <el-checkbox
            :class="{ invalid: !props.row.qc }"
            :value="props.row.qc"
            @change="togglePricingTermQC([props.row.id])"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="discountCount"
        label="Discounts"
        :min-width="term.discounts"
      />
      <el-table-column label="Airlines" :min-width="term.airlines">
        <template slot-scope="props">
          <el-tooltip
            v-if="props.row.airlineList.length"
            effect="dark"
            placement="top"
          >
            <div slot="content">{{ props.row.airlineList.join(', ') }}</div>
            <span>{{ props.row.airlineList.length }}</span>
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
            v-if="
              props.row.pointOfSaleList.length > 1 ||
                props.row.pointOfOriginList.length > 1
            "
            effect="dark"
            placement="top"
            popper-class="pos-popup-container"
          >
            <div slot="content">
              <span v-if="props.row.pointOfSaleList.length > 1"
                >PoS: {{ props.row.pointOfSaleList.join(', ') }}</span
              >
              <br v-if="props.row.pointOfSaleList.length > 1" />
              <span v-if="props.row.pointOfOriginList.length > 1"
                >PoO: {{ props.row.pointOfOriginList.join(', ') }}</span
              >
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
              /
              <span>
                {{
                  props.row.pointOfOriginList.length > 1 ||
                  !props.row.pointOfOriginList.length
                    ? props.row.pointOfOriginList.length
                    : props.row.pointOfOriginList.join('')
                }}
              </span>
            </span>
          </el-tooltip>
          <span v-else>
            <span>
              {{
                props.row.pointOfSaleList.length
                  ? props.row.pointOfSaleList.join('')
                  : 0
              }}
            </span>
            <span>/</span>
            <span>
              {{
                props.row.pointOfOriginList.length
                  ? props.row.pointOfOriginList.join('')
                  : 0
              }}
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="Notes"
        sortable
        :sort-method="sortByNote"
        :min-width="term.note"
        :sort-orders="['ascending', 'descending']"
      >
        <template slot-scope="props">
          <el-tooltip effect="dark" content="Show Note" placement="top">
            <div
              class="note-count-container"
              @click="toggleNoteModal(props.row)"
            >
              <i
                class="fa-sticky-note"
                :class="[
                  { important: props.row.noteImportant },
                  props.row.noteContent ? 'fas' : 'far'
                ]"
              />
              <span
                v-if="props.row.discountNoteCount"
                class="note-count sub-content"
                :class="{ empty: props.row.noteContent }"
                >{{ props.row.discountNoteCount }}</span
              >
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Actions" :min-width="term.actions">
        <template slot-scope="props">
          <el-tooltip effect="dark" content="Copy Pricing Term" placement="top">
            <i
              class="far fa-copy icon-spacer"
              @click="showCopyPricingTermModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Edit Pricing Term" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditPricingTermModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="Delete Pricing Term"
            placement="top"
          >
            <i
              class="fas fa-trash-alt"
              @click="showDeletePricingTermModal([props.row.id])"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NewPricingTermModal />
    <CopyPricingTermModal />
    <EditPricingTermModal />
    <DeletePricingTermModal @clear-bulk-actions="clearBulkActions" />
    <NoteModal />
    <ChangeAppliedOrderModal />
    <BulkActionModal
      :bulk-id-list="bulkIdList"
      :parent-type="parentType"
      :parent-id="selectedContract.id"
      @clear-selection="clearBulkActionSelection"
    />
    <PricingTermRulesModal @toggle-row="toggleRow" />
  </div>
</template>

<script>
import Navigation from '../Navigation';
import { pluralize, formatDate } from '@/helper';
import { term } from '@/config';
import {
  GET_PRICING_TERM_LIST,
  GET_SELECTED_CONTRACT,
  GET_CONTRACT,
  GET_BULK_ACTION_LIST
} from '@/graphql/queries';
import { PRICING_TERM_LOOKUP } from '@/graphql/constants';
import { TOGGLE_PRICING_TERM_QC } from '@/graphql/mutations';
import CopyPricingTermModal from './CopyPricingTermModal';
import NewPricingTermModal from './NewPricingTermModal';
import EditPricingTermModal from './EditPricingTermModal';
import PricingTermRulesModal from './PricingTermRulesModal';
import DeletePricingTermModal from './DeletePricingTermModal';
import BulkActionModal from './BulkActionModal';
import NoteModal from './NoteModal';
import Discounts from './Discounts';
import ChangeAppliedOrderModal from './ChangeAppliedOrderModal';
import moment from 'moment';

export default {
  name: 'PricingTerms',
  components: {
    Navigation,
    Discounts,
    CopyPricingTermModal,
    NewPricingTermModal,
    EditPricingTermModal,
    DeletePricingTermModal,
    PricingTermRulesModal,
    NoteModal,
    ChangeAppliedOrderModal,
    BulkActionModal
  },
  apollo: {
    selectedContract: {
      query: GET_SELECTED_CONTRACT
    },
    pricingTermList: {
      query: GET_PRICING_TERM_LIST,
      variables() {
        return {
          contractId: this.selectedContract.id
        };
      },
      result({ error }) {
        if (error) {
          this.$modal.show('error', {
            message: error.message
          });
          this.pricingTermList = [];
        }
      },
      error() {
        // console.log(error);
      }
    },
    bulkActionList: {
      query: GET_BULK_ACTION_LIST,
      variables: {
        parentId: PRICING_TERM_LOOKUP.BULK_ACTION
      }
    }
  },
  data() {
    return {
      selectedContract: {},
      pricingTermList: [],
      showInactive: false,
      bulkActionId: null,
      term,
      bulkIdList: [],
      toggleRowId: null,
      bulkActionList: [],
      parentType: PRICING_TERM_LOOKUP.RULE_TYPE
    };
  },
  computed: {
    filteredPricingTermList() {
      return this.pricingTermList
        .filter(
          term =>
            this.showInactive ||
            moment.utc(term.effectiveTo).isSameOrAfter(moment.utc(), 'day')
        )
        .map(term => ({
          ...term,
          inactive: moment.utc(term.effectiveTo).isBefore(moment.utc(), 'day')
        }));
    }
  },
  updated() {
    if (this.toggleRowId) {
      const row = this.$refs.pricingTermList.data.filter(
        term => term.id === this.toggleRowId
      )[0];
      this.$refs.pricingTermList.toggleRowExpansion(row, true);
      this.toggleRowId = null;
    }
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return `${formatDate(row.effectiveFrom)} — ${formatDate(
        row.effectiveTo
      )}`;
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
      this.$modal.show('new-pricing-term', {
        contractId: this.selectedContract.id
      });
    },
    showCopyPricingTermModal(pricingTerm) {
      this.$modal.show('copy-pricing-term', {
        pricingTerm,
        contractId: this.selectedContract.id
      });
    },
    showEditPricingTermModal(pricingTerm) {
      this.$modal.show('edit-pricing-term', { pricingTerm });
    },
    showDeletePricingTermModal(idList) {
      this.$modal.show('delete-pricing-term', {
        contractId: this.selectedContract.id,
        idList
      });
    },
    showChangeAppliedOrderModal() {
      this.$modal.show('change-pricing-term-order', {
        contractId: this.selectedContract.id
      });
    },
    showBulkActionModal(value) {
      this.$modal.show('bulk-action-modal', {
        bulkActionId: value
      });
    },
    toggleNoteModal(pricingTerm) {
      this.$modal.show('save-note', {
        parentId: pricingTerm.id,
        important: pricingTerm.noteImportant
      });
    },
    bulkAction(value) {
      if (value === PRICING_TERM_LOOKUP.BULK_ACTION_DELETE) {
        this.showDeletePricingTermModal(this.bulkIdList);
      } else if (value === PRICING_TERM_LOOKUP.BULK_ACTION_QC) {
        this.togglePricingTermQC(this.bulkIdList);
      } else {
        this.showBulkActionModal(value);
      }
    },
    clearBulkActions() {
      this.bulkIdList = [];
      this.bulkActionId = null;
    },
    clearBulkActionSelection() {
      this.bulkActionId = null;
    },
    toggleRow(id) {
      this.toggleRowId = id;
    },
    async togglePricingTermQC(idList) {
      try {
        await this.$apollo.mutate({
          mutation: TOGGLE_PRICING_TERM_QC,
          variables: {
            contractId: this.selectedContract.id,
            idList
          },
          refetchQueries: () => [
            {
              query: GET_CONTRACT,
              variables: { id: this.selectedContract.id }
            }
          ]
        });
        this.clearBulkActions();
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
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
#app {
  .el-table {
    th {
      &.sort-cell {
        .cell {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
.sort-icon {
  font-size: 1.5em;
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
.note-count-container {
  position: relative;
  display: inline;
  cursor: pointer;
  .note-count {
    position: absolute;
    color: $dove-gray;
    left: 4px;
    top: -2px;
    &.empty {
      color: white;
    }
  }
}
</style>
