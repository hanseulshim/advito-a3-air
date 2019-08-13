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
        <el-form-item label="Effective Dates *" prop="effectiveStartDate">
          <el-date-picker
            v-model="form.effectiveStartDate"
            size="mini"
            format="dd MMM yyyy"
            placeholder="Pick a day"
            class="date-picker"
          />
        </el-form-item>
        <el-form-item prop="effectiveEndDate" label-width="10px">
          <el-date-picker
            v-model="form.effectiveEndDate"
            size="mini"
            format="dd MMM yyyy"
            placeholder="Pick a day"
            class="date-picker"
          />
        </el-form-item>
      </div>
      <div class="date-row">
        <el-form-item label="Data Date Range *" prop="dataStartDate">
          <el-date-picker
            v-model="form.dataStartDate"
            size="mini"
            format="dd MMM yyyy"
            placeholder="Pick a day"
          />
        </el-form-item>
        <el-form-item prop="dataEndDate" label-width="10px">
          <el-date-picker
            v-model="form.dataEndDate"
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
// import {
//   GET_DISCOUNT_LIST,
//   GET_DISCOUNT_TYPE_LIST,
//   GET_PRICING_TERM,
//   GET_JOURNEY_TYPE_LIST,
//   GET_DIRECTION_TYPE_LIST
// } from '@/graphql/queries';
// import { DISCOUNT_LOOKUP } from '@/graphql/constants';
// import { COPY_DISCOUNT } from '@/graphql/mutations';
export default {
  name: 'NewNormalizationModal',
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
      pricingTermId: null,
      form: {
        id: null,
        name: null,
        normalizationTypeId: null,
        normalizationValue: null,
        effectiveStartDate: null,
        effectiveEndDate: null,
        dataStartDate: null,
        dataEndDate: null
      },
      rules: {
        effectiveStartDate: [
          {
            required: true,
            message: 'Please input an effective start date.',
            trigger: 'change'
          }
        ],
        effectiveEndDate: [
          {
            required: true,
            message: 'Please input an effective end date.',
            trigger: 'change'
          }
        ],
        dataStartDate: [
          {
            required: true,
            message: 'Please input a start date for data date range.',
            trigger: 'change'
          }
        ],
        dataEndDate: [
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
      //   try {
      //     this.form.normalizationValue = parseFloat(this.form.normalizationValue)
      //       ? parseFloat(this.form.normalizationValue)
      //       : null;
      //     await this.$apollo.mutate({
      //       mutation: COPY_DISCOUNT,
      //       variables: {
      //         ...this.form
      //       },
      //       update: (store, { data: { newNormalization } }) => {
      //         const query = {
      //           query: GET_DISCOUNT_LIST,
      //           variables: {
      //             pricingTermId: this.pricingTermId
      //           }
      //         };
      //         const data = store.readQuery(query);
      //         data.normalizationList.push(newNormalization);
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
      alert('copied normalization!');
    },
    beforeOpen() {
      // beforeOpen(event) {
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
    beforeClose() {
      this.pricingTermId = null;
      this.form.id = null;
      this.form.name = null;
      this.form.normalizationTypeId = null;
      this.form.normalizationValue = null;
      this.form.journeyTypeId = null;
      this.form.directionTypeId = null;
      this.form.effectiveStartDate = null;
      this.form.effectiveEndDate = null;
      this.form.dataStartDate = null;
      this.form.dataEndDate = null;
    }
  }
};
</script>
<style lang="scss">
@import '@/styles/global.scss';
@import './styles.scss';
</style>
