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
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
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
        <button class="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_POS_LIST,
  GET_PREFERENCE_LEVEL_LIST,
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
    posList: {
      query: GET_POS_LIST
    },
    preferenceLevelList: {
      query: GET_PREFERENCE_LEVEL_LIST
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
      const { airlineList, collectionId, id } = event.params;
      this.form.id = collectionId;
      this.form.airlineList = airlineList
        .map(airline => {
          const posIdList = this.posList
            .filter(pos => {
              return airline.pos.indexOf(pos.name) !== -1;
            })
            .map(pos => pos.id);
          const preferenceLevelId = this.preferenceLevelList.filter(
            preferenceLevel => preferenceLevel.name === airline.preferenceLevel
          )[0].id;
          return {
            id: airline.id,
            posIdList,
            preferenceLevelId,
            effectiveStartDate: airline.effectiveStartDate,
            effectiveEndDate: airline.effectiveEndDate
          };
        })
        .sort(a => {
          return a.id === id ? -1 : 1;
        });
    },
    beforeClose() {
      this.form.id = null;
      this.form.airlineList = [];
      this.airlineIdList = [];
      this.posId = null;
      this.posIdList = [];
      this.preferenceLevelId = null;
      this.filteredOptions = this.airlineGroupAirlineList;
    }
  }
};
</script>

<style lang="scss">
.preference-level-select {
  margin-left: 200px;
}
</style>
