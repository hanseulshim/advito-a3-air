<template>
  <div class="rule-container">
    <p class="rule-title">Ticket Designation</p>
    <div class="control-row">
      <el-input
        v-model="ticketDesignator"
        size="mini"
        class="number-input"
        clearable
      />
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <el-tag
        v-for="rule in ticketDesignatorList"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ ` ${rule.ticketDesignator}` }}</el-tag
      >
    </div>
    <div class="bulk-save-container">
      <button class="save-rule-bulk" @click="saveRules">Save</button>
    </div>
  </div>
</template>
<script>
// import { UPDATE_TICKETING_DESIGNATOR } from '@/graphql/mutations';
export default {
  name: 'TicketDesignator',
  props: {
    parentTypw: {
      default: null,
      type: Number
    }
  },
  data() {
    return {
      ticketDesignator: '',
      ticketDesignatorList: []
    };
  },
  methods: {
    async saveRules() {
      // await this.$apollo.mutate({
      //   mutation: UPDATE_TICKETING_DESIGNATOR,
      //   variables: {
      //     parentId: this.parentId,
      //     ticketDesignatorList: this.ticketDesignatorList
      //   },
      //   refetchQueries: () => [
      //     {
      //       query: GET_TICKET_DESIGNATOR_LIST,
      //       variables: { parentId: this.parentId }
      //     },
      //     {
      //       query: GET_DISCOUNT,
      //       variables: {
      //         id: this.parentId
      //       }
      //     }
      //   ]
      // });
      this.ticketDesignator = '';
    },
    createTag() {
      this.ticketDesignatorList.push({
        id: null,
        ticketDesignator: this.ticketDesignator,
        isDeleted: false
      });

      this.ticketDesignator = '';
    },
    async deleteTag(tag) {
      const idx = this.ticketDesignatorList.indexOf(tag);
      this.ticketDesignatorList.splice(idx, 1);
      // this.ticketDesignatorList[idx].isDeleted = true;

      // await this.$apollo
      //   .mutate({
      //     mutation: UPDATE_TICKETING_DESIGNATOR,
      //     variables: {
      //       parentId: this.parentId,
      //       ticketDesignatorList: this.ticketDesignatorList
      //     },
      //     refetchQueries: () => [
      //       {
      //         query: GET_TICKET_DESIGNATOR_LIST,
      //         variables: { parentId: this.parentId }
      //       }
      //     ]
      //   })
      //   .then(() => {
      //     const rulesRemaining = this.ticketDesignatorList.some(
      //       rule => !rule.isDeleted
      //     );
      //     if (!this.ticketDesignatorList.length || !rulesRemaining) {
      //       this.$emit('delete-rule', 'TicketDesignator');
      //     }
      //   });
    }
  }
};
</script>
<style lang="scss">
@import '../Rules/ruleStyles.scss';
</style>
