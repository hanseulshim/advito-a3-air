<template>
  <modal
    classes="modal-container"
    name="new-contract"
    height="auto"
    @before-close="beforeClose"
  >
    <el-form
      ref="newContract"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">new contract</div>
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </div>
      <el-form-item label="Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Type *" prop="typeId">
        <el-select v-model="form.typeId" class="select-modal">
          <el-option
            v-for="item in contractTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.typeId === 2" label="Round *" prop="round">
        <el-input v-model.number="form.round" />
      </el-form-item>
      <el-form-item label="Effective Dates *">
        <div class="date-picker-container">
          <el-form-item prop="effectiveStartDate" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveStartDate"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item prop="effectiveEndDate" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveEndDate"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="Division">
        <el-input v-model="form.division" type="textarea" />
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import { GET_CONTRACT_LIST, GET_CONTRACT_TYPE_LIST } from '@/graphql/queries';
import { CREATE_CONTRACT } from '@/graphql/mutations';
export default {
  name: 'NewContractModal',
  apollo: {
    contractTypeList: {
      query: GET_CONTRACT_TYPE_LIST
    }
  },
  data() {
    return {
      form: {
        name: null,
        typeId: null,
        round: null,
        effectiveStartDate: null,
        effectiveEndDate: null,
        description: null,
        division: null
      },
      contractTypeList: [],
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a collection name.',
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
        effectiveStartDate: [
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
      this.$modal.hide('new-contract');
    },
    validateForm() {
      this.$refs.newContract.validate(valid => {
        if (valid) {
          this.createContract();
        } else {
          return false;
        }
      });
    },
    async createContract() {
      try {
        const data = await this.$apollo.mutate({
          mutation: CREATE_CONTRACT,
          variables: {
            ...this.form
          },
          update: (store, data) => {
            const contract = data.data.createContract;
            const newData = store.readQuery({
              query: GET_CONTRACT_LIST
            });
            newData.contractList.push(contract);
            store.writeQuery({
              query: GET_CONTRACT_LIST,
              data: newData
            });
          }
        });
        this.$emit('toggle-row', data.data.createContract.id);
        this.$modal.show('success', {
          message: 'Contract successfully created.',
          name: 'new-contract'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeClose() {
      this.form.name = null;
      this.form.typeId = null;
      this.form.round = null;
      this.form.effectiveStartDate = null;
      this.form.effectiveEndDate = null;
      this.form.description = null;
      this.form.division = null;
    }
  }
};
</script>
