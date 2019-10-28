<template>
  <modal
    classes="modal-container"
    name="copy-discount"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="copyDiscount"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">copy discount</div>
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </div>
      <el-form-item label="Discount Name *" prop="name">
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
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_DISCOUNT_LIST,
  GET_DISCOUNT_TYPE_LIST,
  GET_PRICING_TERM,
  GET_JOURNEY_TYPE_LIST,
  GET_DIRECTION_TYPE_LIST,
  GET_CONTRACT
} from '@/graphql/queries';
import { DISCOUNT_LOOKUP } from '@/graphql/constants';
import { COPY_DISCOUNT } from '@/graphql/mutations';
export default {
  name: 'CopyDiscountModal',
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
      contractId: null,
      discountTypeList: [],
      journeyTypeList: [],
      directionTypeList: [],
      pricingTermId: null,
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
      this.$modal.hide('copy-discount');
    },
    validateForm() {
      this.$refs.copyDiscount.validate(valid => {
        if (valid) {
          this.copyDiscount();
        } else {
          return false;
        }
      });
    },
    async copyDiscount() {
      try {
        this.form.discountValue = parseFloat(this.form.discountValue) || null;
        await this.$apollo.mutate({
          mutation: COPY_DISCOUNT,
          variables: {
            ...this.form,
            discountValue:
              this.form.discountTypeId === DISCOUNT_LOOKUP.PERCENTAGE
                ? this.form.discountValue / 100
                : this.form.discountValue
          },
          update: (store, { data: { copyDiscount } }) => {
            const query = {
              query: GET_DISCOUNT_LIST,
              variables: {
                pricingTermId: this.pricingTermId
              }
            };
            const data = store.readQuery(query);
            data.discountList.push(copyDiscount);
            store.writeQuery({
              ...query,
              data
            });
          },
          refetchQueries: () => [
            {
              query: GET_PRICING_TERM,
              variables: {
                id: this.pricingTermId
              }
            },
            {
              query: GET_CONTRACT,
              variables: {
                id: this.contractId
              }
            }
          ]
        });
        this.$emit('toggle-row', this.pricingTermId);
        this.$modal.show('success', {
          message: 'Discount successfully copied.',
          name: 'copy-discount'
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
        discountTypeId,
        discountValue,
        journeyTypeId,
        directionTypeId
      } = event.params.discount;
      this.pricingTermId = event.params.pricingTermId;
      this.form.id = id;
      this.form.name = name;
      this.form.discountTypeId = discountTypeId;
      this.form.discountValue =
        discountTypeId === DISCOUNT_LOOKUP.PERCENTAGE
          ? discountValue * 100
          : discountValue;
      this.form.journeyTypeId = journeyTypeId;
      this.form.directionTypeId = directionTypeId;
      this.contractId = event.params.contractId;
    },
    beforeClose() {
      this.pricingTermId = null;
      this.contractId = null;
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
