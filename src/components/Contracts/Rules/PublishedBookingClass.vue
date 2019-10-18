<template>
  <div v-loading="$apollo.loading" class="rule-container">
    <p class="rule-title">Published Booking Class</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">Save</button>
    <div v-if="editMode" class="control-row">
      <el-select
        v-model="selectedClass"
        filterable
        placeholder="Select"
        size="mini"
        clearable
        multiple
      >
        <el-option
          v-for="item in bookingClassCodeList"
          :key="item.code"
          :label="item.code"
          :value="item.code"
        ></el-option>
      </el-select>
      <label for="exclude">Exclude:</label>
      <el-checkbox v-model="exclude" name="exclude" />
      <button @click="createTag">Add</button>
    </div>
    <div class="rule-tags">
      <label v-if="includedRules.length">Included:</label>
      <el-tag
        v-for="rule in includedRules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ rule.bookingClass }}</el-tag
      >
    </div>
    <div class="rule-tags">
      <label v-if="excludedRules.length">Excluded:</label>
      <el-tag
        v-for="rule in excludedRules"
        :key="rule.index"
        type="info"
        size="small"
        closable
        @close="deleteTag(rule)"
        >{{ rule.bookingClass }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import {
  GET_BOOKING_CLASS_CODES,
  GET_BOOKING_CLASS_RULE_LIST,
  GET_DISCOUNT
} from '@/graphql/queries';
import { PRICING_TERM_LOOKUP } from '@/graphql/constants';
import { UPDATE_BOOKING_CLASS } from '@/graphql/mutations';
import { removeTypename } from '@/helper';
export default {
  name: 'PublishedBookingClass',
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
    bookingClassCodeList: {
      query: GET_BOOKING_CLASS_CODES
    },
    bookingClassRuleList: {
      query: GET_BOOKING_CLASS_RULE_LIST,
      variables() {
        return {
          parentId: this.parentId,
          bookingClassType: PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE
        };
      },
      result({ data: { bookingClassRuleList } }) {
        return removeTypename(bookingClassRuleList);
      }
    }
  },
  data() {
    return {
      bookingClassCodeList: [],
      bookingClassRuleList: [],
      exclude: false,
      editMode: false,
      selectedClass: []
    };
  },
  computed: {
    excludedRules() {
      return this.bookingClassRuleList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.bookingClassRuleList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    async saveRules() {
      try {
        if (this.editMode && !this.bookingClassRuleList.length) {
          this.$emit('delete-rule', 'PublishedBookingClass');
        } else if (this.editMode) {
          await this.$apollo.mutate({
            mutation: UPDATE_BOOKING_CLASS,
            variables: {
              parentId: this.parentId,
              bookingClassType:
                PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE,
              bookingClassList: this.bookingClassRuleList
            },
            refetchQueries: () => [
              {
                query: GET_BOOKING_CLASS_RULE_LIST,
                variables: {
                  parentId: this.parentId,
                  bookingClassType:
                    PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE
                }
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
        this.selectedClass = [];
      } catch (error) {
        this.$modal.show('error', {
          message: error.message
        });
      }
    },
    createTag() {
      const ruleContainerId = this.bookingClassRuleList.length
        ? this.bookingClassRuleList[0].ruleContainerId
        : null;

      this.selectedClass.map(v => {
        this.bookingClassRuleList.push({
          id: null,
          ruleContainerId,
          bookingClassType: PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE,
          bookingClass: v,
          exclude: this.exclude,
          isDeleted: false
        });
      });

      this.selectedClass = [];
    },
    async deleteTag(tag) {
      try {
        const idx = this.bookingClassRuleList.indexOf(tag);
        this.bookingClassRuleList[idx].isDeleted = true;

        await this.$apollo
          .mutate({
            mutation: UPDATE_BOOKING_CLASS,
            variables: {
              parentId: this.parentId,
              bookingClassType:
                PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE,
              bookingClassList: this.bookingClassRuleList
            },
            refetchQueries: () => [
              {
                query: GET_BOOKING_CLASS_RULE_LIST,
                variables: {
                  parentId: this.parentId,
                  bookingClassType:
                    PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE
                }
              }
            ]
          })
          .then(() => {
            const rulesRemaining = this.bookingClassRuleList.some(
              rule => !rule.isDeleted
            );
            if (!this.bookingClassRuleList.length || !rulesRemaining) {
              this.$emit('delete-rule', 'PublishedBookingClass');
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
