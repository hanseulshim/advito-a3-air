<template>
  <modal
    classes="modal-container"
    name="new-normalization-market-modal"
    height="auto"
    width="1200px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">new normalization market</div>
      <i class="fas fa-times close-modal-button" @click="hideModal"></i>
    </div>
    <div class="newMarketContainer">
      <el-form
        ref="newMarket"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="150px"
        hide-required-asterisk
        class="newMarketForm"
      >
        <div class="flex-row space-between">
          <el-form-item
            label="Select New Market *"
            class="flex2"
            prop="topMarket"
          >
            <el-select
              v-model="form.topMarket"
              placeholder="Select Top Market"
              value-key="id"
            >
              <el-option
                v-for="item in topMarketList"
                :key="item.index"
                :label="`${item.marketA} - ${item.marketB}`"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Override Usage" class="flex1">
            <el-input v-model="form.usageOverride" type="number" />
          </el-form-item>
          <el-form-item label="Travel Date *" class="flex1" prop="farePullDate">
            <el-date-picker
              v-model="form.farePullDate"
              format="dd MMM yyyy"
              placeholder="Pick a day"
              class="date-picker"
            />
          </el-form-item>
        </div>
        <div class="flex-row">
          <el-form-item label="Notes" class="flex1">
            <el-input
              v-model="form.notes"
              v-loading="$apollo.loading"
              class="market-notes"
              placeholder="Enter note here"
              type="textarea"
            />
          </el-form-item>
        </div>
        <div class="flex-row">
          <el-form-item label="Fare Basis" class="flex1">
            <el-input v-model="form.fareBasis" />
          </el-form-item>
          <el-form-item label="RT/OW" class="flex1" prop="directionType">
            <el-select v-model="form.directionType">
              <el-option
                v-for="item in directionOptions"
                :key="item.index"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Amount" class="flex1" prop="amount">
            <el-input v-model="form.amount" type="number" />
          </el-form-item>
          <el-form-item label="Currency" class="flex1" prop="currencyCode">
            <el-select v-model="form.currencyCode">
              <el-option
                v-for="item in currencyList"
                :key="item.index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="AP (Days)" class="flex1" prop="advancePurchase">
            <el-input v-model="form.advancePurchase" type="number" />
          </el-form-item>
          <el-form-item label="Min Stay (Days)" class="flex1" prop="minstay">
            <el-input v-model="form.minstay" type="number" />
          </el-form-item>
        </div>
        <el-form-item class="save-container">
          <button class="button" type="button" @click="validateForm">
            SAVE
          </button>
        </el-form-item>
      </el-form>
      <div class="newMarketTables">
        <div class="flex-row">
          <el-table
            :data="tableData"
            stripe
            :cell-style="{ padding: '0', height: '20px' }"
          >
            <el-table-column prop="label" label="Adv. Tkt. (Days)" width="auto">
            </el-table-column>
            <el-table-column prop="percent" width="75">
              <template slot-scope="props">
                {{ props.row.percent }}%
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="tableData2"
            stripe
            :cell-style="{ padding: '0', height: '20px' }"
            size="small"
          >
            <el-table-column prop="label" label="Departure" width="100">
            </el-table-column>
            <el-table-column prop="percent" width="100">
              <template slot-scope="props">
                {{ props.row.percent }}%
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="flex-row">
          <el-table
            :data="tableData3"
            stripe
            :cell-style="{ padding: '0', height: '20px' }"
            style="margin-top: 20px"
          >
            <el-table-column prop="fareBasis" label="Fare Basis">
            </el-table-column>
            <el-table-column prop="bookingClass" label="Booking Class">
            </el-table-column>
            <el-table-column prop="usage" label="Usage"
              ><template slot-scope="props">
                {{ props.row.usage }}%
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import {
  GET_TOP_MARKET_LIST,
  GET_CURRENCY_LIST,
  GET_NORMALIZATION_MARKET_LIST
} from '@/graphql/queries';
import { CREATE_NORMALIZATION_MARKET } from '@/graphql/mutations';
export default {
  name: 'NewNormalizationMarketModal',
  apollo: {
    topMarketList: {
      query: GET_TOP_MARKET_LIST,
      variables() {
        return {
          normalizationId: this.normalization.id
        };
      }
    },
    currencyList: {
      query: GET_CURRENCY_LIST
    }
  },
  data() {
    return {
      topMarketList: [],
      currencyList: [],
      normalization: {},
      form: {
        topMarket: null,
        notes: '',
        usageOverride: null,
        farePullDate: null,
        id: null,
        fareType: 1,
        fareBasis: null,
        amount: null,
        currencyCode: null,
        directionType: null,
        advancePurchase: null,
        minstay: null
      },
      directionOptions: [{ label: 'RT', value: 1 }, { label: 'OW', value: 2 }],
      rules: {
        topMarket: [
          {
            required: true,
            message: 'Please select a top market.',
            trigger: 'change'
          }
        ],
        farePullDate: [
          {
            required: true,
            message: 'Please input a travel date.',
            trigger: 'change'
          }
        ],
        amount: [
          {
            required: true,
            message: 'Please input an amount.',
            trigger: 'change'
          }
        ],
        currencyCode: [
          {
            required: true,
            message: 'Please select a currency.',
            trigger: 'change'
          }
        ],
        directionType: [
          {
            required: true,
            message: 'Please select a direction type.',
            trigger: 'change'
          }
        ],
        advancePurchase: [
          {
            required: true,
            message: 'Please input advance purchase days',
            trigger: 'change'
          }
        ],
        minstay: [
          {
            required: true,
            message: 'Please input a minimum stay',
            trigger: 'change'
          }
        ]
      },
      tableData: [
        {
          label: '0-2',
          percent: 5
        },
        {
          label: '3-4',
          percent: 20
        },
        {
          label: '7-10',
          percent: 11
        },
        {
          label: '14-20',
          percent: 25
        },
        {
          label: '21+',
          percent: 10
        }
      ],
      tableData2: [
        {
          label: 'Sunday',
          percent: 5
        },
        {
          label: 'Monday',
          percent: 20
        },
        {
          label: 'Tuesday',
          percent: 11
        },
        {
          label: 'Wednesday',
          percent: 25
        },
        {
          label: 'Thursday',
          percent: 10
        },
        {
          label: 'Friday',
          percent: 10
        },
        {
          label: 'Saturday',
          percent: 10
        }
      ],
      tableData3: [
        {
          fareBasis: 'DGFBLM',
          bookingClass: 'D',
          usage: 98
        },
        {
          fareBasis: 'J1NQO4C5',
          bookingClass: 'D',
          usage: 2
        }
      ]
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-normalization-market-modal');
    },
    validateForm() {
      this.$refs.newMarket.validate(valid => {
        if (valid) {
          this.newMarket();
        } else {
          return false;
        }
      });
    },
    rowClassName() {
      return 'rowStyle';
    },
    async newMarket() {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_NORMALIZATION_MARKET,
          variables: {
            normalizationId: this.normalization.id,
            marketA: this.form.topMarket.marketA,
            marketB: this.form.topMarket.marketB,
            farePaid: this.form.topMarket.farePaid,
            usageOverride: parseInt(this.form.usageOverride),
            farePullDate: this.form.farePullDate,
            notes: this.form.notes,
            fareList: [
              {
                id: null,
                fareType: this.form.fareType,
                fareBasis: this.form.fareBasis,
                amount: parseInt(this.form.amount),
                currencyCode: this.form.currencyCode,
                directionType: this.form.directionType,
                advancePurchase: this.form.advancePurchase,
                minstay: this.form.minstay
              }
            ]
          },
          refetchQueries: () => [
            {
              query: GET_NORMALIZATION_MARKET_LIST,
              fetchPolicy: 'network-only',
              variables: {
                normalizationId: this.normalization.id
              }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Normalization market successfully created.',
          name: 'new-normalization-market-modal'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.normalization = event.params.normalization;
    },
    beforeClose() {
      this.form.topMarket = null;
      this.form.notes = '';
      this.form.usageOverride = null;
      this.form.farePullDate = null;
      this.form.id = null;
      this.form.fareType = 1;
      this.form.fareBasis = null;
      this.form.amount = null;
      this.form.currencyCode = null;
      this.form.directionType = null;
      this.form.advancePurchase = null;
      this.form.minstay = null;
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/global.scss';
@import './styles.scss';

.newMarketContainer {
  display: flex;

  .newMarketForm {
    flex: 2;
    margin-right: 2em;
    .el-form-item {
      margin-right: 1em;
    }
  }

  .flex-row {
    display: flex;

    .el-table {
      margin-right: 1em;
    }
  }

  .flex1 {
    flex: 1;
  }

  .flex2 {
    flex: 2;
  }

  .flex3 {
    flex: 3;
  }

  .space-between {
    justify-content: space-between;
  }

  .newMarkettables {
    flex: 1;
  }

  .inline {
    display: inline;
  }

  .rowStyle {
    height: 15px;
  }
}
</style>
