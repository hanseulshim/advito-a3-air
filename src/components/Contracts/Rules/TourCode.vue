<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Tour Code</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
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
import { GET_TOUR_CODE_LIST, GET_DISCOUNT } from '@/graphql/queries';
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
      fetchPolicy: 'network-only',
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
      editMode: false,
      tourCode: '',
      tourCodeList: []
    };
  },
  methods: {
    async saveRules() {
      try {
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
              },
              {
                query: GET_DISCOUNT,
                variables: {
                  id: this.parentId
                }
              }
            ]
          });
        }
        this.editMode = !this.editMode;
        this.tourCode = '';
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      if (
        this.tourCode &&
        !this.tourCodeList.some(rule => rule.tourCode === this.tourCode)
      ) {
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
      } else if (!this.tourCode) {
        this.$modal.show('error', {
          message: 'Tour Code value is required'
        });
      } else if (
        this.tourCode &&
        this.tourCodeList.some(rule => rule.tourCode === this.tourCode)
      ) {
        this.$modal.show('error', {
          message: 'Duplicate Tour Code Value'
        });
      }
    },
    async deleteTag(tag) {
      try {
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
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
