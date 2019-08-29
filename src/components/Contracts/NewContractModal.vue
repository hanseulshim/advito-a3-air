<template>
  <modal
    classes="modal-container"
    name="new-contract"
    height="auto"
    @before-open="beforeOpen"
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
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="form.typeId === CONTRACT_LOOKUP.PROPOSAL"
        label="Round *"
        prop="round"
      >
        <el-input v-model.number="form.round" />
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
  GET_CONTRACT_LIST,
  GET_CONTRACT_TYPE_LIST,
  GET_DIVISION_TYPE_LIST
} from '@/graphql/queries';
import { CONTRACT_LOOKUP } from '@/graphql/constants';
import { CREATE_CONTRACT } from '@/graphql/mutations';
export default {
  name: 'NewContractModal',
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
        name: null,
        typeId: null,
        round: null,
        description: null,
        divisionId: null
      },
      CONTRACT_LOOKUP,
      projectId: null,
      clientId: null,
      contractTypeList: [],
      divisionTypeList: [],
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
        await this.$apollo.mutate({
          mutation: CREATE_CONTRACT,
          variables: {
            ...this.form,
            projectId: this.projectId
          },
          update: (store, { data: { createContract } }) => {
            const query = {
              query: GET_CONTRACT_LIST,
              variables: {
                projectId: this.projectId
              }
            };
            const data = store.readQuery(query);
            data.contractList.push(createContract);
            store.writeQuery({
              ...query,
              data
            });
          }
        });
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
    updateType(value) {
      if (value !== CONTRACT_LOOKUP.PROPOSAL) {
        this.form.round = null;
      }
    },
    beforeOpen(event) {
      this.clientId = event.params.clientId;
      this.projectId = event.params.projectId;
    },
    beforeClose() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
    }
  }
};
</script>
