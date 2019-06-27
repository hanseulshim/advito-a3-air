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
          v-for="item in basis"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <el-input
        v-model="input"
        size="mini"
        class="number-input"
        min="0"
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
import { GET_FARE_BASIS_LIST, GET_FARE_BASIS_MATCHES } from '@/graphql/queries';
import { UPDATE_FARE_BASIS_LIST } from '@/graphql/mutations';
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
    fareBasisUnits: {
      query: GET_FARE_BASIS_MATCHES
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
      basis: [
        'Matches',
        'Starts With',
        'Ends With',
        'Contains Any',
        'Contains All'
      ],
      selectedBasis: '',
      exclude: false,
      editMode: true,
      input: '',
      fareBasisList: []
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
