<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      <div>
        <el-tooltip
          v-if="contractList.some(contract => !contract.qc)"
          placement="top"
          effect="light"
        >
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
      v-loading="$apollo.loading"
      :data="contractList"
      :default-sort="{ prop: 'name', order: 'ascending' }"
    >
      <el-table-column
        prop="name"
        label="Name"
        :min-width="contract.name"
        sortable
        :sort-orders="['ascending', 'descending']"
      >
        <template slot-scope="props">
          <div :class="checkErrorQc(props.row.qc) ? 'error-qc' : 'qc-complete'">
            {{ props.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="Type"
        :min-width="contract.type"
        sortable
        :sort-orders="['ascending', 'descending']"
      />
      <el-table-column
        prop="description"
        label="Description"
        :min-width="contract.description"
      />
      <el-table-column
        label="Round"
        :min-width="contract.round"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="round"
      >
        <template slot-scope="props">
          {{ props.row.round ? props.row.round : '—' }}
        </template>
      </el-table-column>
      <el-table-column
        label="Effective Dates"
        :min-width="contract.effectiveDates"
        :formatter="formatDate"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="effectiveTo"
      />
      <el-table-column
        label="QC"
        :min-width="contract.qc"
        sortable
        :sort-orders="['ascending', 'descending']"
        sort-by="qc"
      >
        <template slot-scope="props">
          <div :class="{ 'error-qc': checkErrorQc(props.row.qc) }">
            {{ formatPercent(props.row.qc) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Airlines" :min-width="contract.airlines">
        <template slot-scope="props">
          <el-tooltip
            v-if="props.row.airlineList.length > 1"
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
      <el-table-column label="PoS/PoO" :min-width="contract.pos">
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
      <el-table-column label="Pricing Terms" :min-width="contract.pricingTerms">
        <template slot-scope="props">
          <el-tooltip
            effect="dark"
            content="View Pricing Terms"
            placement="top"
          >
            <router-link
              :to="`/${$route.params.projectId}/contracts/pricing-terms`"
            >
              <button class="button number" @click="selectContract(props.row)">
                {{ props.row.pricingTermCount }}
              </button>
            </router-link>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Target Terms" :min-width="contract.targetTerms">
        <template slot-scope="props">
          <el-tooltip effect="dark" content="View Target Terms" placement="top">
            <router-link
              :to="`/${$route.params.projectId}/contracts/target-terms`"
            >
              <button class="button number" @click="selectContract(props.row)">
                {{ props.row.targetTermCount }}
              </button>
            </router-link>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Actions" :min-width="contract.actions">
        <template slot-scope="props">
          <el-tooltip effect="dark" content="Copy Contract" placement="top">
            <i
              class="far fa-copy icon-spacer"
              @click="showCopyContractModal(props.row.id)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Edit Contract" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditContractModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete Contract" placement="top">
            <i
              class="fas fa-trash-alt"
              @click="showDeleteContractModal(props.row.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NewContractModal />
    <CopyContractModal />
    <EditContractModal />
    <DeleteContractModal />
  </div>
</template>

<script>
import { pluralize, formatDate, formatPercent } from '@/helper';
import { GET_CONTRACT_LIST, GET_CLIENT, GET_PROJECT } from '@/graphql/queries';
import { UPDATE_CONTRACT } from '@/graphql/mutations';
import { contract } from '@/config';
import NewContractModal from './NewContractModal';
import CopyContractModal from './CopyContractModal';
import EditContractModal from './EditContractModal';
import DeleteContractModal from './DeleteContractModal';
export default {
  name: 'ContractList',
  components: {
    NewContractModal,
    CopyContractModal,
    EditContractModal,
    DeleteContractModal
  },
  apollo: {
    contractList: {
      query: GET_CONTRACT_LIST,
      variables() {
        return {
          projectId: this.project.id
        };
      }
    },
    client: {
      query: GET_CLIENT
    },
    project: {
      query: GET_PROJECT
    }
  },
  data() {
    return {
      client: {},
      project: {},
      contractList: [],
      contract
    };
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
      return formatPercent(num);
    },
    checkErrorQc(qc) {
      return qc !== 1;
    },
    showNewContractModal() {
      this.$modal.show('new-contract', {
        clientId: this.client.id,
        projectId: this.project.id
      });
    },
    showCopyContractModal(id) {
      this.$modal.show('copy-contract', { id, projectId: this.project.id });
    },
    showEditContractModal(contract) {
      this.$modal.show('edit-contract', { contract, clientId: this.client.id });
    },
    showDeleteContractModal(id) {
      this.$modal.show('delete-contract', { id, projectId: this.project.id });
    },
    selectContract(selectedContract) {
      this.$apollo.mutate({
        mutation: UPDATE_CONTRACT,
        variables: { selectedContract }
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.error-qc {
  color: $monza;
}

.qc-complete {
  color: #a1d071;
}
.pos-popup-container {
  max-width: 300px;
  &.el-tooltip__popper {
    line-height: 1.5;
  }
}
</style>
