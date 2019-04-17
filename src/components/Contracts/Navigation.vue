<template>
  <div>
    <div class="contracts-navigation-container">
      <router-link class="nav-item contract-item" to="/project/contracts">
        <span class="nav-title">All Contracts</span>
      </router-link>
      <router-link
        class="nav-item contract-item"
        to="/project/contracts/pricing-terms"
        :class="{ active: $route.path.includes('pricing-terms') }"
      >
        <span class="data-icon">
          <img alt="division-trends" src="@/assets/pricingTerms.png" />
        </span>
        <span class="nav-title">Pricing Terms</span>
      </router-link>
      <router-link
        class="nav-item contract-item"
        to="/project/contracts/target-terms"
        :class="{ active: $route.path.includes('target-terms') }"
      >
        <span class="data-icon">
          <img alt="import-errors" src="@/assets/targetTerms.png" />
        </span>
        <span class="nav-title">Target Terms</span>
      </router-link>
      <div class="contract-name">
        {{ selectedContract.name }} | {{ selectedContract.qc * 100 }}% QC
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
export default {
  name: 'ContractNavigation',
  props: {
    selectedContract: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.contracts-navigation-container {
  display: grid;
  grid-template-areas: 'all-contracts pricing-terms target-terms . contract-name';
  grid-template-columns: 10% 15% 15% auto;
  row-gap: 1em;
  column-gap: 1em;
  align-items: center;
}
.contract-name {
  text-align: right;
  grid-area: contract-name;
}
.contract-item {
  display: flex;
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
  margin-left: 11%;
}
.target-terms {
  margin-left: 27%;
}
</style>
