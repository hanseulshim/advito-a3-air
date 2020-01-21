<template>
  <div>
    <div class="title-row space-between">
      <div class="section-header">
        {{ pluralize('target level', targetLevelList.length) }}
      </div>
      <button class="button long" @click="showNewTargetLevelModal">
        + NEW TARGET LEVEL
      </button>
    </div>
    <el-table
      ref="targetLevelList"
      v-loading="$apollo.loading"
      :data="targetLevelList"
      class="level-two-table"
    >
      <el-table-column
        label="Target Amount"
        :width="target.targetAmount"
        :formatter="row => formatTargetAmount(row)"
      />
      <el-table-column label="Score Target" :width="target.scoreTarget">
        <template slot-scope="props">
          <i v-if="props.row.scoringTarget" class="far fa-dot-circle" />
          <i
            v-else
            class="far fa-circle"
            @click="toggleTargetLevel(props.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="showIncentiveColumn()"
        prop="incentiveDescription"
        label="Incentive Description"
      />
      <el-table-column v-if="!showIncentiveColumn()" />
      <el-table-column label="Actions" :width="target.actions">
        <template slot-scope="props">
          <el-tooltip effect="dark" content="Edit Target Level" placement="top">
            <i
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditTargetLevelModal(props.row)"
            />
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="Delete Target Level"
            placement="top"
          >
            <i
              class="fas fa-trash-alt"
              @click="showDeleteTargetLevelModal(props.row.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NewTargetLevelModal @toggle-row="toggleRow" />
    <EditTargetLevelModal @toggle-row="toggleRow" />
    <DeleteTargetLevelModal @toggle-row="toggleRow" />
  </div>
</template>

<script>
import { formatPercent, pluralize } from '@/helper';
import { target } from '@/config';
import { GET_TARGET_LEVEL_LIST, GET_TARGET_TERM } from '@/graphql/queries';
import { TOGGLE_TARGET_LEVEL } from '@/graphql/mutations';
import { TARGET_TERM_LOOKUP } from '@/graphql/constants';
import NewTargetLevelModal from './NewTargetLevelModal';
import EditTargetLevelModal from './EditTargetLevelModal';
import DeleteTargetLevelModal from './DeleteTargetLevelModal';
export default {
  name: 'TargetLevel',
  components: {
    NewTargetLevelModal,
    EditTargetLevelModal,
    DeleteTargetLevelModal
  },
  apollo: {
    targetLevelList: {
      query: GET_TARGET_LEVEL_LIST,
      variables() {
        return {
          targetTermId: this.targetTermId
        };
      },
      result({ error }) {
        if (error) {
          this.$modal.show('error', {
            message: error.message
          });
          this.targetLevelList = [];
        }
      },
      error() {
        // console.log(error);
      }
    }
  },
  props: {
    targetTermId: {
      type: Number,
      required: true,
      default: null
    },
    targetTypeId: {
      type: Number,
      required: true,
      default: null
    },
    incentiveTypeId: {
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
    formatPercent(num) {
      return formatPercent(num);
    },
    formatTargetAmount({ targetAmount }) {
      if (
        this.targetTypeId === TARGET_TERM_LOOKUP.SEGMENT_SHARE ||
        this.targetTypeId === TARGET_TERM_LOOKUP.REVENUE_SHARE ||
        this.targetTypeId === TARGET_TERM_LOOKUP.SHARE_GAP ||
        this.targetTypeId === TARGET_TERM_LOOKUP.KPG
      ) {
        return formatPercent(targetAmount);
      } else {
        return targetAmount;
      }
    },
    showNewTargetLevelModal() {
      this.$modal.show('new-target-level', {
        targetTermId: this.targetTermId,
        targetTypeId: this.targetTypeId,
        incentiveTypeId: this.incentiveTypeId
      });
    },
    showEditTargetLevelModal(targetLevel) {
      this.$modal.show('edit-target-level', {
        targetTypeId: this.targetTypeId,
        incentiveTypeId: this.incentiveTypeId,
        targetLevel
      });
    },
    showDeleteTargetLevelModal(id) {
      this.$modal.show('delete-target-level', {
        id,
        targetTermId: this.targetTermId
      });
    },
    showIncentiveColumn() {
      if (this.incentiveTypeId === TARGET_TERM_LOOKUP.NONE) {
        return false;
      } else {
        return true;
      }
    },
    async toggleTargetLevel({ id, targetTermId }) {
      try {
        await this.$apollo.mutate({
          mutation: TOGGLE_TARGET_LEVEL,
          variables: {
            id,
            targetTermId
          },
          refetchQueries: () => [
            {
              query: GET_TARGET_TERM,
              variables: { id: this.targetTermId }
            }
          ]
        });
        this.toggleRow(targetTermId);
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    toggleRow(targetTermId) {
      this.$emit('toggle-row', targetTermId);
    }
  }
};
</script>
