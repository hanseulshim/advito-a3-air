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
        <div class="section-header">edit target level</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <el-form-item label="Target Amount *" prop="targetAmount">
        <div class="target-amount-input-container">
          <el-input v-model.number="form.targetAmount" /><span
            v-if="showPercent()"
            >%</span
          >
        </div>
      </el-form-item>
      <el-form-item v-if="showIncentiveInput()" label="Incentive Description">
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
import { GET_TARGET_TERM } from '@/graphql/queries';
import { TARGET_TERM_LOOKUP } from '@/graphql/constants';
import { EDIT_TARGET_LEVEL } from '@/graphql/mutations';
export default {
  name: 'EditTargetLevelModal',
  data() {
    return {
      targetTypeId: null,
      incentiveTypeId: null,
      form: {
        id: null,
        targetTermId: null,
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
    showPercent() {
      if (
        this.targetTypeId === TARGET_TERM_LOOKUP.SEGMENT_SHARE ||
        this.targetTypeId === TARGET_TERM_LOOKUP.SHARE_GAP ||
        this.targetTypeId === TARGET_TERM_LOOKUP.REVENUE ||
        this.targetTypeId === TARGET_TERM_LOOKUP.KPG
      ) {
        return true;
      } else {
        return false;
      }
    },
    showIncentiveInput() {
      if (this.incentiveTypeId === TARGET_TERM_LOOKUP.NONE) {
        return false;
      } else {
        return true;
      }
    },
    async editTargetLevel() {
      try {
        await this.$apollo.mutate({
          mutation: EDIT_TARGET_LEVEL,
          variables: {
            ...this.form
          },
          refetchQueries: () => [
            {
              query: GET_TARGET_TERM,
              variables: { id: this.form.targetTermId }
            }
          ]
        });
        this.$emit('toggle-row', this.form.targetTermId);
        this.$modal.show('success', {
          message: 'Target Level successfully edited.',
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
        targetTermId,
        targetAmount,
        incentiveDescription,
        scoringTarget
      } = event.params.targetLevel;
      this.targetTypeId = event.params.targetTypeId;
      this.form.id = id;
      this.form.targetTermId = targetTermId;
      this.form.targetAmount = targetAmount * 100;
      this.form.incentiveDescription = incentiveDescription;
      this.incentiveTypeId = event.params.incentiveTypeId;
      this.form.scoringTarget = scoringTarget;
    },
    beforeClose() {
      this.targetTypeId = null;
      this.form.id = null;
      this.form.targetTermId = null;
      this.form.targetAmount = null;
      this.form.incentiveDescription = null;
      this.form.scoringTarget = false;
    }
  }
};
</script>
