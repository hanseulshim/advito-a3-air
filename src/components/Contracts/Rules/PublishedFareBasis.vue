<template>
  <div class="rule-container">
    <p class="rule-title">Published Fare Basis</p>
    <i
      v-if="!editMode"
      class="fas fa-pencil-alt edit-rule"
      @click="saveRules"
    />
    <button v-if="editMode" class="save-rule" @click="saveRules">
      Save
    </button>
    <div v-if="editMode" class="control-row">
      <el-select
        v-model="selectedBasis"
        filterable
        placeholder="Select"
        size="mini"
        clearable
      >
        <el-option
          v-for="item in fareBasisUnitList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input v-model="value" size="mini" class="number-input" clearable />
      <label v-if="selectedBasis === 86 || selectedBasis === 87"
        >Position:
      </label>
      <el-input-number
        v-if="selectedBasis === 86 || selectedBasis === 87"
        v-model="position"
        size="mini"
        class="number-input"
        :min="0"
        clearable
      />

      <label for="exclude"> Exclude: </label>
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
        >{{ `${rule.basis} ${rule.input}` }}</el-tag
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
        >{{ `${rule.basis} ${rule.input}` }}</el-tag
      >
    </div>
  </div>
</template>
<script>
import { removeTypename } from '@/helper';
import {
  GET_FARE_BASIS_LIST,
  GET_FARE_BASIS_UNIT_LIST
} from '@/graphql/queries';
import { UPDATE_FARE_BASIS_LIST } from '@/graphql/mutations';
import { PRICING_TERM_LOOKUP } from '@/graphql/constants';
export default {
  name: 'PublishedFareBasis',
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
    fareBasisUnitList: {
      query: GET_FARE_BASIS_UNIT_LIST
    },
    fareBasisList: {
      query: GET_FARE_BASIS_LIST,
      variables() {
        return {
          parentId: this.parentId
        };
      },
      result({ data: { fareBasisList } }) {
        return removeTypename(fareBasisList);
      }
    }
  },
  data() {
    return {
      fareBasisList: [],
      fareBasisUnitList: [],
      selectedBasis: '',
      exclude: false,
      editMode: true,
      input: ''
    };
  },
  computed: {
    excludedRules() {
      return this.fareBasisList.filter(rule => rule.exclude);
    },
    includedRules() {
      return this.fareBasisList.filter(rule => !rule.exclude);
    }
  },
  methods: {
    saveRules() {
      if (this.editMode && !this.fareBasisList.length) {
        this.$emit('delete-rule', 'PublishedFareBasis');
      }
      this.editMode = !this.editMode;
    },
    createTag() {
      this.fareBasisList.push({
        basis: this.selectedBasis,
        input: this.input,
        exclude: this.exclude
      });

      this.selectedBasis = '';
      this.input = '';
    },
    deleteTag(tag) {
      this.fareBasisList.splice(this.fareBasisList.indexOf(tag), 1);
      if (!this.fareBasisList.length) {
        this.$emit('delete-rule', 'PublishedFareBasis');
      }
    }
  }
};
</script>
<style lang="scss">
@import './ruleStyles.scss';
</style>
