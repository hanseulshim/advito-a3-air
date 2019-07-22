<template>
  <modal
    classes="modal-container"
    name="new-normalization-market-modal"
    height="auto"
    width="1000px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="newMarketContainer">
      <el-form
        ref="newMarket"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="150px"
        hide-required-asterisk
        :inline="true"
        class="newMarketForm"
      >
        <div class="title-row space-between">
          <div class="section-header">new normalization market</div>
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
        </div>
        <el-form-item label="Select New Market *">
          <el-select placeholder="Select Top Market" />
        </el-form-item>
        <el-form-item label="Override Usage">
          <el-input-number />
        </el-form-item>
        <el-form-item label="Travel Date *">
          <el-date-picker />
        </el-form-item>
        <el-form-item class="save-container">
          <button class="button" type="button" @click="validateForm">
            SAVE
          </button>
        </el-form-item>
      </el-form>
      <div class="newMarketTables">
        <p>Im the table</p>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  name: 'NewNormalizationMarketModal',
  apollo: {},
  data() {
    return {
      form: {},
      rules: {}
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-normalization-market-modal');
    },
    validateForm() {
      this.$refs.newMarket.validate(valid => {
        if (valid) {
          this.newMarket();
        } else {
          return false;
        }
      });
    },
    async newMarket() {
      //   try {
      //     this.form.normalizationValue = parseFloat(this.form.normalizationValue)
      //       ? parseFloat(this.form.normalizationValue)
      //       : null;
      //     await this.$apollo.mutate({
      //       mutation: COPY_DISCOUNT,
      //       variables: {
      //         ...this.form
      //       },
      //       update: (store, { data: { newMarket } }) => {
      //         const query = {
      //           query: GET_DISCOUNT_LIST,
      //           variables: {
      //             pricingTermId: this.pricingTermId
      //           }
      //         };
      //         const data = store.readQuery(query);
      //         data.normalizationList.push(newMarket);
      //         store.writeQuery({
      //           ...query,
      //           data
      //         });
      //       },
      //       refetchQueries: () => [
      //         {
      //           query: GET_PRICING_TERM,
      //           variables: {
      //             id: this.pricingTermId
      //           }
      //         }
      //       ]
      //     });
      //     this.$emit('toggle-row', this.pricingTermId);
      //     this.$modal.show('success', {
      //       message: 'Discount successfully copied.',
      //       name: 'copy-normalization'
      //     });
      //   } catch (error) {
      //     this.$modal.show('error', {
      //       message: error.message
      //     });
      //   }
      alert('Successfuly created new normalization market!');
    },
    beforeOpen(event) {
      //   const {
      //     id,
      //     name,
      //     normalizationTypeId,
      //     normalizationValue,
      //     journeyTypeId,
      //     directionTypeId
      //   } = event.params.normalization;
      //   this.pricingTermId = event.params.pricingTermId;
      //   this.form.id = id;
      //   this.form.name = name;
      //   this.form.normalizationTypeId = normalizationTypeId;
      //   this.form.normalizationValue =
      //     normalizationTypeId === DISCOUNT_LOOKUP.PERCENTAGE
      //       ? normalizationValue * 100
      //       : normalizationValue;
      //   this.form.journeyTypeId = journeyTypeId;
      //   this.form.directionTypeId = directionTypeId;
    },
    beforeClose() {}
  }
};
</script>
<style lang="scss">
@import '@/styles/global.scss';
@import './styles.scss';

.newMarketContainer {
  display: flex;

  .newMarketForm {
    flex: 2;
  }

  .newMarkettables {
    flex: 1;
  }
}
</style>
