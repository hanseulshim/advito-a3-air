<template>
  <modal
    classes="modal-container"
    name="normalization-modal"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="scroll-container">
      <div class="title-row space-between">
        <div class="section-header">Discount : {{ discount.name }}</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <div class="rules-menu-container">
        <p class="rule-count">{{ `${renderedRules.length} Rules` }}</p>
        <el-select
          v-model="selectedRule"
          placeholder="Create New Rule"
          size="small"
          filterable
          @change="createRule"
        >
          <el-option
            v-for="rule in rulesInDropdown"
            :key="rule.index"
            :label="rule.label"
            :value="rule.id"
          ></el-option>
        </el-select>
      </div>
      <component
        :is="rule.value"
        v-for="rule in renderedRules"
        :key="rule.id"
        :parent-id="discount.id"
        :table-id="rule.id"
        :pricing-term-id="discount.pricingTermId"
        :parent-type="parentType"
        :contract-id="selectedContract.id"
        @delete-rule="deleteRule"
        @toggle-row="toggleRow"
      ></component>
    </div>
  </modal>
</template>

<script>
import { ruleTypes } from '../Rules/helper';
import {
  GET_RULE_LIST,
  GET_DISCOUNT,
  GET_SELECTED_CONTRACT
} from '@/graphql/queries';
export default {
  name: 'PricingTermRulesModal',
  apollo: {
    ruleList: {
      query: GET_RULE_LIST,
      fetchPolicy: 'network-only',
      variables() {
        return {
          parentId: this.discount.id
        };
      },
      result({ data }) {
        if (data && this.discount.id) {
          this.renderedRules = data.ruleList.map(
            ruleId => this.ruleTypes.filter(v => v.id === ruleId)[0]
          );
        }
      }
    },
    selectedContract: {
      query: GET_SELECTED_CONTRACT
    }
  },
  components: {},
  data() {
    return {
      discount: {},
      ruleTypes,
      ruleList: [],
      renderedRules: [],
      selectedRule: '',
      parentType: 1,
      selectedContract: null
    };
  },
  computed: {
    rulesInDropdown() {
      if (this.renderedRules.length) {
        return this.ruleTypes.filter(
          rule => !this.renderedRules.some(v => v.id === rule.id)
        );
      } else {
        return this.ruleTypes;
      }
    }
  },
  methods: {
    beforeOpen(event) {
      this.discount = event.params.discount;
    },
    beforeClose() {
      this.discount = {};
    },
    toggleRow(id) {
      this.$emit('toggle-row', id);
    }
  }
};
</script>
<style lang="scss">
.scroll-container {
  height: 100%;
  overflow: auto;
}

.rules-menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1em;

  .rule-count {
    flex: 2;
  }

  .el-select {
    flex: 1;
  }
}
</style>
