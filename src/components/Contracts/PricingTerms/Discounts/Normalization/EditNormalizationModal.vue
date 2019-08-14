<template>
  <modal
    classes="modal-container"
    name="edit-normalization-modal"
    height="auto"
    width="700px"
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
import { UPDATE_NORMALIZATION } from '@/graphql/mutations';
export default {
  name: 'EditNormalizationModal',
  data() {
    return {
      form: {
        id: null,
        usageFrom: null,
        usageTo: null,
        effectiveFrom: null,
        effectiveTo: null
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
      this.$modal.hide('edit-normalization-modal');
    },
    validateForm() {
      this.$refs.editNormalization.validate(valid => {
        if (valid) {
          this.editNormalization();
        } else {
          return false;
        }
      });
    },
    async editNormalization() {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_NORMALIZATION,
          variables: {
            ...this.form
          }
        });
        this.$modal.show('success', {
          message: 'Normalization successfully updated.',
          name: 'edit-normalization-modal'
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
        usageFrom,
        usageTo,
        effectiveFrom,
        effectiveTo
      } = event.params.normalization;
      this.form.id = id;
      this.form.usageFrom = usageFrom;
      this.form.usageTo = usageTo;
      this.form.effectiveFrom = effectiveFrom;
      this.form.effectiveTo = effectiveTo;
    },
    beforeClose() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
    }
  }
};
</script>
