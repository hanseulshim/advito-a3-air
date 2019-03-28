<template>
  <div>Tickets</div>
</template>

<script>
import { GET_POS_TREND_LIST } from '@/graphql/queries';
export default {
  name: 'Tickets',
  apollo: {
    posTrendList: {
      query: GET_POS_TREND_LIST
    }
  }
};
</script>
