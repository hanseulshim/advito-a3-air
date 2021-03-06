<template>
  <div>
    <Navigation />
    <div class="title-row space-between">
      <div class="section-header">
        <el-tooltip
          v-if="targetTermList.some(term => !term.qc)"
          placement="top"
          effect="light"
        >
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
        <button class="button long" @click="showNewTargetTermModal">
          + NEW TARGET TERM
        </button>
      </div>
    </div>
    <el-table
      ref="targetTermList"
      v-loading="$apollo.loading"
      :data="filteredTargetTermList"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <TargetLevel
            :target-term-id="props.row.id"
            :target-type-id="props.row.targetTypeId"
            :incentive-type-id="props.row.incentiveTypeId"
            @toggle-row="toggleRow"
          />
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
            <i v-if="props.row.internalTarget" class="fas fa-eye-slash" />
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
            @change="toggleTargetTermQC([props.row.id])"
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
        prop="targetTypeName"
        :min-width="term.targetType"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column label="Cabins" :min-width="term.cabins">
        <template slot-scope="props">
          {{ props.row.cabinF ? 'F' : '' }}
          {{ props.row.cabinC ? 'C' : '' }}
          {{ props.row.cabinP ? 'P' : '' }}
          {{ props.row.cabinY ? 'Y' : '' }}
        </template>
      </el-table-column>
      <el-table-column
        label="Amount"
        :min-width="term.amount"
        :formatter="row => formatTargetAmount(row)"
      />
      <el-table-column
        label="QSI"
        :min-width="term.qsi"
        :formatter="row => formatPercent(row.qsi)"
      />
      <el-table-column
        label="Incentive"
        prop="incentiveTypeName"
        :min-width="term.incentiveType"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        label="Levels"
        prop="levelCount"
        :min-width="term.levels"
      />
      <el-table-column label="Rules" prop="ruleCount" :min-width="term.rules">
        <template slot-scope="props">
          <button class="button number" @click="toggleRulesModal(props.row)">
            {{ props.row.ruleCount || 0 }}
          </button>
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
            <i
              class="fa-sticky-note"
              :class="[
                { important: props.row.noteImportant },
                props.row.noteContent ? 'fas' : 'far'
              ]"
              @click="toggleNoteModal(props.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Actions" :min-width="term.actions">
        <template slot-scope="props">
          <el-tooltip effect="dark" content="Copy Target Term" placement="top">
            <i
              class="far fa-copy icon-spacer"
              @click="showCopyTargetTermModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Edit Target Term" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditTargetTermModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="Delete Target Term"
            placement="top"
          >
            <i
              class="fas fa-trash-alt"
              @click="showDeleteTargetTermModal([props.row.id])"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NewTargetTermModal />
    <CopyTargetTermModal />
    <EditTargetTermModal />
    <DeleteTargetTermModal @clear-bulk-actions="clearBulkActions" />
    <TargetTermNoteModal />
    <TargetTermRulesModal />
    <TargetTermBulkActionModal
      :bulk-id-list="bulkIdList"
      :parent-type="parentType"
      :parent-id="selectedContract.id"
      @clear-selection="clearBulkActionSelection"
      @toggle-row="toggleRow"
    />
  </div>
</template>

<script>
import Navigation from '../Navigation';
import { pluralize, formatDate } from '@/helper';
import { term } from '@/config';
import {
  GET_CONTRACT,
  GET_SELECTED_CONTRACT,
  GET_TARGET_TERM_LIST,
  GET_BULK_ACTION_LIST,
  GET_CONTRACT_LIST
} from '@/graphql/queries';
import {
  TOGGLE_TARGET_TERM_QC,
  UPDATE_PROJECT_STATUS
} from '@/graphql/mutations';
import { TARGET_TERM_LOOKUP } from '@/graphql/constants';
import TargetLevel from './TargetLevel';
import NewTargetTermModal from './NewTargetTermModal';
import CopyTargetTermModal from './CopyTargetTermModal';
import EditTargetTermModal from './EditTargetTermModal';
import DeleteTargetTermModal from './DeleteTargetTermModal';
import TargetTermNoteModal from './TargetTermNoteModal';
import TargetTermRulesModal from './TargetTermRulesModal';
import TargetTermBulkActionModal from './TargetTermBulkActionModal';
import moment from 'moment';
import numeral from 'numeral';

export default {
  name: 'TargetTerms',
  components: {
    Navigation,
    TargetLevel,
    NewTargetTermModal,
    CopyTargetTermModal,
    EditTargetTermModal,
    DeleteTargetTermModal,
    TargetTermNoteModal,
    TargetTermRulesModal,
    TargetTermBulkActionModal
  },
  apollo: {
    selectedContract: {
      query: GET_SELECTED_CONTRACT
    },
    targetTermList: {
      query: GET_TARGET_TERM_LIST,
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
          this.targetTermList = [];
        }
      },
      error() {
        // console.log(error);
      }
    },
    bulkActionList: {
      query: GET_BULK_ACTION_LIST,
      variables: {
        parentId: TARGET_TERM_LOOKUP.BULK_ACTION
      }
    }
  },
  data() {
    return {
      selectedContract: {},
      targetTermList: [],
      showInactive: false,
      bulkActionId: null,
      term,
      toggleRowId: null,
      bulkIdList: [],
      bulkActionList: [],
      parentType: TARGET_TERM_LOOKUP.RULE_TYPE
    };
  },
  computed: {
    filteredTargetTermList() {
      return this.targetTermList
        .filter(term => this.showInactive || term.effectiveTo > moment.utc())
        .map(term => ({
          ...term,
          inactive: term.effectiveTo < moment.utc()
        }));
    }
  },
  updated() {
    if (this.toggleRowId) {
      const row = this.$refs.targetTermList.data.filter(
        term => term.id === this.toggleRowId
      )[0];
      this.$refs.targetTermList.toggleRowExpansion(row, true);
    }
    this.toggleRowId = null;
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
    formatPercent(num) {
      return numeral(num).format('0.[0]%');
    },
    formatTargetAmount({ targetTypeId, targetAmount }) {
      if (
        targetTypeId === TARGET_TERM_LOOKUP.SEGMENT_SHARE ||
        targetTypeId === TARGET_TERM_LOOKUP.REVENUE_SHARE ||
        targetTypeId === TARGET_TERM_LOOKUP.SHARE_GAP ||
        targetTypeId === TARGET_TERM_LOOKUP.KPG
      ) {
        return this.formatPercent(targetAmount);
      } else {
        return targetAmount;
      }
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
    showNewTargetTermModal() {
      this.$modal.show('new-target-term', {
        contractId: this.selectedContract.id
      });
    },
    showCopyTargetTermModal(targetTerm) {
      this.$modal.show('copy-target-term', {
        contractId: this.selectedContract.id,
        targetTerm
      });
    },
    showEditTargetTermModal(targetTerm) {
      this.$modal.show('edit-target-term', { targetTerm });
    },
    showDeleteTargetTermModal(idList) {
      this.$modal.show('delete-target-term', {
        contractId: this.selectedContract.id,
        idList
      });
    },
    toggleRulesModal(term) {
      this.$modal.show('targetTermRulesModal', {
        term
      });
    },
    toggleNoteModal(targetTerm) {
      this.$modal.show('save-target-term-note', {
        parentId: targetTerm.id,
        important: targetTerm.noteImportant
      });
    },
    showBulkActionModal(value) {
      this.$modal.show('target-term-bulk-action-modal', {
        bulkActionId: value
      });
    },
    clearBulkActionSelection() {
      this.bulkActionId = null;
    },
    bulkAction(value) {
      if (value === TARGET_TERM_LOOKUP.BULK_ACTION_DELETE) {
        this.showDeleteTargetTermModal(this.bulkIdList);
      } else if (value === TARGET_TERM_LOOKUP.BULK_ACTION_QC) {
        this.toggleTargetTermQC(this.bulkIdList);
      } else {
        this.showBulkActionModal(value);
      }
    },
    clearBulkActions() {
      this.bulkIdList = [];
      this.bulkActionId = null;
    },
    async toggleTargetTermQC(idList) {
      try {
        await this.$apollo.mutate({
          mutation: TOGGLE_TARGET_TERM_QC,
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
        const { data } = await this.$apollo.query({
          query: GET_CONTRACT_LIST,
          fetchPolicy: 'network-only',
          variables: {
            projectId: parseInt(this.$route.params.projectId)
          }
        });
        const invalidStatus = data.contractList.some(
          contract => contract.qc !== 1
        );

        this.$apollo.mutate({
          mutation: UPDATE_PROJECT_STATUS,
          variables: {
            id: 3,
            status: invalidStatus ? 'invalid' : 'valid'
          }
        });
        this.clearBulkActions();
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    toggleRow(id) {
      this.toggleRowId = id;
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
.fas.fa-eye-slash {
  margin-right: 5px;
  cursor: default;
}
</style>
