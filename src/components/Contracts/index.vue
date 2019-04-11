<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      <div>
        <el-tooltip v-if="checkQc" placement="top" effect="light">
          <div slot="content">QC must be 100%</div>
          <i class="fas fa-exclamation-circle" />
        </el-tooltip>
        <span>{{ pluralize('contract', contractList.length) }}</span>
      </div>
      <button class="button long" @click="showNewContractModal">
        + NEW CONTRACT
      </button>
    </div>
    <el-table
      ref="contractList"
      :data="contractList"
      :default-sort="{ prop: 'name', order: 'ascending' }"
    >
      <el-table-column
        prop="name"
        label="Airline Name"
        :width="tableColumnWidth.code"
        sortable
      />
      <el-table-column
        prop="type"
        label="Type"
        :width="tableColumnWidth.count"
        sortable
      />
      <el-table-column prop="description" label="Description" />
      <el-table-column
        label="Round"
        :width="tableColumnWidth.count"
        sortable
        sort-by="round"
      >
        <template slot-scope="props">{{
          props.row.round ? props.row.round : '—'
        }}</template>
      </el-table-column>
      <el-table-column
        label="Effective Dates"
        :width="tableColumnWidth.date"
        :formatter="formatDate"
        sortable
        sort-by="effectiveEndDate"
      />
      <el-table-column
        label="QC"
        :width="tableColumnWidth.short"
        sortable
        sort-by="qc"
        :formatter="formatPercent"
      >
        <template slot-scope="props">
          <div :class="{ 'error-qc': checkErrorQc(props.row.qc) }">
            {{ formatPercent(props.row.qc) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Pricing Terms" :width="tableColumnWidth.count">
        <template slot-scope="props">
          <el-tooltip
            effect="dark"
            content="View Pricing Terms"
            placement="top"
          >
            <button class="button number">
              {{ props.row.pricingTermTotal }}
            </button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Target Terms" :width="tableColumnWidth.count">
        <template slot-scope="props">
          <el-tooltip effect="dark" content="View Target Terms" placement="top">
            <button class="button number">
              {{ props.row.targetTermTotal }}
            </button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="PoS/PoO" :width="tableColumnWidth.count">
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
                  props.row.pointOfSaleList.length > 1
                    ? props.row.pointOfSaleList.length
                    : props.row.pointOfSaleList.join('')
                }}
              </span>
              <span v-if="props.row.pointOfOriginList.length"> / </span>
              <span>{{
                props.row.pointOfOriginList.length > 1
                  ? props.row.pointOfOriginList.length
                  : props.row.pointOfOriginList.join('')
              }}</span>
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Airlines" :width="tableColumnWidth.count">
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
            {{ props.row.airlineList.join('') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" :width="tableColumnWidth.actions">
        <template slot-scope="props">
          <i
            class="far fa-copy icon-spacer"
            @click="showCopyContractModal(props.row.id)"
          />
          <i class="fas fa-pencil-alt icon-spacer" />
          <i class="fas fa-trash-alt" />
        </template>
      </el-table-column>
    </el-table>
    <NewContractModal />
    <CopyContractModal />
  </div>
</template>

<script>
import { pluralize, formatDate, formatPercent } from '@/helper';
import { GET_CONTRACT_LIST } from '@/graphql/queries';
import { tableColumnWidth } from '@/config';
import NewContractModal from './NewContractModal';
import CopyContractModal from './CopyContractModal';
export default {
  name: 'Contracts',
  components: {
    NewContractModal,
    CopyContractModal
  },
  apollo: {
    contractList: {
      query: GET_CONTRACT_LIST
    }
  },
  data() {
    return {
      contractList: [],
      tableColumnWidth
    };
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return formatDate(row.effectiveEndDate);
    },
    formatPercent(num) {
      return formatPercent(num);
    },
    checkQc() {
      return this.contractList.some(contract => contract.qc !== 1);
    },
    checkErrorQc(qc) {
      return qc !== 1;
    },
    showNewContractModal() {
      this.$modal.show('new-contract');
    },
    showCopyContractModal(id) {
      this.$modal.show('copy-contract', { id });
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.error-qc {
  color: $monza;
}
.pos-popup-container {
  max-width: 300px;
  &.el-tooltip__popper {
    line-height: 1.5;
  }
}
</style>
