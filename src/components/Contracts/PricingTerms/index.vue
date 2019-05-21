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
          <Discounts :pricing-term-id="props.row.id" />
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
            @change="togglePricingTermQC(props.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="discountTotal"
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
            v-if="
              props.row.pointOfSaleList.length &&
                props.row.pointOfOriginList.length
            "
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
          <span v-else>
            <span>{{
              props.row.pointOfSaleList.length
                ? props.row.pointOfSaleList.join('')
                : 0
            }}</span>
            <span> / </span>
            <span>{{
              props.row.pointOfOriginList.length
                ? props.row.pointOfOriginList.join('')
                : 0
            }}</span>
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
          <el-tooltip
            v-if="props.row.note && props.row.note.noteList.length"
            effect="dark"
            content="Show Note"
            placement="top"
          >
            <div class="note-count-container">
              <i
                class="fas fa-sticky-note"
                :class="{ important: props.row.note.important }"
                @click="toggleNoteModal(props.row)"
              />
              <!-- <span class="note-count sub-content empty">{{
                getNoteLength(props.row.discountList)
              }}</span> -->
            </div>
          </el-tooltip>
          <el-tooltip v-else effect="dark" content="Show Note" placement="top">
            <div class="note-count-container">
              <i
                class="far fa-sticky-note"
                :class="{
                  important: props.row.note && props.row.note.important
                }"
                @click="toggleNoteModal(props.row)"
              />
              <!-- <span class="note-count sub-content">{{
                getNoteLength(props.row.discountList)
              }}</span> -->
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
import NoteModal from './NoteModal';
import Discounts from './Discounts';
import ChangeAppliedOrderModal from './ChangeAppliedOrderModal';
export default {
  name: 'PricingTerms',
  components: {
    Navigation,
    Discounts,
    CopyPricingTermModal,
    NewPricingTermModal,
    EditPricingTermModal,
    DeletePricingTermModal,
    NoteModal,
    ChangeAppliedOrderModal
  },
  apollo: {
    pricingTermList: {
      query: GET_PRICING_TERM_LIST,
      variables() {
        return {
          contractId: this.selectedContract.id
        };
      }
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
    filteredPricingTermList() {
      return this.pricingTermList
        .filter(term => this.showInactive || term.effectiveTo > new Date())
        .map(term => ({
          ...term,
          inactive: term.effectiveTo < new Date()
        }));
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
    showChangeAppliedOrderModal() {
      this.$modal.show('change-pricing-term-order');
    },
    toggleNoteModal(pricingTerm) {
      this.$modal.show('save-note', {
        id: pricingTerm.id,
        note: pricingTerm.note
      });
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
    },
    getNoteLength(discountList) {
      const length = discountList.filter(
        discount => discount.note && discount.note.noteList.length
      ).length;
      return length ? length : null;
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
