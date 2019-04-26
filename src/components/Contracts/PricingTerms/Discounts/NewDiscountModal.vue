<template>
  <modal
    classes="modal-container"
    name="new-discount"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="newDiscount"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">new discount</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <el-form-item label="Term Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Discount Type">
        <el-select v-model="form.discountTypeId" class="select-modal">
          <el-option
            v-for="item in discountTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Discount Value *" prop="discountValue">
        <el-input v-model="form.discountValue" />
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
        <button class="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_PRICING_TERM_LIST,
  GET_DISCOUNT_TYPE_LIST,
  GET_JOURNEY_TYPE_LIST,
  GET_DIRECTION_TYPE_LIST
} from '@/graphql/queries';
import { CREATE_DISCOUNT } from '@/graphql/mutations';
export default {
  name: 'NewDiscountModal',
  apollo: {
    discountTypeList: {
      query: GET_DISCOUNT_TYPE_LIST
    },
    journeyTypeList: {
      query: GET_JOURNEY_TYPE_LIST
    },
    directionTypeList: {
      query: GET_DIRECTION_TYPE_LIST
    }
  },
  data() {
    return {
      discountTypeList: [],
      journeyTypeList: [],
      directionTypeList: [],
      form: {
        id: null,
        name: null,
        discountTypeId: null,
        discountValue: null,
        journeyTypeId: null,
        directionTypeId: null
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a discount name.',
            trigger: 'change'
          }
        ],
        discountValue: [
          {
            required: true,
            message: 'Please input a discount value.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-discount');
    },
    validateForm() {
      this.$refs.newDiscount.validate(valid => {
        if (valid) {
          this.createDiscount();
        } else {
          return false;
        }
      });
    },
    async createDiscount() {
      try {
        this.form.discountValue = parseFloat(this.form.discountValue)
          ? parseFloat(this.form.discountValue)
          : null;
        await this.$apollo.mutate({
          mutation: CREATE_DISCOUNT,
          variables: {
            ...this.form
          },
          update: (store, data) => {
            const discount = data.data.createDiscount;
            const newData = store.readQuery({
              query: GET_PRICING_TERM_LIST
            });
            const index = newData.pricingTermList.findIndex(
              term => term.id === this.form.id
            );
            newData.pricingTermList[index].discountList.push(discount);
            store.writeQuery({
              query: GET_PRICING_TERM_LIST,
              data: newData
            });
          }
        });
        this.$emit('toggle-row', this.form.id);
        this.$modal.show('success', {
          message: 'Discount successfully created.',
          name: 'new-discount'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.form.id = event.params.id;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
      this.form.discountTypeId = null;
      this.form.discountValue = null;
      this.form.journeyTypeId = null;
      this.form.directionTypeId = null;
    }
  }
};
</script>
