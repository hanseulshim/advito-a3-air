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
          pluralize('target term', filteredTargetTermList.length)
        }}</span>
      </div>
      <div class="menu-container">
        <el-checkbox v-model="showInactive">Show inactive</el-checkbox>
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
          + NEW TARGET TERM
        </button>
      </div>
    </div>
    <el-table
      ref="pricingTermList"
      :data="filteredTargetTermList"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <TargetLevel :target-term-id="props.row.id" />
        </template>
      </el-table-column>
      <el-table-column
        prop="order"
        sortable
        :sort-orders="['ascending', 'descending']"
        :min-width="term.appliedOrder"
        class-name="sort-cell"
      >
        <template slot="header">
          <el-tooltip content="Order" placement="top" effect="dark">
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
        :min-width="term.targetName"
      >
        <template slot-scope="props">
          <div :class="{ 'error-qc': checkErrorQc(props.row.qc) }">
            <i v-if="props.row.internalTarget" class="fas fa-eye-slash" />{{
              props.row.name
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Effective Dates"
        :min-width="term.effectiveDates"
        :formatter="formatDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveEndDate"
      />
      <el-table-column
        sortable
        sort-by="timeframe"
        :sort-orders="['ascending', 'descending']"
        label="Timeframe"
        :min-width="term.timeframe"
      >
        <template slot-scope="props">
          {{ props.row.timeframe && `${props.row.timeframe} m` }}
        </template>
      </el-table-column>
      <el-table-column
        label="QC"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="qc"
        :min-width="term.qc"
      >
        <template slot-scope="props">
          <el-checkbox
            :class="{ invalid: props.row.qc !== 1 }"
            :value="props.row.qc === 1"
            @change="togglePricingTermQC(props.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="Soft?"
        sortable
        sort-by="softTarget"
        :sort-orders="['ascending', 'descending']"
        :min-width="term.softTarget"
      >
        <template slot-scope="props">
          {{ props.row.softTarget ? 'Y' : '' }}
        </template>
      </el-table-column>
      <el-table-column
        label="Type"
        prop="targetType"
        :min-width="term.targetType"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="targetType"
      />
      <el-table-column label="Cabins" :min-width="term.cabins">
        <template slot-scope="props">
          {{ props.row.cabinF ? 'F' : '' }}
          {{ props.row.cabinB ? 'B' : '' }}
          {{ props.row.cabinP ? 'P' : '' }}
          {{ props.row.cabinE ? 'E' : '' }}
        </template>
      </el-table-column>
      <el-table-column
        label="Amount"
        :min-width="term.amount"
        :formatter="row => formatPercent(row.targetAmount)"
      />
      <el-table-column
        label="QSI"
        :min-width="term.qsi"
        :formatter="row => formatPercent(row.qsi)"
      />
      <el-table-column
        label="Incentive"
        prop="incentiveType"
        :min-width="term.incentiveType"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="incentiveType"
      />
      <el-table-column
        label="Levels"
        prop="levelTotal"
        :min-width="term.levels"
      />
      <el-table-column label="Rules" prop="ruleTotal" :min-width="term.rules">
        <template slot-scope="props">
          <button class="button number">{{ props.row.ruleTotal }}</button>
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
          <el-tooltip effect="dark" content="Copy Target Term" placement="top">
            <i
              class="far fa-copy icon-spacer"
              @click="showCopyPricingTermModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Edit Target Term" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditPricingTermModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="Delete Target Term"
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
  </div>
</template>

<script>
import Navigation from '../Navigation';
import { pluralize, formatDate, formatPercent } from '@/helper';
import { term } from '@/config';
import { GET_TARGET_TERM_LIST } from '@/graphql/queries';
import { TOGGLE_PRICING_TERM_QC } from '@/graphql/mutations';
import TargetLevel from './TargetLevel';
export default {
  name: 'TargetTerms',
  components: {
    Navigation,
    TargetLevel
  },
  props: {
    selectedContract: {
      type: Object,
      required: true
    }
  },
  apollo: {
    targetTermList: {
      query: GET_TARGET_TERM_LIST
    }
  },
  data() {
    return {
      targetTermList: [],
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
    filteredTargetTermList() {
      return this.targetTermList
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
    formatPercent(num) {
      return formatPercent(num);
    },
    checkQc() {
      return this.targetTermList.some(term => term.qc !== 1);
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
.fas.fa-eye-slash {
  margin-right: 5px;
  cursor: default;
}
</style>
