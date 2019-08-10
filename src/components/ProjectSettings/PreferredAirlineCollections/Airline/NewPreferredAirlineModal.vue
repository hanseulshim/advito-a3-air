<template>
  <modal
    classes="modal-container"
    name="new-preferred-airline"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="newPreferredAirline"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="200px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">new preferred airline</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <div>
        <div class="form-label-no-select">Collection Name</div>
        <span>{{ collectionName }}</span>
      </div>
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
        <div class="airline-group-label">Point of Sale *</div>
        <el-select
          v-model="posId"
          class="select-modal airline-group-content"
          filterable
        >
          <el-option
            v-for="item in posList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="airline-group-item">
        <div class="airline-group-label">Preference Level *</div>
        <el-select
          v-model="preferenceLevelId"
          class="select-modal airline-group-content"
          filterable
        >
          <el-option
            v-for="item in preferenceLevelList"
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
        <div v-for="(airline, index) in form.airlineList" :key="index">
          <div class="airline-group-item">
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
          <div class="airline-group-item">
            <div class="airline-group-label" />
            <el-select
              v-model="airline.posIdList"
              class="select-modal airline-group-content"
              filterable
              multiple
            >
              <el-option
                v-for="item in posList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="airline-group-item">
            <div class="airline-group-label" />
            <el-select
              v-model="airline.preferenceLevelId"
              class="select-modal airline-group-content"
              filterable
            >
              <el-option
                v-for="item in preferenceLevelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
  GET_POS_LIST,
  GET_PREFERENCE_LEVEL_LIST,
  GET_PREFERRED_AIRLINE_COLLECTION_LIST,
  GET_AIRLINE_GROUP_LIST
} from '@/graphql/queries';
import { ADD_PREFERRED_AIRLINE } from '@/graphql/mutations';
export default {
  name: 'NewPreferredAirlineModal',
  apollo: {
    preferredAirlineCollectionList: {
      query: GET_PREFERRED_AIRLINE_COLLECTION_LIST
    },
    posList: {
      query: GET_POS_LIST
    },
    preferenceLevelList: {
      query: GET_PREFERENCE_LEVEL_LIST
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
        airlineList: []
      },
      collectionName: null,
      airlineIdList: [],
      posId: null,
      posIdList: [],
      preferenceLevelId: null,
      effectiveStartDate: null,
      effectiveEndDate: null,
      rules: {
        id: [
          {
            required: true,
            message: 'Please select a collection',
            trigger: 'change'
          }
        ]
      },
      preferredAirlineCollectionList: [],
      airlineGroupAirlineList: [],
      posList: [],
      preferenceLevelList: [],
      filteredOptions: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-preferred-airline');
    },
    validateForm() {
      this.$refs.newPreferredAirline.validate(valid => {
        if (valid) {
          this.addPreferredAirline();
        } else {
          return false;
        }
      });
    },
    addAirline() {
      if (
        this.airlineIdList.length &&
        this.posId &&
        this.preferenceLevelId &&
        this.effectiveStartDate
      ) {
        const airlineList = this.airlineIdList.map(id => ({
          id,
          posIdList: [this.posId],
          preferenceLevelId: this.preferenceLevelId,
          effectiveStartDate: this.effectiveStartDate,
          effectiveEndDate: this.effectiveEndDate
        }));
        this.form.airlineList.push(...airlineList);
        this.airlineIdList = [];
        this.posId = null;
        this.posIdList = [];
        this.preferenceLevelId = null;
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
    async addPreferredAirline() {
      try {
        const data = await this.$apollo.mutate({
          mutation: ADD_PREFERRED_AIRLINE,
          variables: {
            ...this.form
          }
        });
        this.$emit('toggle-row', data.data.addPreferredAirline.id);
        this.$modal.show('success', {
          message: 'Preferred Airline successfully created.',
          name: 'new-preferred-airline'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to create preferred Airline. Please try again.'
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
      this.form.airlineList = [];
      this.airlineIdList = [];
      this.posId = null;
      this.posIdList = [];
      this.preferenceLevelId = null;
      this.collectionName = null;
      this.filteredOptions = this.airlineGroupAirlineList;
    }
  }
};
</script>
