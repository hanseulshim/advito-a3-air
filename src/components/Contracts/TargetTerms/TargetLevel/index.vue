<template>
  <div>
    <div class="title-row space-between">
      <div class="section-header">
        {{ pluralize('target level', targetLevelList.length) }}
      </div>
      <button class="button long">
        + NEW TARGET LEVEL
      </button>
    </div>
    <el-table
      ref="targetLevelList"
      :data="targetLevelList"
      class="level-two-table"
    >
      <el-table-column
        label="Target Amount"
        :min-width="target.targetAmount"
        :formatter="row => formatPercent(row.targetAmount)"
      />
      <el-table-column label="Score Target" :min-width="target.scoreTarget">
        <template slot-scope="props">
          <i v-if="props.row.scoringTarget" class="far fa-dot-circle" />
          <i v-else class="far fa-circle" />
        </template>
      </el-table-column>
      <el-table-column
        prop="incentiveDescription"
        label="Incentive Description"
        :min-width="target.incentiveDescription"
      />
      <el-table-column label="Actions" :min-width="target.actions">
        <template slot-scope="props">
          <el-tooltip effect="dark" content="Edit Target Level" placement="top">
            <i class="fas fa-pencil-alt icon-spacer" />
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="Delete Target Level"
            placement="top"
          >
            <i class="fas fa-trash-alt" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate, formatPercent, pluralize } from '@/helper';
import { target } from '@/config';
import { GET_TARGET_LEVEL_LIST } from '@/graphql/queries';
export default {
  name: 'TargetLevel',
  apollo: {
    targetLevelList: {
      query: GET_TARGET_LEVEL_LIST,
      variables() {
        return {
          targetTermId: this.targetTermId
        };
      }
    }
  },
  props: {
    targetTermId: {
      type: Number,
      required: true,
      default: null
    }
  },
  data() {
    return {
      targetLevelList: [],
      target
    };
  },
  methods: {
    pluralize(word, count) {
      return pluralize(word, count);
    },
    formatDate(row) {
      return `${formatDate(row.effectiveStartDate)} — ${formatDate(
        row.effectiveEndDate
      )}`;
    },
    formatPercent(num) {
      return formatPercent(num);
    },
    toggleNoteModal(discount) {
      this.$modal.show('save-discount-note', {
        targetTermId: this.targetTermId,
        id: discount.id,
        note: discount.note
      });
    },
    sortByNote(a, b) {
      if (a.note === null && b.note === null) {
        return 0;
      }
      if (b.note === null && a.note !== null) {
        return -1;
      }
      if (a.note === null && b.note !== null) {
        return 1;
      }
      if (a.note.important && !b.note.important) {
        return -1;
      }
      if (!a.note.important && b.note.important) {
        return 1;
      }
      if (a.note.length > b.note.length) {
        return -1;
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.discount-name {
  cursor: pointer;
  color: $tree-poppy;
  &:hover {
    text-decoration: underline;
  }
}
</style>
