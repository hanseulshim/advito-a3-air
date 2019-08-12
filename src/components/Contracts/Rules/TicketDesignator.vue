<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Ticket Designator</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
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
  </div>
</template>
<script>
import { removeTypename } from '@/helper';
import { GET_TICKET_DESIGNATOR_LIST, GET_DISCOUNT } from '@/graphql/queries';
import { UPDATE_TICKETING_DESIGNATOR } from '@/graphql/mutations';
export default {
  name: 'TicketDesignator',
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
    ticketDesignatorList: {
      query: GET_TICKET_DESIGNATOR_LIST,
      fetchPolicy: 'network-only',
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { ticketDesignatorList } }) {
        return removeTypename(ticketDesignatorList);
      }
    }
  },
  data() {
    return {
      editMode: false,
      ticketDesignator: '',
      ticketDesignatorList: []
    };
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.ticketDesignatorList.length) {
          this.$emit('delete-rule', 'TicketDesignator');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_TICKETING_DESIGNATOR,
            variables: {
              parentId: this.parentId,
              ticketDesignatorList: this.ticketDesignatorList
            },
            refetchQueries: () => [
              {
                query: GET_TICKET_DESIGNATOR_LIST,
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
        this.ticketDesignator = '';
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      if (
        this.ticketDesignator &&
        !this.ticketDesignatorList.some(
          rule => rule.ticketDesignator === this.ticketDesignator
        )
      ) {
        const ruleContainerId = this.ticketDesignatorList.length
          ? this.ticketDesignatorList[0].ruleContainerId
          : null;

        this.ticketDesignatorList.push({
          id: null,
          ruleContainerId,
          ticketDesignator: this.ticketDesignator,
          isDeleted: false
        });

        this.ticketDesignator = '';
      } else if (!this.ticketDesignator) {
        this.$modal.show('error', {
          message: 'Ticket Designator value is required'
        });
      } else if (
        this.ticketDesignator &&
        this.ticketDesignatorList.some(
          rule => rule.ticketDesignator === this.ticketDesignator
        )
      ) {
        this.$modal.show('error', {
          message: 'Duplicate Ticket Designator Value'
        });
      }
    },
    async deleteTag(tag) {
      try {
        const idx = this.ticketDesignatorList.indexOf(tag);
        this.ticketDesignatorList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_TICKETING_DESIGNATOR,
            variables: {
              parentId: this.parentId,
              ticketDesignatorList: this.ticketDesignatorList
            },
            refetchQueries: () => [
              {
                query: GET_TICKET_DESIGNATOR_LIST,
                variables: { parentId: this.parentId }
              }
            ]
          })
          .then(() => {
            const rulesRemaining = this.ticketDesignatorList.some(
              rule => !rule.isDeleted
            );
            if (!this.ticketDesignatorList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'TicketDesignator');
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
