<template>
  <div class="rule-container">
    <p class="rule-title">Tour Code</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <el-input v-model="tourCode" size="mini" class="number-input" clearable />
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in tourCodeList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ ` ${rule.tourCode}` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { removeTypename } from '@/helper';
import { GET_TOUR_CODE_LIST } from '@/graphql/queries';
import { UPDATE_TOUR_CODE_LIST } from '@/graphql/mutations';
export default {
  name: 'TourCode',
  props: {
    parentId: {
      default: null,
      type: Number
    },
    tableId: {
      default: null,
      type: Number
    }
  },
  apollo: {
    tourCodeList: {
      query: GET_TOUR_CODE_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { tourCodeList } }) {
        return removeTypename(tourCodeList);
      }
    }
  },
  data() {
    return {
      editMode: true,
      tourCode: '',
      tourCodeList: []
    };
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.tourCodeList.length) {
        this.$emit('delete-rule', 'TourCode');
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_TOUR_CODE_LIST,
          variables: {
            parentId: this.parentId,
            tourCodeList: this.tourCodeList
          },
          refetchQueries: () => [
            {
              query: GET_TOUR_CODE_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.tourCode = '';
    },
    createTag() {
      const ruleContainerId = this.tourCodeList.length
        ? this.tourCodeList[0].ruleContainerId
        : null;

      this.tourCodeList.push({
        id: null,
        ruleContainerId,
        tourCode: this.tourCode,
        isDeleted: false
      });

      this.tourCode = '';
    },
    async deleteTag(tag) {
      const idx = this.tourCodeList.indexOf(tag);
      this.tourCodeList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_TOUR_CODE_LIST,
          variables: {
            parentId: this.parentId,
            tourCodeList: this.tourCodeList
          },
          refetchQueries: () => [
            {
              query: GET_TOUR_CODE_LIST,
              variables: { parentId: this.parentId }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.tourCodeList.some(
            rule => !rule.isDeleted
          );
          if (!this.tourCodeList.length || !rulesRemaining) {
            this.$emit('delete-rule', 'TourCode');
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
