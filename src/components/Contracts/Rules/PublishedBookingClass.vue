<template>
  <div class="rule-container">
    <p class="rule-title">Published Booking Class</p>
    <i v-if="!editMode" class="fas fa-pencil-alt edit-rule" @click="saveRules"/>
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
      <el-checkbox v-model="exclude" name="exclude"/>
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
      >{{ rule.bookingClass }}</el-tag>
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
      >{{ rule.bookingClass }}</el-tag>
    </div>
  </div>
</template>
<script>
import {
  GET_BOOKING_CLASS_CODES,
  GET_BOOKING_CLASS_LIST
} from "@/graphql/queries";
import { PRICING_TERM_LOOKUP } from "@/graphql/constants";
import { UPDATE_BOOKING_CLASS } from "@/graphql/mutations";
import { removeTypename } from "@/helper";
export default {
  name: "PublishedBookingClass",
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
    bookingClassList: {
      query: GET_BOOKING_CLASS_LIST,
      variables() {
        return {
          parentId: this.parentId,
          bookingClassType: PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE
        };
      },
      result({ data: { bookingClassList } }) {
        return removeTypename(bookingClassList);
      }
    }
  },
  data() {
    return {
      bookingClassCodeList: [],
      bookingClassList: [],
      exclude: false,
      editMode: false,
      selectedClass: []
    };
  },
  computed: {
    excludedRules() {
      return this.bookingClassList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.bookingClassList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    async saveRules() {
      if (this.editMode && !this.bookingClassList.length) {
        this.$emit("delete-rule", "PublishedBookingClass");
      } else if (this.editMode) {
        await this.$apollo.mutate({
          mutation: UPDATE_BOOKING_CLASS,
          variables: {
            parentId: this.parentId,
            bookingClassType: PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE,
            bookingClassList: this.bookingClassList
          },
          refetchQueries: () => [
            {
              query: GET_BOOKING_CLASS_LIST,
              variables: {
                parentId: this.parentId,
                bookingClassType:
                  PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE
              }
            }
          ]
        });
      }
      this.editMode = !this.editMode;
      this.selectedClass = [];
    },
    createTag() {
      const ruleContainerId = this.bookingClassList.length
        ? this.bookingClassList[0].ruleContainerId
        : null;

      this.selectedClass.map(v => {
        this.bookingClassList.push({
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
      const idx = this.bookingClassList.indexOf(tag);
      this.bookingClassList[idx].isDeleted = true;

      await this.$apollo
        .mutate({
          mutation: UPDATE_BOOKING_CLASS,
          variables: {
            parentId: this.parentId,
            bookingClassType: PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE,
            bookingClassList: this.bookingClassList
          },
          refetchQueries: () => [
            {
              query: GET_BOOKING_CLASS_LIST,
              variables: {
                parentId: this.parentId,
                bookingClassType:
                  PRICING_TERM_LOOKUP.PUBLISHED_BOOKING_CLASS_TYPE
              }
            }
          ]
        })
        .then(() => {
          const rulesRemaining = this.bookingClassList.some(
            rule => !rule.isDeleted
          );
          if (!this.bookingClassList.length || !rulesRemaining) {
            this.$emit("delete-rule", "PublishedBookingClass");
          }
        });
    }
  }
};
</script>
<style lang="scss">
@import "./ruleStyles.scss";
</style>
