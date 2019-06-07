<template>
  <modal
    classes="modal-container"
    name="new-target-term"
    height="auto"
    @before-close="beforeClose"
  >
    <el-form
      ref="newTargetTerm"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
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
        <el-select v-model="form.targetTypeId" class="select-modal">
          <el-option
            v-for="item in targetTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Currency *" prop="currency">
        <el-select v-model="form.currency" class="select-modal">
          <el-option
            v-for="item in currencyList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Cabins *">
        <el-checkbox v-model="form.cabinF">F</el-checkbox>
        <el-checkbox v-model="form.cabinB">B</el-checkbox>
        <el-checkbox v-model="form.cabinP">P</el-checkbox>
        <el-checkbox v-model="form.cabinE">E</el-checkbox>
      </el-form-item>
      <el-form-item label="Incentive Type">
        <el-select v-model="form.incentiveTypeId" class="select-modal">
          <el-option
            v-for="item in incentiveTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Served Market QSI Threshold *" prop="qsi">
        <div class="qsi-input-container">
          <el-input v-model.number="form.qsi" />
          <span>%</span>
        </div>
      </el-form-item>
      <el-form-item label="Soft Target?">
        <el-checkbox v-model="form.softTarget" />
      </el-form-item>
      <el-form-item label="Internal Target?">
        <el-checkbox v-model="form.internalTarget" />
      </el-form-item>
      <el-form-item label="Timeframe">
        <el-input v-model.number="form.timeframe" />
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
  GET_CURRENCY_LIST
} from '@/graphql/queries';
import { TARGET_TERM_LOOKUP } from '@/graphql/constants';
import { CREATE_TARGET_TERM } from '@/graphql/mutations';
export default {
  name: 'NewTargetTermModal',
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
      form: {
        name: null,
        targetTypeId: null,
        currency: null,
        cabinF: false,
        cabinB: false,
        cabinP: false,
        cabinE: false,
        incentiveTypeId: TARGET_TERM_LOOKUP.NONE,
        qsi: null,
        softTarget: null,
        internalTarget: null,
        timeframe: null
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
        currency: [
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
    async createTargetTerm() {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_TARGET_TERM,
          variables: {
            ...this.form
          },
          update: (store, data) => {
            const targetTerm = data.data.createTargetTerm;
            const newData = store.readQuery({
              query: GET_TARGET_TERM_LIST
            });
            newData.targetTermList.push(targetTerm);
            store.writeQuery({
              query: GET_TARGET_TERM_LIST,
              data: newData
            });
          }
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
    beforeClose() {
      this.form.name = null;
      this.form.targetTypeId = null;
      this.form.currency = null;
      this.form.cabinF = false;
      this.form.cabinB = false;
      this.form.cabinP = false;
      this.form.cabinE = false;
      this.form.incentiveTypeId = TARGET_TERM_LOOKUP.NONE;
      this.form.qsi = null;
      this.form.softTarget = null;
      this.form.internalTarget = null;
      this.form.timeframe = null;
    }
  }
};
</script>

<style lang="scss">
.qsi-input-container {
  display: flex;
  margin-top: 20px;
  span {
    margin-left: 10px;
  }
}
</style>
