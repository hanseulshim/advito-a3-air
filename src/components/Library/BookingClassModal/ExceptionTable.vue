<template>
  <el-table
    v-loading="$apollo.loading"
    :data="exceptionList"
    class="level-three-table"
  >
    <el-table-column
      prop="order"
      label="Record Order"
      :width="exception.order"
    />
    <el-table-column
      prop="originCode"
      label="Origin Code"
      :min-width="exception.originCode"
    />
    <el-table-column
      prop="destinationCode"
      label="Destination Code"
      :min-width="exception.destinationCode"
    />
    <el-table-column
      prop="overrideFareCategory"
      label="Override Fare Category"
      :min-width="exception.overrideFareCategory"
    />
  </el-table>
</template>

<script>
import { GET_EXCEPTION_LIST } from '@/graphql/queries';
import { exception } from '@/config';
export default {
  name: 'ExceptionTable',
  props: {
    exceptionId: {
      type: Number,
      required: true
    }
  },
  apollo: {
    exceptionList: {
      query: GET_EXCEPTION_LIST,
      variables() {
        return {
          exceptionId: this.exceptionId
        };
      }
    }
  },
  data() {
    return {
      exceptionList: [],
      exception
    };
  }
};
</script>
