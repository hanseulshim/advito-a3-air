<template>
  <modal
    classes="modal-container"
    name="new-airline-group"
    height="auto"
    :width="700"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="newAirlineGroup"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="200px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">new airline group</div>
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </div>
      <div>
        <div class="form-label-no-select">Collection Name</div>
        <span>{{ collectionName }}</span>
      </div>
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
      <div class="airline-group-spacer" />
      <div class="airline-group-container">
        <div
          v-for="(airline, index) in form.airlineList"
          :key="index"
          class="airline-group-item"
        >
          <div class="airline-group-label">
            <i class="fas fa-times" @click="removeAirline(index)" />
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
        <button class="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_AIRLINE_GROUP_COLLECTION_LIST,
  GET_AIRLINE_LIST
} from '@/graphql/queries';
import { ADD_AIRLINE_GROUP } from '@/graphql/mutations';
export default {
  name: 'NewAirlineGroupModal',
  apollo: {
    airlineGroupCollectionList: {
      query: GET_AIRLINE_GROUP_COLLECTION_LIST
    },
    airlineGroupAirlineList: {
      query: GET_AIRLINE_LIST,
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
        name: null,
        effectiveStartDate: null,
        effectiveEndDate: null,
        airlineList: []
      },
      collectionName: null,
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
      this.$modal.hide('new-airline-group');
    },
    validateForm() {
      this.$refs.newAirlineGroup.validate(valid => {
        if (valid) {
          this.addAirlineGroup();
        } else {
          return false;
        }
      });
    },
    addAirline() {
      if (
        this.airlineIdList.length &&
        this.effectiveStartDate &&
        this.effectiveEndDate
      ) {
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
          message: 'Airline Group successfully created.',
          name: 'new-airline-group'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to create airline group. Please try again.'
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
      const collection = event.params.collection;
      this.collectionName = collection.name;
      this.form.id = collection.id;
    },
    beforeClose() {
      this.form.id = null;
      this.form.name = null;
      this.form.effectiveStartDate = null;
      this.form.effectiveEndDate = null;
      this.form.airlineList = [];
      this.airlineIdList = [];
      this.effectiveStartDate = null;
      this.effectiveEndDate = null;
      this.collectionName = null;
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.form-label-no-select {
  width: 200px;
}
.airline-group-spacer {
  width: 200px;
  border: 1px solid $gray-nurse;
  margin: 2em 0;
}
.airline-group-container {
  max-height: 300px;
  overflow: auto;
}
.airline-group-item {
  display: flex;
  margin-top: 1em;
  align-items: center;
  .airline-group-label {
    width: 200px;
    .fa-times {
      cursor: pointer;
      margin-right: 5px;
    }
  }
  .airline-group-content {
    flex: 1;
    .date-picker {
      width: 48%;
    }
  }
}
.airline-group-button {
  margin-left: 200px;
  margin-top: 2em;
}
</style>
