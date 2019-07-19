<template>
  <modal
    classes="modal-container"
    name="new-target-term"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="newTargetTerm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="160px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">new target term</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <el-form-item label="Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Target Type *" prop="targetTypeId">
        <el-select
          v-model="form.targetTypeId"
          class="select-modal"
          @change="updateType"
        >
          <el-option
            v-for="item in targetTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="
          form.targetTypeId === TARGET_TERM_LOOKUP.REVENUE ||
            form.targetTypeId === TARGET_TERM_LOOKUP.KPG
        "
        label="Currency *"
        prop="currencyId"
      >
        <el-select v-model="form.currencyId" filterable class="select-modal">
          <el-option
            v-for="item in currencyList"
            :key="item.id"
            :label="`${item.name}  (${item.code})`"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="
          form.targetTypeId === TARGET_TERM_LOOKUP.REVENUE ||
            form.targetTypeId === TARGET_TERM_LOOKUP.SEGMENT
        "
        label="Timeframe"
        prop="timeframe"
      >
        <div class="text-input-container">
          <el-input v-model.number="form.timeframe" />
          <span>Months</span>
        </div>
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId !== TARGET_TERM_LOOKUP.KPG"
        label="Cabins *"
      >
        <el-checkbox v-model="form.cabinF">F</el-checkbox>
        <el-checkbox v-model="form.cabinC">C</el-checkbox>
        <el-checkbox v-model="form.cabinP">P</el-checkbox>
        <el-checkbox v-model="form.cabinY">Y</el-checkbox>
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId !== TARGET_TERM_LOOKUP.KPG"
        label="Incentive Type"
      >
        <el-select v-model="form.incentiveTypeId" class="select-modal">
          <el-option
            v-for="item in incentiveTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId !== TARGET_TERM_LOOKUP.KPG"
        label="Served Market QSI Threshold *"
        prop="qsi"
      >
        <div class="text-input-container qsi">
          <el-input v-model.number="form.qsi" />
          <span>
            {{
              form.targetTypeId === 21 || form.targetTypeId === 20
                ? '%'
                : form.targetTypeId === 24
                ? 'points'
                : ''
            }}
          </span>
        </div>
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId !== TARGET_TERM_LOOKUP.KPG"
        label="Soft Target?"
      >
        <el-checkbox v-model="form.softTarget" />
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId !== TARGET_TERM_LOOKUP.KPG"
        label="Internal Target?"
      >
        <el-checkbox v-model="form.internalTarget" />
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId === TARGET_TERM_LOOKUP.KPG"
        label="DPM Price *"
        prop="dpmPrice"
      >
        <el-input v-model="form.dpmPrice" />
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId === TARGET_TERM_LOOKUP.KPG"
        label="DPM Start Date *"
      >
        <div class="date-picker-container">
          <el-form-item prop="dpmStartDate" class="date-picker-item">
            <el-date-picker
              v-model="form.dpmStartDate"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId === TARGET_TERM_LOOKUP.KPG"
        label="Baseline Date Range *"
      >
        <div class="date-picker-container">
          <el-form-item prop="baselineDateFrom" class="date-picker-item">
            <el-date-picker
              v-model="form.baselineDateFrom"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item prop="baselineDateTo" class="date-picker-item">
            <el-date-picker
              v-model="form.baselineDateTo"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId === TARGET_TERM_LOOKUP.KPG"
        label="Goal Date Range *"
      >
        <div class="date-picker-container">
          <el-form-item prop="goalDateFrom" class="date-picker-item">
            <el-date-picker
              v-model="form.goalDateFrom"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item prop="goalDateTo" class="date-picker-item">
            <el-date-picker
              v-model="form.goalDateTo"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId === TARGET_TERM_LOOKUP.KPG"
        label="From Airline Group"
      >
        <div class="date-picker-container">
          <el-form-item class="date-picker-item">
            <el-date-picker
              v-model="form.airlineGroupFrom"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item class="date-picker-item">
            <el-date-picker
              v-model="form.airlineGroupTo"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item
        v-if="form.targetTypeId === TARGET_TERM_LOOKUP.KPG"
        label="From Fare Category"
      >
        <div class="date-picker-container">
          <el-form-item class="date-picker-item">
            <el-date-picker
              v-model="form.fareCategoryFrom"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item class="date-picker-item">
            <el-date-picker
              v-model="form.fareCategoryTo"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_TARGET_TERM_LIST,
  GET_TARGET_TYPE_LIST,
  GET_INCENTIVE_TYPE_LIST,
  GET_CURRENCY_LIST,
  GET_CONTRACT
} from '@/graphql/queries';
import { TARGET_TERM_LOOKUP } from '@/graphql/constants';
import { CREATE_TARGET_TERM } from '@/graphql/mutations';
export default {
  name: 'NewTargetTermModal',
  apollo: {
    targetTypeList: {
      query: GET_TARGET_TYPE_LIST,
      result({ data: { targetTypeList } }) {
        return (this.targetTypeList = targetTypeList.filter(
          type => type.id !== 28
        ));
      }
    },
    incentiveTypeList: {
      query: GET_INCENTIVE_TYPE_LIST
    },
    currencyList: {
      query: GET_CURRENCY_LIST
    }
  },
  data() {
    return {
      targetTypeList: [],
      incentiveTypeList: [],
      currencyList: [],
      TARGET_TERM_LOOKUP,
      form: {
        contractId: null,
        name: null,
        targetTypeId: null,
        currencyId: null,
        cabinF: true,
        cabinC: true,
        cabinP: true,
        cabinY: true,
        incentiveTypeId: TARGET_TERM_LOOKUP.NONE,
        qsi: 0,
        softTarget: null,
        internalTarget: null,
        timeframe: null,
        dpmPrice: null,
        dpmStartDate: null,
        baselineDateFrom: null,
        baselineDateTo: null,
        goalDateFrom: null,
        goalDateTo: null,
        airlineGroupFrom: null,
        airlineGroupTo: null,
        fareCategoryFrom: null,
        fareCategoryTo: null
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a target term name.',
            trigger: 'change'
          }
        ],
        targetTypeId: [
          {
            required: true,
            message: 'Please select a target type.',
            trigger: 'change'
          }
        ],
        timeframe: [{ type: 'number', message: 'Timeframe must be a number' }],
        currencyId: [
          {
            required: true,
            message: 'Please select a currency.',
            trigger: 'change'
          }
        ],
        qsi: [
          {
            required: true,
            message: 'Please input a QSI',
            trigger: 'change'
          }
        ],
        dpmPrice: [
          {
            required: true,
            message: 'Please input a DPM Price',
            trigger: 'change'
          }
        ],
        dpmStartDate: [
          {
            required: true,
            message: 'Please select a DPM Start date',
            trigger: 'change'
          }
        ],
        baselineDateFrom: [
          {
            required: true,
            message: 'Please select a baseline date',
            trigger: 'change'
          }
        ],
        baselineDateTo: [
          {
            required: true,
            message: 'Please select a baseline end date',
            trigger: 'change'
          }
        ],
        goalDateFrom: [
          {
            required: true,
            message: 'Please select a goal start date',
            trigger: 'change'
          }
        ],
        goalDateTo: [
          {
            required: true,
            message: 'Please select a goal end date',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-target-term');
    },
    validateForm() {
      this.$refs.newTargetTerm.validate(valid => {
        if (valid) {
          this.createTargetTerm();
        } else {
          return false;
        }
      });
    },
    updateType(value) {
      if (
        value !== TARGET_TERM_LOOKUP.REVENUE &&
        value !== TARGET_TERM_LOOKUP.KPG
      ) {
        this.form.currencyId = null;
      }
      if (
        value !== TARGET_TERM_LOOKUP.REVENUE &&
        value !== TARGET_TERM_LOOKUP.SEGMENT
      ) {
        this.form.timeframe = null;
      }
      if (value !== TARGET_TERM_LOOKUP.KPG) {
        this.form.dpmPrice = null;
        this.form.dpmStartDate = null;
        this.form.baselineDateFrom = null;
        this.form.baselineDateTo = null;
        this.form.goalDateFrom = null;
        this.form.goalDateTo = null;
        this.form.airlineGroupFrom = null;
        this.form.airlineGroupTo = null;
        this.form.fareCategoryFrom = null;
        this.form.fareCategoryTo = null;
      }
    },
    async createTargetTerm() {
      try {
        if (this.form.dpmPrice) {
          this.form.dpmPrice = parseFloat(this.form.dpmPrice);
        }

        await this.$apollo.mutate({
          mutation: CREATE_TARGET_TERM,
          variables: {
            ...this.form,
            qsi:
              this.form.targetTypeId === TARGET_TERM_LOOKUP.REVENUE_SHARE ||
              this.form.targetTypeId === TARGET_TERM_LOOKUP.SEGMENT_SHARE
                ? this.form.qsi / 100
                : this.form.qsi
          },
          update: (store, { data: { createTargetTerm } }) => {
            const query = {
              query: GET_TARGET_TERM_LIST,
              variables: {
                contractId: this.form.contractId
              }
            };
            const data = store.readQuery(query);
            data.targetTermList.push(createTargetTerm);
            store.writeQuery({
              ...query,
              data
            });
          },
          refetchQueries: () => [
            {
              query: GET_CONTRACT,
              variables: { id: this.form.contractId }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Target Term successfully created.',
          name: 'new-target-term'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.form.contractId = event.params.contractId;
    },
    beforeClose() {
      this.form.name = null;
      this.form.targetTypeId = null;
      this.form.currencyId = null;
      this.form.cabinF = true;
      this.form.cabinC = true;
      this.form.cabinP = true;
      this.form.cabinY = true;
      this.form.incentiveTypeId = TARGET_TERM_LOOKUP.NONE;
      this.form.qsi = 0;
      this.form.softTarget = null;
      this.form.internalTarget = null;
      this.form.timeframe = null;
      this.form.dpmPrice = null;
      this.form.dpmStartDate = null;
      this.form.baselineDateFrom = null;
      this.form.baselineDateTo = null;
      this.form.goalDateFrom = null;
      this.form.goalDateTo = null;
      this.form.airlineGroupFrom = null;
      this.form.airlineGroupTo = null;
      this.form.fareCategoryFrom = null;
      this.form.fareCategoryTo = null;
    }
  }
};
</script>

<style lang="scss">
.text-input-container {
  .el-input {
    width: 80%;
  }
  span {
    margin-left: 10px;
  }
  &.qsi {
    margin-top: 20px;
  }
}
</style>
