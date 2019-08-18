<template>
  <modal
    classes="modal-container"
    name="new-normalization-modal"
    height="auto"
    width="700px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="newNormalization"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">new normalization</div>
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </div>
      <div class="date-row">
        <el-form-item label="Effective Dates *" prop="effectiveFrom">
          <el-date-picker
            v-model="form.effectiveFrom"
            size="mini"
            format="dd MMM yyyy"
            placeholder="Pick a day"
            class="date-picker"
          />
        </el-form-item>
        <el-form-item prop="effectiveTo" label-width="10px">
          <el-date-picker
            v-model="form.effectiveTo"
            size="mini"
            format="dd MMM yyyy"
            placeholder="Pick a day"
            class="date-picker"
          />
        </el-form-item>
      </div>
      <div class="date-row">
        <el-form-item label="Data Date Range *" prop="usageFrom">
          <el-date-picker
            v-model="form.usageFrom"
            size="mini"
            format="dd MMM yyyy"
            placeholder="Pick a day"
          />
        </el-form-item>
        <el-form-item prop="usageTo" label-width="10px">
          <el-date-picker
            v-model="form.usageTo"
            size="mini"
            format="dd MMM yyyy"
            placeholder="Pick a day"
          />
        </el-form-item>
      </div>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>
<script>
import { CREATE_NORMALIZATION } from '@/graphql/mutations';
import { GET_DISCOUNT_LIST, GET_NORMALIZATION_LIST } from '@/graphql/queries';
export default {
  name: 'NewNormalizationModal',
  data() {
    return {
      discountId: null,
      pricingTermId: null,
      form: {
        effectiveFrom: null,
        effectiveTo: null,
        usageFrom: null,
        usageTo: null
      },
      rules: {
        effectiveFrom: [
          {
            required: true,
            message: 'Please input an effective start date.',
            trigger: 'change'
          }
        ],
        effectiveTo: [
          {
            required: true,
            message: 'Please input an effective end date.',
            trigger: 'change'
          }
        ],
        usageFrom: [
          {
            required: true,
            message: 'Please input a start date for data date range.',
            trigger: 'change'
          }
        ],
        usageTo: [
          {
            required: true,
            message: 'Please input an end date for data date range.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-normalization-modal');
    },
    validateForm() {
      this.$refs.newNormalization.validate(valid => {
        if (valid) {
          this.newNormalization();
        } else {
          return false;
        }
      });
    },
    async newNormalization() {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_NORMALIZATION,
          variables: {
            discountId: this.discountId,
            ...this.form
          },

          refetchQueries: () => [
            {
              query: GET_NORMALIZATION_LIST,
              variables: {
                discountId: this.discountId
              }
            },
            {
              query: GET_DISCOUNT_LIST,
              variables: {
                pricingTermId: this.pricingTermId
              }
            }
          ]
        });
        this.$emit('toggle-row', this.pricingTermId);
        this.$modal.show('success', {
          message: 'Normalization successfully created',
          name: 'new-normalization-modal'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.discountId = event.params.discountId;
      this.pricingTermId = event.params.pricingTermId;
    },
    beforeClose() {
      this.discountId = null;
      this.form.effectiveFrom = null;
      this.form.effectiveTo = null;
      this.form.usageFrom = null;
      this.form.usageTo = null;
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/global.scss';
@import './styles.scss';
</style>
