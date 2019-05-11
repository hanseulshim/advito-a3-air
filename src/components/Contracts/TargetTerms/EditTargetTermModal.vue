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
      label-width="150px"
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
        <el-select v-model="form.targetTypeId" class="select-modal">
          <el-option
            v-for="item in targetTypeList"
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
          <el-input v-model.number="form.qsi" /><span>%</span>
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
        <button class="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_TARGET_TYPE_LIST,
  GET_INCENTIVE_TYPE_LIST
} from '@/graphql/queries';
import { EDIT_TARGET_TERM } from '@/graphql/mutations';
export default {
  name: 'EditTargetTermModal',
  apollo: {
    targetTypeList: {
      query: GET_TARGET_TYPE_LIST
    },
    incentiveTypeList: {
      query: GET_INCENTIVE_TYPE_LIST
    }
  },
  data() {
    return {
      targetTypeList: [],
      incentiveTypeList: [],
      form: {
        name: null,
        targetTypeId: null,
        cabinF: false,
        cabinB: false,
        cabinP: false,
        cabinE: false,
        incentiveTypeId: 3,
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
        await this.$apollo.mutate({
          mutation: EDIT_TARGET_TERM,
          variables: {
            ...this.form
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
        targetType,
        cabinF,
        cabinB,
        cabinP,
        cabinE,
        incentiveType,
        qsi,
        softTarget,
        internalTarget,
        timeframe
      } = event.params.targetTerm;
      this.form.id = id;
      this.form.name = name;
      this.form.targetTypeId = targetType.id;
      this.form.cabinF = cabinF;
      this.form.cabinB = cabinB;
      this.form.cabinP = cabinP;
      this.form.cabinE = cabinE;
      this.form.incentiveTypeId = incentiveType.id;
      this.form.qsi = qsi;
      this.form.softTarget = softTarget;
      this.form.internalTarget = internalTarget;
      this.form.timeframe = timeframe;
    },
    beforeClose() {
      this.form.name = null;
      this.form.targetTypeId = null;
      this.form.cabinF = false;
      this.form.cabinB = false;
      this.form.cabinP = false;
      this.form.cabinE = false;
      this.form.incentiveTypeId = 3;
      this.form.qsi = null;
      this.form.softTarget = null;
      this.form.internalTarget = null;
      this.form.timeframe = null;
    }
  }
};
</script>
