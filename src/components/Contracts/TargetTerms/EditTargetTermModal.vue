<template>
  <modal
    classes="modal-container"
    name="edit-target-term"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="editTargetTerm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="160px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">edit target term</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <el-form-item label="Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Target Type *" prop="targetTypeId">
        <el-select v-model="targetTypeId" disabled class="select-modal">
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
          targetTypeId === TARGET_TERM_LOOKUP.REVENUE ||
            targetTypeId === TARGET_TERM_LOOKUP.KPG
        "
        label="Currency *"
        prop="currencyId"
      >
        <el-select v-model="form.currencyId" class="select-modal">
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
          targetTypeId === TARGET_TERM_LOOKUP.REVENUE ||
            targetTypeId === TARGET_TERM_LOOKUP.SEGMENT
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
        v-if="targetTypeId !== TARGET_TERM_LOOKUP.KPG"
        label="Cabins *"
      >
        <el-checkbox v-model="form.cabinF">F</el-checkbox>
        <el-checkbox v-model="form.cabinC">C</el-checkbox>
        <el-checkbox v-model="form.cabinP">P</el-checkbox>
        <el-checkbox v-model="form.cabinY">Y</el-checkbox>
      </el-form-item>
      <el-form-item
        v-if="targetTypeId !== TARGET_TERM_LOOKUP.KPG"
        label="Incentive Type"
      >
        <el-select v-model="incentiveTypeId" disabled class="select-modal">
          <el-option
            v-for="item in incentiveTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="targetTypeId !== TARGET_TERM_LOOKUP.KPG"
        label="Served Market QSI Threshold *"
        prop="qsi"
      >
        <div class="text-input-container qsi">
          <el-input v-model.number="form.qsi" />
          <span>
            {{
              targetTypeId === 21 || targetTypeId === 20
                ? '%'
                : targetTypeId === 24
                ? 'points'
                : ''
            }}
          </span>
        </div>
      </el-form-item>
      <el-form-item
        v-if="targetTypeId !== TARGET_TERM_LOOKUP.KPG"
        label="Soft Target?"
      >
        <el-checkbox v-model="form.softTarget" />
      </el-form-item>
      <el-form-item
        v-if="targetTypeId !== TARGET_TERM_LOOKUP.KPG"
        label="Internal Target?"
      >
        <el-checkbox v-model="form.internalTarget" />
      </el-form-item>
      <el-form-item
        v-if="targetTypeId === TARGET_TERM_LOOKUP.KPG"
        label="DPM Price *"
        prop="dpmPrice"
      >
        <el-input v-model="form.dpmPrice" />
      </el-form-item>
      <el-form-item
        v-if="targetTypeId === TARGET_TERM_LOOKUP.KPG"
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
        v-if="targetTypeId === TARGET_TERM_LOOKUP.KPG"
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
        v-if="targetTypeId === TARGET_TERM_LOOKUP.KPG"
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
        v-if="targetTypeId === TARGET_TERM_LOOKUP.KPG"
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
        v-if="targetTypeId === TARGET_TERM_LOOKUP.KPG"
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
  GET_TARGET_TYPE_LIST,
  GET_INCENTIVE_TYPE_LIST,
  GET_CURRENCY_LIST
} from '@/graphql/queries';
import { TARGET_TERM_LOOKUP } from '@/graphql/constants';
import { EDIT_TARGET_TERM } from '@/graphql/mutations';
export default {
  name: 'EditTargetTermModal',
  apollo: {
    targetTypeList: {
      query: GET_TARGET_TYPE_LIST
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
      targetTypeId: null,
      incentiveTypeId: null,
      form: {
        id: null,
        name: null,
        currencyId: null,
        cabinF: false,
        cabinC: false,
        cabinP: false,
        cabinY: false,
        qsi: null,
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
        timeframe: [{ type: 'number', message: 'Timeframe must be a number' }],
        currencyId: [
          {
            required: true,
            message: 'Please select a currency.',
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
      this.$modal.hide('edit-target-term');
    },
    validateForm() {
      this.$refs.editTargetTerm.validate(valid => {
        if (valid) {
          this.editTargetTerm();
        } else {
          return false;
        }
      });
    },
    async editTargetTerm() {
      try {

        const qsi = this.form.qsi || 0;

        await this.$apollo.mutate({
          mutation: EDIT_TARGET_TERM,
          variables: {
            ...this.form,
            qsi:
              this.targetTypeId === TARGET_TERM_LOOKUP.REVENUE_SHARE ||
              this.targetTypeId === TARGET_TERM_LOOKUP.SEGMENT_SHARE
                ? qsi / 100
                : qsi
          }
        });
        this.$modal.show('success', {
          message: 'Target Term successfully edited.',
          name: 'edit-target-term'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      const {
        id,
        name,
        targetTypeId,
        currencyId,
        cabinF,
        cabinC,
        cabinP,
        cabinY,
        incentiveTypeId,
        qsi,
        softTarget,
        internalTarget,
        timeframe,
        dpmPrice,
        dpmStartDate,
        baselineDateFrom,
        baselineDateTo,
        goalDateFrom,
        goalDateTo,
        airlineGroupFrom,
        airlineGroupTo,
        fareCategoryFrom,
        fareCategoryTo
      } = event.params.targetTerm;
      this.incentiveTypeId = incentiveTypeId;
      this.targetTypeId = targetTypeId;
      this.form.id = id;
      this.form.name = name;
      this.form.currencyId = currencyId;
      this.form.cabinF = cabinF;
      this.form.cabinC = cabinC;
      this.form.cabinP = cabinP;
      this.form.cabinY = cabinY;
      this.form.qsi =
        targetTypeId === 21 || targetTypeId === 20 ? qsi * 100 : qsi;
      this.form.softTarget = softTarget;
      this.form.internalTarget = internalTarget;
      this.form.timeframe = timeframe;
      this.form.dpmPrice = dpmPrice;
      this.form.dpmStartDate = dpmStartDate;
      this.form.baselineDateFrom = baselineDateFrom;
      this.form.baselineDateTo = baselineDateTo;
      this.form.goalDateFrom = goalDateFrom;
      this.form.goalDateTo = goalDateTo;
      this.form.airlineGroupFrom = airlineGroupFrom;
      this.form.airlineGroupTo = airlineGroupTo;
      this.form.fareCategoryFrom = fareCategoryFrom;
      this.form.fareCategoryTo = fareCategoryTo;
    },
    beforeClose() {
      this.targetTypeId = null;
      this.incentiveTypeId = null;
      this.form.id = null;
      this.form.name = null;
      this.form.currencyId = null;
      this.form.cabinF = false;
      this.form.cabinC = false;
      this.form.cabinP = false;
      this.form.cabinY = false;
      this.form.qsi = null;
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
