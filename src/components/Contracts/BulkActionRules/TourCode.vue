<template>
  <div class="rule-container">
    <p class="rule-title">Tour Code</p>
    <div class="control-row">
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
    <div class="bulk-save-container">
      <button class="save-rule-bulk" @click="saveRules">Save</button>
    </div>
  </div>
</template>
<script>
// import { UPDATE_TOUR_CODE_LIST } from '@/graphql/mutations';
export default {
  name: 'TourCode',
  props: {
    parentType: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      tourCode: '',
      tourCodeList: []
    };
  },
  methods: {
    async saveRules() {
      // await this.$apollo.mutate({
      //   mutation: UPDATE_TOUR_CODE_LIST,
      //   variables: {
      //     parentId: this.parentId,
      //     tourCodeList: this.tourCodeList
      //   },
      //   refetchQueries: () => [
      //     {
      //       query: GET_TOUR_CODE_LIST,
      //       variables: { parentId: this.parentId }
      //     },
      //     {
      //       query: GET_DISCOUNT,
      //       variables: {
      //         id: this.parentId
      //       }
      //     }
      //   ]

      this.tourCode = '';
    },
    createTag() {
      this.tourCodeList.push({
        id: null,
        tourCode: this.tourCode,
        isDeleted: false
      });

      this.tourCode = '';
    },
    async deleteTag(tag) {
      const idx = this.tourCodeList.indexOf(tag);
      this.tourCodeList.splice(idx, 1);
      // this.tourCodeList[idx].isDeleted = true;

      // await this.$apollo
      //   .mutate({
      //     mutation: UPDATE_TOUR_CODE_LIST,
      //     variables: {
      //       parentId: this.parentId,
      //       tourCodeList: this.tourCodeList
      //     },
      //     refetchQueries: () => [
      //       {
      //         query: GET_TOUR_CODE_LIST,
      //         variables: { parentId: this.parentId }
      //       }
      //     ]
      //   })
      //   .then(() => {
      //     const rulesRemaining = this.tourCodeList.some(
      //       rule => !rule.isDeleted
      //     );
      //     if (!this.tourCodeList.length || !rulesRemaining) {
      //       this.$emit('delete-rule', 'TourCode');
      //     }
      //   });
    }
  }
};
</script>
<style lang="scss">
@import '../Rules/ruleStyles.scss';
</style>
