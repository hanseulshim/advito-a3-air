<template>
  <modal
    classes="modal-container"
    name="new-normalization-market-modal"
    height="auto"
    width="1200px"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">new normalization market</div>
      <i class="fas fa-times close-modal-button" @click="hideModal"></i>
    </div>
    <div class="newMarketContainer">
      <el-form
        ref="newMarket"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="150px"
        hide-required-asterisk
        class="newMarketForm"
      >
        <div class="flex-row space-between">
          <el-form-item label="Select New Market *" class="flex2">
            <el-select placeholder="Select Top Market" />
          </el-form-item>
          <el-form-item label="Override Usage" class="flex1">
            <el-input />
          </el-form-item>
          <el-form-item label="Travel Date *" class="flex1">
            <el-date-picker />
          </el-form-item>
        </div>
        <div class="flex-row">
          <el-form-item label="Notes" class="flex1">
            <el-input
              v-model="text"
              v-loading="$apollo.loading"
              class="market-notes"
              placeholder="Enter note here"
              type="textarea"
            />
          </el-form-item>
        </div>
        <div class="flex-row">
          <el-form-item label="Fare Basis" class="flex1">
            <el-input />
          </el-form-item>
          <el-form-item label="RT/OW" class="flex1">
            <el-input />
          </el-form-item>
          <el-form-item label="Amount" class="flex1">
            <el-input />
          </el-form-item>
          <el-form-item label="Currency" class="flex1">
            <el-input />
          </el-form-item>
          <el-form-item label="AP (Days)" class="flex1">
            <el-input />
          </el-form-item>
          <el-form-item label="Min Stay (Days)" class="flex1">
            <el-input />
          </el-form-item>
        </div>
        <el-form-item class="save-container">
          <button class="button" type="button" @click="validateForm">
            SAVE
          </button>
        </el-form-item>
      </el-form>
      <div class="newMarketTables">
        <div class="flex-row">
          <el-table
            :data="tableData"
            stripe
            :cell-style="{ padding: '0', height: '20px' }"
          >
            <el-table-column prop="label" label="Adv. Tkt. (Days)" width="auto">
            </el-table-column>
            <el-table-column prop="percent" width="75">
              <template slot-scope="props">
                {{ props.row.percent }}%
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="tableData2"
            stripe
            :cell-style="{ padding: '0', height: '20px' }"
            size="small"
          >
            <el-table-column prop="label" label="Departure" width="100">
            </el-table-column>
            <el-table-column prop="percent" width="100">
              <template slot-scope="props">
                {{ props.row.percent }}%
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="flex-row">
          <el-table
            :data="tableData3"
            stripe
            :cell-style="{ padding: '0', height: '20px' }"
            style="margin-top: 20px"
          >
            <el-table-column prop="fareBasis" label="Fare Basis">
            </el-table-column>
            <el-table-column prop="bookingClass" label="Booking Class">
            </el-table-column>
            <el-table-column prop="usage" label="Usage"
              ><template slot-scope="props">
                {{ props.row.usage }}%
              </template>
            </el-table-column>
          </el-table>
        </div>
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
      form: {
        text: ''
      },
      tableData: [
        {
          label: '0-2',
          percent: 5
        },
        {
          label: '3-4',
          percent: 20
        },
        {
          label: '7-10',
          percent: 11
        },
        {
          label: '14-20',
          percent: 25
        },
        {
          label: '21+',
          percent: 10
        }
      ],
      tableData2: [
        {
          label: 'Sunday',
          percent: 5
        },
        {
          label: 'Monday',
          percent: 20
        },
        {
          label: 'Tuesday',
          percent: 11
        },
        {
          label: 'Wednesday',
          percent: 25
        },
        {
          label: 'Thursday',
          percent: 10
        },
        {
          label: 'Friday',
          percent: 10
        },
        {
          label: 'Saturday',
          percent: 10
        }
      ],
      tableData3: [
        {
          fareBasis: 'DGFBLM',
          bookingClass: 'D',
          usage: 98
        },
        {
          fareBasis: 'J1NQO4C5',
          bookingClass: 'D',
          usage: 2
        }
      ],
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
    rowClassName() {
      return 'rowStyle';
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
    margin-right: 2em;
    .el-form-item {
      margin-right: 1em;
    }
  }

  .flex-row {
    display: flex;

    .el-table {
      margin-right: 1em;
    }
  }

  .flex1 {
    flex: 1;
  }

  .flex2 {
    flex: 2;
  }

  .flex3 {
    flex: 3;
  }

  .space-between {
    justify-content: space-between;
  }

  .newMarkettables {
    flex: 1;
  }

  .inline {
    display: inline;
  }

  .rowStyle {
    height: 15px;
  }
}
</style>
