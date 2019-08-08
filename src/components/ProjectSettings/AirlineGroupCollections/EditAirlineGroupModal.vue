<template>
  <modal
    classes="modal-container"
    name="edit-airline-group"
    height="auto"
    :width="700"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="editAirlineGroup"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="200px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">edit airline group</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
        </el-tooltip>
      </div>
      <el-form-item label="Collection Name *" prop="id">
        <el-select v-model="form.id" class="select-modal">
          <el-option
            v-for="item in airlineGroupCollectionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Airline Group Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Effective Dates *">
        <div class="date-picker-container">
          <el-form-item prop="effectiveStartDate" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveStartDate"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item prop="effectiveEndDate" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveEndDate"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
        </div>
      </el-form-item>
      <div class="airline-group-spacer" />
      <div class="airline-group-item">
        <div class="airline-group-label">Airline Name *</div>
        <el-select
          v-model="airlineIdList"
          class="select-modal airline-group-content"
          filterable
          :filter-method="filterMethod"
          multiple
        >
          <el-option
            v-for="item in filteredOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="airline-group-item">
        <div class="airline-group-label">Effective Dates *</div>
        <div class="date-picker-container airline-group-content">
          <el-date-picker
            v-model="effectiveStartDate"
            type="date"
            format="dd MMM yyyy"
            class="date-picker"
          />
          <el-date-picker
            v-model="effectiveEndDate"
            type="date"
            format="dd MMM yyyy"
            class="date-picker"
          />
        </div>
      </div>
      <button class="button airline-group-button" @click="addAirline">
        ADD
      </button>
      <div class="airline-group-container">
        <div
          v-for="(airline, index) in form.airlineList"
          :key="index"
          class="airline-group-item airline-item"
        >
          <div class="airline-group-label">
            <el-tooltip effect="dark" content="Delete" placement="top">
              <i class="fas fa-times" @click="removeAirline(index)" />
            </el-tooltip>
            {{ getAirline(airline.id) }}
          </div>
          <div class="date-picker-container airline-group-content">
            <el-date-picker
              v-model="airline.effectiveStartDate"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
            <el-date-picker
              v-model="airline.effectiveEndDate"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </div>
        </div>
      </div>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_AIRLINE_GROUP_COLLECTION_LIST,
  GET_AIRLINE_GROUP_LIST
} from '@/graphql/queries';
import { ADD_AIRLINE_GROUP } from '@/graphql/mutations';
export default {
  name: 'EditAirlineGroupModal',
  apollo: {
    airlineGroupCollectionList: {
      query: GET_AIRLINE_GROUP_COLLECTION_LIST
    },
    airlineGroupAirlineList: {
      query: GET_AIRLINE_GROUP_LIST,
      update(data) {
        this.filteredOptions = data.airlineGroupAirlineList;
        return data.airlineGroupAirlineList;
      }
    }
  },
  data() {
    return {
      form: {
        id: null,
        collectionId: null,
        name: null,
        effectiveStartDate: null,
        effectiveEndDate: null,
        airlineList: []
      },
      airlineIdList: [],
      effectiveStartDate: null,
      effectiveEndDate: null,
      rules: {
        id: [
          {
            required: true,
            message: 'Please select a collection',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: 'Please input a travel sector name.',
            trigger: 'change'
          }
        ],
        effectiveStartDate: [
          {
            required: true,
            message: 'Please select an effective start date',
            trigger: 'change'
          }
        ],
        effectiveEndDate: [
          {
            required: true,
            message: 'Please select an effective end date',
            trigger: 'change'
          }
        ]
      },
      airlineGroupCollectionList: [],
      airlineGroupAirlineList: [],
      filteredOptions: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-airline-group');
    },
    validateForm() {
      this.$refs.editAirlineGroup.validate(valid => {
        if (valid) {
          this.addAirlineGroup();
        } else {
          return false;
        }
      });
    },
    addAirline() {
      if (this.airlineIdList.length && this.effectiveStartDate) {
        const airlineList = this.airlineIdList.map(id => ({
          id,
          effectiveStartDate: this.effectiveStartDate,
          effectiveEndDate: this.effectiveEndDate
        }));
        this.form.airlineList.push(...airlineList);
        this.airlineIdList = [];
        this.effectiveStartDate = null;
        this.effectiveEndDate = null;
      }
    },
    removeAirline(index) {
      this.form.airlineList.splice(index, 1);
    },
    getAirline(id) {
      return this.airlineGroupAirlineList.filter(
        airline => airline.id === id
      )[0].name;
    },
    async addAirlineGroup() {
      try {
        const data = await this.$apollo.mutate({
          mutation: ADD_AIRLINE_GROUP,
          variables: {
            ...this.form
          }
        });
        this.$emit('toggle-row', data.data.addAirlineGroup.id);
        this.$modal.show('success', {
          message: 'Airline Group successfully edited.',
          name: 'edit-airline-group'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to edit airline group. Please try again.'
        });
      }
    },
    filterMethod(value) {
      this.filteredOptions = this.airlineGroupAirlineList.filter(option => {
        return (
          option.name.toLowerCase().includes(value) ||
          option.code.toLowerCase().includes(value)
        );
      });
    },
    beforeOpen(event) {
      const airlineGroup = event.params.airlineGroup;
      const collectionId = event.params.collectionId;
      this.form.id = airlineGroup.id;
      this.form.collectionId = collectionId;
      this.form.name = airlineGroup.name;
      this.form.effectiveStartDate = airlineGroup.effectiveStartDate;
      this.form.effectiveEndDate = airlineGroup.effectiveEndDate;
      this.form.airlineList = airlineGroup.airlineList.map(airline => ({
        id: airline.id,
        effectiveStartDate: airline.effectiveStartDate,
        effectiveEndDate: airline.effectiveEndDate
      }));
    },
    beforeClose() {
      this.id = null;
      this.name = null;
      this.effectiveStartDate = null;
      this.effectiveEndDate = null;
      this.airlineList = [];
      this.airlineIdList = [];
      this.effectiveStartDate = null;
      this.effectiveEndDate = null;
      this.filteredOptions = this.airlineGroupAirlineList;
    }
  }
};
</script>
