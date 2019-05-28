<template>
  <modal
    classes="modal-container"
    name="edit-target-level"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="editTargetlevel"
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
      <el-form-item label="Target Amount *" prop="targetAmount">
        <div class="target-amount-input-container">
          <el-input v-model.number="form.targetAmount" /><span>%</span>
        </div>
      </el-form-item>
      <el-form-item label="Incentive Description">
        <el-input v-model="form.incentiveDescription" type="textarea" />
      </el-form-item>
      <el-form-item label="Make Scoring Target">
        <el-checkbox v-model="form.scoringTarget" />
      </el-form-item>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import { EDIT_TARGET_LEVEL } from '@/graphql/mutations';
export default {
  name: 'EditTargetLevelModal',
  data() {
    return {
      form: {
        id: null,
        targetAmount: null,
        incentiveDescription: null,
        scoringTarget: false
      },
      rules: {
        targetAmount: [
          {
            required: true,
            message: 'Please input a target amount.',
            trigger: 'change'
          }
        ]
      }
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-target-level');
    },
    validateForm() {
      this.$refs.editTargetlevel.validate(valid => {
        if (valid) {
          this.editTargetLevel();
        } else {
          return false;
        }
      });
    },
    async editTargetLevel() {
      try {
        await this.$apollo.mutate({
          mutation: EDIT_TARGET_LEVEL,
          variables: {
            ...this.form
          }
        });
        this.$modal.show('success', {
          message: 'Target Level successfully created.',
          name: 'edit-target-level'
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
        targetAmount,
        incentiveDescription,
        scoringTarget
      } = event.params.targetLevel;
      this.form.id = id;
      this.form.targetAmount = targetAmount * 100;
      this.form.incentiveDescription = incentiveDescription;
      this.form.scoringTarget = scoringTarget;
    },
    beforeClose() {
      this.form.id = null;
      this.form.targetAmount = null;
      this.form.incentiveDescription = null;
      this.form.scoringTarget = false;
    }
  }
};
</script>
