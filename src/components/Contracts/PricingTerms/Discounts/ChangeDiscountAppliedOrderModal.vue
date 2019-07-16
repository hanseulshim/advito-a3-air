<template>
  <modal
    classes="modal-container"
    name="change-discount-order"
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
    <div class="applied-order-warning-text">
      Please press ENTER once you changed order number before saving the change
    </div>
    <el-table ref="changeAppliedOrderDiscountList" :data="discountOrderList">
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
import { UPDATE_DISCOUNT_APPLIED_ORDER } from '@/graphql/mutations';
import { term } from '@/config';
import { GET_DISCOUNT_LIST } from '@/graphql/queries';
export default {
  name: 'ChangeDiscountAppliedOrderModal',
  apollo: {
    discountList: {
      query: GET_DISCOUNT_LIST,
      variables() {
        return {
          pricingTermId: this.pricingTermId
        };
      },
      result({ data: { discountList } }) {
        this.discountOrderList = discountList
          ? discountList
              .map(term => ({
                id: term.id,
                contractOrder: term.contractOrder,
                appliedOrder: term.appliedOrder,
                name: term.name
              }))
              .sort((a, b) => a.appliedOrder - b.appliedOrder)
          : [];
      }
    }
  },
  data() {
    return {
      term,
      discountList: [],
      discountOrderList: [],
      pricingTermId: null
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('change-discount-order');
    },
    async changeAppliedOrder() {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_DISCOUNT_APPLIED_ORDER,
          variables: {
            updateDiscountList: this.discountOrderList
          },
          refetchQueries: () => [
            {
              query: GET_DISCOUNT_LIST,
              variables: { pricingTermId: this.pricingTermId }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Applied Order successfully changed.',
          name: 'change-discount-order'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    beforeOpen(event) {
      const { pricingTermId } = event.params;
      this.pricingTermId = pricingTermId;
    },
    beforeClose() {
      this.pricingTermId = null;
      this.discountOrderList = this.discountList
        .map(term => ({
          id: term.id,
          contractOrder: term.contractOrder,
          appliedOrder: term.appliedOrder,
          name: term.name
        }))
        .sort((a, b) => a.appliedOrder - b.appliedOrder);
    },
    checkFocus(id) {
      const sortedListNum = this.discountOrderList.map(v => v.appliedOrder);
      const discount = this.discountOrderList.filter(v => v.id === id)[0];
      const originIndex = this.discountOrderList.findIndex(v => v.id === id);
      const lastIndex = sortedListNum.lastIndexOf(discount.appliedOrder);
      if (originIndex === lastIndex) {
        const destinationIndex = sortedListNum.indexOf(discount.appliedOrder);
        for (let i = destinationIndex; i < originIndex; i++) {
          this.discountOrderList[i].appliedOrder++;
        }
        this.discountOrderList.splice(destinationIndex, 0, discount);
        this.discountOrderList.splice(originIndex + 1, 1);
      } else {
        for (let i = originIndex + 1; i <= lastIndex; i++) {
          this.discountOrderList[i].appliedOrder--;
        }
        this.discountOrderList.splice(lastIndex + 1, 0, discount);
        this.discountOrderList.splice(originIndex, 1);
      }
    }
  }
};
</script>
