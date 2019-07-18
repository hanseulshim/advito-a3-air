<template>
  <modal
    classes="modal-container"
    name="edit-contract"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="editContract"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">edit contract</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
        </el-tooltip>
      </div>
      <el-form-item label="Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Type *" prop="typeId">
        <el-select
          v-model="form.typeId"
          class="select-modal"
          @change="updateType"
        >
          <el-option
            v-for="item in contractTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="form.typeId === CONTRACT_LOOKUP.PROPOSAL"
        label="Round *"
        prop="round"
      >
        <el-input v-model.number="form.round" />
      </el-form-item>
      <el-form-item label="Effective Dates *">
        <div class="date-picker-container">
          <el-form-item prop="effectiveFrom" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveFrom"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item prop="effectiveTo" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveTo"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="Division">
        <el-select v-model="form.divisionId" class="select-modal">
          <el-option
            v-for="item in divisionTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_CONTRACT_TYPE_LIST,
  GET_DIVISION_TYPE_LIST
} from '@/graphql/queries';
import { CONTRACT_LOOKUP } from '@/graphql/constants';
import { EDIT_CONTRACT } from '@/graphql/mutations';
export default {
  name: 'EditContractModal',
  apollo: {
    contractTypeList: {
      query: GET_CONTRACT_TYPE_LIST
    },
    divisionTypeList: {
      query: GET_DIVISION_TYPE_LIST,
      variables() {
        return {
          clientId: this.clientId
        };
      }
    }
  },
  data() {
    return {
      form: {
        id: null,
        name: null,
        typeId: null,
        round: null,
        effectiveFrom: null,
        effectiveTo: null,
        description: null,
        divisionId: null
      },
      clientId: null,
      contractTypeList: [],
      divisionTypeList: [],
      CONTRACT_LOOKUP,
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a contract name.',
            trigger: 'change'
          }
        ],
        typeId: [
          {
            required: true,
            message: 'Please select a type.',
            trigger: 'change'
          }
        ],
        round: [
          {
            required: true,
            message: 'Please input a round.',
            trigger: 'change'
          },
          { type: 'number', message: 'Round must be a number' }
        ],
        effectiveFrom: [
          {
            required: true,
            message: 'Please select a start date',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-contract');
    },
    validateForm() {
      this.$refs.editContract.validate(valid => {
        if (valid) {
          this.editContract();
        } else {
          return false;
        }
      });
    },
    async editContract() {
      try {
        await this.$apollo.mutate({
          mutation: EDIT_CONTRACT,
          variables: {
            ...this.form
          }
        });
        this.$modal.show('success', {
          message: 'Contract successfully edited.',
          name: 'edit-contract'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    updateType(value) {
      const [type] = this.contractTypeList.filter(c => c.id === value);
      if (type.name !== 'Proposal') {
        this.form.round = null;
      }
    },
    beforeOpen(event) {
      const {
        id,
        name,
        typeId,
        round,
        effectiveFrom,
        effectiveTo,
        description,
        divisionId
      } = event.params.contract;
      this.clientId = event.params.clientId;
      this.form.id = id;
      this.form.name = name;
      this.form.typeId = typeId;
      this.form.round = round;
      this.form.effectiveFrom = effectiveFrom;
      this.form.effectiveTo = effectiveTo;
      this.form.description = description;
      this.form.divisionId = divisionId;
    },
    beforeClose() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
    }
  }
};
</script>
