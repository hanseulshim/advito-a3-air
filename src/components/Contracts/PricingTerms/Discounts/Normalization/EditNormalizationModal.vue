<template>
  <modal
    classes="modal-container"
    name="edit-normalization-modal"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="editNormalization"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">edit normalization</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <el-form-item label="Term Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Discount Type">
        <el-select v-model="form.normalizationTypeId" class="select-modal">
          <el-option
            v-for="item in normalizationTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Discount Value *" prop="normalizationValue">
        <el-input v-model="form.normalizationValue" />
      </el-form-item>
      <el-form-item label="Journey Type">
        <el-select v-model="form.journeyTypeId" class="select-modal">
          <el-option
            v-for="item in journeyTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Direction">
        <el-select v-model="form.directionTypeId" class="select-modal">
          <el-option
            v-for="item in directionTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
// import {
//   GET_DISCOUNT_TYPE_LIST,
//   GET_JOURNEY_TYPE_LIST,
//   GET_DIRECTION_TYPE_LIST
// } from '@/graphql/queries';
import { DISCOUNT_LOOKUP } from '@/graphql/constants';
// import { EDIT_DISCOUNT } from '@/graphql/mutations';
export default {
  name: 'EditNormalizationModal',
  apollo: {
    // normalizationTypeList: {
    //   query: GET_DISCOUNT_TYPE_LIST
    // },
    // journeyTypeList: {
    //   query: GET_JOURNEY_TYPE_LIST
    // },
    // directionTypeList: {
    //   query: GET_DIRECTION_TYPE_LIST
    // }
  },
  data() {
    return {
      normalizationTypeList: [],
      journeyTypeList: [],
      directionTypeList: [],
      form: {
        id: null,
        name: null,
        normalizationTypeId: null,
        normalizationValue: null,
        journeyTypeId: null,
        directionTypeId: null
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a normalization name.',
            trigger: 'change'
          }
        ],
        normalizationValue: [
          {
            required: true,
            message: 'Please input a normalization value.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-normalization-modal');
    },
    validateForm() {
      this.$refs.editNormalization.validate(valid => {
        if (valid) {
          this.createDiscount();
        } else {
          return false;
        }
      });
    },
    async createDiscount() {
      //   try {
      //     this.form.normalizationValue = parseFloat(this.form.normalizationValue)
      //       ? parseFloat(this.form.normalizationValue)
      //       : null;
      //     await this.$apollo.mutate({
      //       mutation: EDIT_DISCOUNT,
      //       variables: {
      //         ...this.form
      //       }
      //     });
      //     this.$modal.show('success', {
      //       message: 'Discount successfully updated.',
      //       name: 'edit-normalization'
      //     });
      //   } catch (error) {
      //     this.$modal.show('error', {
      //       message: error.message
      //     });
      //   }
      alert('Normalization successfully updated');
    },
    beforeOpen(event) {
      const {
        id,
        name,
        normalizationTypeId,
        normalizationValue,
        journeyTypeId,
        directionTypeId
      } = event.params.normalization;
      this.form.id = id;
      this.form.name = name;
      this.form.normalizationTypeId = normalizationTypeId;
      this.form.normalizationValue =
        normalizationTypeId === DISCOUNT_LOOKUP.PERCENTAGE
          ? normalizationValue * 100
          : normalizationValue;
      this.form.journeyTypeId = journeyTypeId;
      this.form.directionTypeId = directionTypeId;
    },
    beforeClose() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
    }
  }
};
</script>
