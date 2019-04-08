<template>
  <modal
    classes="modal-container"
    name="edit-preferred-airline"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="editPreferredAirline"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="200px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">edit preferred airline</div>
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </div>
      <el-form-item label="Collection Name *" prop="id">
        <el-select v-model="form.id" class="select-modal" disabled>
          <el-option
            v-for="item in preferredAirlineCollectionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
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
            v-for="item in preferredAirlineInfo.posList"
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
            v-for="item in preferredAirlineInfo.preferenceLevelList"
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
      <div class="preferred-airline-list-container">
        <div v-for="(airline, index) in form.airlineList" :key="index">
          <div class="airline-group-item">
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
          <div class="airline-group-item">
            <div class="airline-group-label" />
            <el-select
              v-model="airline.posId"
              class="select-modal airline-group-content"
              filterable
            >
              <el-option
                v-for="item in preferredAirlineInfo.posList"
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
                v-for="item in preferredAirlineInfo.preferenceLevelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
  GET_PREFERRED_AIRLINE_INFO,
  GET_PREFERRED_AIRLINE_COLLECTION_LIST,
  GET_AIRLINE_LIST
} from '@/graphql/queries';
import { EDIT_PREFERRED_AIRLINE } from '@/graphql/mutations';
export default {
  name: 'EditPreferredAirlineModal',
  apollo: {
    preferredAirlineCollectionList: {
      query: GET_PREFERRED_AIRLINE_COLLECTION_LIST
    },
    preferredAirlineInfo: {
      query: GET_PREFERRED_AIRLINE_INFO
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
        airlineList: []
      },
      airlineIdList: [],
      posId: null,
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
      preferredAirlineInfo: {},
      filteredOptions: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-preferred-airline');
    },
    validateForm() {
      this.$refs.editPreferredAirline.validate(valid => {
        if (valid) {
          this.editPreferredAirline();
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
          posId: this.posId,
          preferenceLevelId: this.preferenceLevelId,
          effectiveStartDate: this.effectiveStartDate,
          effectiveEndDate: this.effectiveEndDate
        }));
        this.form.airlineList.push(...airlineList);
        this.airlineIdList = [];
        this.posId = null;
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
    async editPreferredAirline() {
      try {
        const data = await this.$apollo.mutate({
          mutation: EDIT_PREFERRED_AIRLINE,
          variables: {
            ...this.form
          }
        });
        this.$emit('toggle-row', data.data.editPreferredAirline.id);
        this.$modal.show('success', {
          message: 'Preferred Airline successfully edited.',
          name: 'edit-preferred-airline'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to edit preferred Airline. Please try again.'
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
      const airlineList = event.params.airlineList;
      const collectionId = event.params.collectionId;
      this.form.id = collectionId;
      this.form.airlineList = airlineList.map(airline => {
        const posId = this.preferredAirlineInfo.posList.filter(
          pos => pos.name === airline.pos
        )[0].id;
        const preferenceLevelId = this.preferredAirlineInfo.preferenceLevelList.filter(
          preferenceLevel => preferenceLevel.name === airline.preferenceLevel
        )[0].id;
        return {
          id: airline.id,
          posId,
          preferenceLevelId,
          effectiveStartDate: airline.effectiveStartDate,
          effectiveEndDate: airline.effectiveEndDate
        };
      });
    },
    beforeClose() {
      this.form.id = null;
      this.form.airlineList = [];
      this.airlineIdList = [];
      this.posId = null;
      this.preferenceLevelId = null;
    }
  }
};
</script>

<style lang="scss">
.preference-level-select {
  margin-left: 200px;
}
</style>
