<template>
  <div class="table-spacer">
    <div class="section-header title-row space-between">
      <div>
        <el-tooltip v-if="false" placement="top" effect="light">
          <div slot="content">
            You have to have at<br />least one Preferred<br />Airline or this
            Collection<br />
            will be deleted in 48<br />hours.
          </div>
          <i class="fas fa-exclamation-circle" />
        </el-tooltip>
        <span>{{ pluralize('contract', 3) }}</span>
      </div>
      <button class="button long">+ NEW CONTRACT</button>
    </div>
  </div>
</template>

<script>
import { pluralize } from '@/helper';
export default {
  name: 'Contracts',
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    }
  }
};
</script>
