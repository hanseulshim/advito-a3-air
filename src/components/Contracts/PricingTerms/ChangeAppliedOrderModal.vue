<template>
  <modal
    classes="modal-container"
    name="change-pricing-term-order"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">changed applied order</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <el-table
      ref="changeAppliedOrderPricingTermList"
      :data="pricingTermOrderList"
    >
      <el-table-column prop="contractOrder" :min-width="term.contractOrder">
        <template slot="header">
          <el-tooltip content="Read Order" placement="top" effect="dark">
            <i class="fas fa-list-ol sort-icon" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="appliedOrder" :min-width="term.appliedOrder">
        <template slot="header">
          <el-tooltip content="Applied Order" placement="top" effect="dark">
            <i class="fas fa-list-ul sort-icon" />
          </el-tooltip>
        </template>
        <template slot-scope="props">
          <el-input
            v-model.number="props.row.appliedOrder"
            class="change-order-input"
            @keyup.enter.native="checkFocus(props.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Term Name" :min-width="term.name" />
    </el-table>
    <div class="delete-modal-button-container">
      <button class="button" @click="changeAppliedOrder">SAVE</button>
    </div>
  </modal>
</template>

<script>
import { GET_PRICING_TERM_LIST } from '@/graphql/queries';
import { UPDATE_APPLIED_ORDER } from '@/graphql/mutations';
import { term } from '@/config';
export default {
  name: 'ChangeAppliedOrderModal',
  apollo: {
    pricingTermList: {
      query: GET_PRICING_TERM_LIST,
      variables() {
        return {
          contractId: this.contractId
        };
      },
      result({ data: { pricingTermList } }) {
        this.pricingTermOrderList = pricingTermList
          .map(term => ({
            id: term.id,
            contractOrder: term.contractOrder,
            appliedOrder: term.appliedOrder,
            name: term.name
          }))
          .sort((a, b) => a.appliedOrder - b.appliedOrder);
      }
    }
  },
  data() {
    return {
      term,
      contractId: null,
      pricingTermList: [],
      pricingTermOrderList: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('change-pricing-term-order');
    },
    async changeAppliedOrder() {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_APPLIED_ORDER,
          variables: {
            updatePricingTermList: this.pricingTermOrderList
          }
        });
        this.$modal.show('success', {
          message: 'Applied Order successfully changed.',
          name: 'change-pricing-term-order'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      this.contractId = event.params.contractId;
    },
    beforeClose() {
      this.pricingTermOrderList = this.pricingTermList
        .map(term => ({
          id: term.id,
          contractOrder: term.contractOrder,
          appliedOrder: term.appliedOrder,
          name: term.name
        }))
        .sort((a, b) => a.appliedOrder - b.appliedOrder);
    },
    checkFocus(id) {
      const sortedListNum = this.pricingTermOrderList.map(v => v.appliedOrder);
      const term = this.pricingTermOrderList.filter(v => v.id === id)[0];
      const originIndex = this.pricingTermOrderList.findIndex(v => v.id === id);
      const lastIndex = sortedListNum.lastIndexOf(term.appliedOrder);
      if (originIndex === lastIndex) {
        const destinationIndex = sortedListNum.indexOf(term.appliedOrder);
        for (let i = destinationIndex; i < originIndex; i++) {
          this.pricingTermOrderList[i].appliedOrder++;
        }
        this.pricingTermOrderList.splice(destinationIndex, 0, term);
        this.pricingTermOrderList.splice(originIndex + 1, 1);
      } else {
        for (let i = originIndex + 1; i <= lastIndex; i++) {
          this.pricingTermOrderList[i].appliedOrder--;
        }
        this.pricingTermOrderList.splice(lastIndex + 1, 0, term);
        this.pricingTermOrderList.splice(originIndex, 1);
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
#app {
  .change-order-input {
    .el-input__inner {
      &:focus {
        border: 1px solid $tree-poppy;
      }
    }
  }
}
</style>
