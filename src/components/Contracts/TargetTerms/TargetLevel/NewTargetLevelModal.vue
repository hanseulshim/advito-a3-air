<template>
  <modal
    classes="modal-container"
    name="new-target-level"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="newTargetLevel"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="150px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">new target term</div>
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
import { GET_TARGET_LEVEL_LIST } from '@/graphql/queries';
import { CREATE_TARGET_LEVEL } from '@/graphql/mutations';
export default {
  name: 'NewTargetLevelModal',
  data() {
    return {
      form: {
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
      this.$modal.hide('new-target-level');
    },
    validateForm() {
      this.$refs.newTargetLevel.validate(valid => {
        if (valid) {
          this.createTargetLevel();
        } else {
          return false;
        }
      });
    },
    async createTargetLevel() {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_TARGET_LEVEL,
          variables: {
            ...this.form
          },
          update: (store, data) => {
            const targetLevel = data.data.createTargetLevel;
            const newData = store.readQuery({
              query: GET_TARGET_LEVEL_LIST,
              variables: {
                targetTermId: this.form.targetTermId
              }
            });
            newData.targetLevelList.push(targetLevel);
            store.writeQuery({
              query: GET_TARGET_LEVEL_LIST,
              data: newData,
              variables: {
                targetTermId: this.form.targetTermId
              }
            });
          }
        });
        this.$modal.show('success', {
          message: 'Target Level successfully created.',
          name: 'new-target-level'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.form.targetTermId = event.params.targetTermId;
    },
    beforeClose() {
      this.form.targetTermId = null;
      this.form.targetAmount = null;
      this.form.incentiveDescription = null;
      this.form.scoringTarget = false;
    }
  }
};
</script>

<style lang="scss">
.target-amount-input-container {
  display: flex;
  span {
    margin-left: 10px;
  }
}
</style>
