<template>
  <div>
    <div class="contracts-navigation-container">
      <router-link
        class="nav-item contract-item"
        :to="`/${$route.params.projectId}/contracts`"
      >
        <span class="nav-title">All Contracts</span>
      </router-link>
      <router-link
        class="nav-item contract-item"
        :to="`/${$route.params.projectId}/contracts/pricing-terms`"
        :class="{ active: $route.path.includes('pricing-terms') }"
      >
        <span class="data-icon">
          <img alt="division-trends" src="@/assets/pricingTerms.png" />
        </span>
        <span class="nav-title">Pricing Terms</span>
      </router-link>
      <router-link
        class="nav-item contract-item"
        :to="`/${$route.params.projectId}/contracts/target-terms`"
        :class="{ active: $route.path.includes('target-terms') }"
      >
        <span class="data-icon">
          <img alt="import-errors" src="@/assets/targetTerms.png" />
        </span>
        <span class="nav-title">Target Terms</span>
      </router-link>
      <div class="contract-name">
        {{ selectedContract.name }} | {{ formatPercent(selectedContract.qc) }}
        QC
      </div>
    </div>
    <div class="sub-navigation-container">
      <i
        class="fas fa-chevron-up"
        :class="{
          'pricing-terms': $route.path.includes('pricing-terms'),
          'target-terms': $route.path.includes('target-terms')
        }"
      ></i>
    </div>
  </div>
</template>

<script>
import { GET_SELECTED_CONTRACT } from '@/graphql/queries';
import { formatPercent } from '@/helper';
export default {
  name: 'ContractNavigation',
  apollo: {
    selectedContract: {
      query: GET_SELECTED_CONTRACT
    }
  },
  data() {
    return {
      selectedContract: {}
    };
  },
  methods: {
    formatPercent(num) {
      return formatPercent(num);
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.contracts-navigation-container {
  display: flex;
  align-items: center;
}
.contract-name {
  text-align: right;
  font-weight: 400;
  color: $black;
  margin-left: auto;
}
.contract-item {
  display: flex;
  margin-right: 5.5em;
  align-items: center;
  .nav-title {
    font-size: 16px;
  }
  &.active {
    span {
      color: $tradewind;
    }
    .data-icon {
      border-color: $tradewind;
    }
  }
  &:hover {
    span {
      color: $tradewind;
    }
    .data-icon {
      border-color: $tradewind;
    }
  }
  .data-icon {
    border: 1px solid $dusty-gray;
    border-radius: 100%;
    padding: 10px;
    margin-right: 10px;
    width: 35px;
    height: 35px;
    img {
      width: 100%;
    }
  }
}
.pricing-terms {
  margin-left: calc(10% + 1em);
}
.target-terms {
  margin-left: calc(25% + 2em);
}
</style>
