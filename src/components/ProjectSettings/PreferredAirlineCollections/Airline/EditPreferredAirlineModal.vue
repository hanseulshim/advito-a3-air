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
      <div>
        <div class="form-label-no-select airline-group">Collection Name</div>
        <span>{{ collectionName }}</span>
      </div>
      <div class="airline-group-item">
        <div class="airline-group-label">Airline Name *</div>
        <el-select
          v-model="airlineIdList"
          class="select-modal airline-group-content"
          filterable
          multiple
        >
          <el-option
            v-for="item in airlineList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="airline-group-item">
        <div class="airline-group-label">Point of Sale *</div>
        <el-select
          v-model="posIdList"
          class="select-modal airline-group-content"
          filterable
          multiple
        >
          <el-option
            v-for="item in countryList"
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
            :clearable="false"
            type="date"
            format="dd MMM yyyy"
            class="date-picker"
          />
          <el-date-picker
            v-model="effectiveEndDate"
            :clearable="false"
            type="date"
            format="dd MMM yyyy"
            class="date-picker"
          />
        </div>
      </div>
      <button
        class="button airline-group-button"
        type="button"
        @click="addAirline"
      >
        ADD
      </button>
      <div class="airline-group-container">
        <div v-for="(airline, index) in filteredAirlineList" :key="index">
          <div class="airline-group-item">
            <div class="airline-group-label">
              <el-tooltip effect="dark" content="Delete" placement="top">
                <i class="fas fa-times" @click="removeAirline(airline.id)" />
              </el-tooltip>
              {{ getAirline(airline.airlineId) }}
            </div>
            <div class="date-picker-container airline-group-content">
              <el-date-picker
                v-model="airline.effectiveStartDate"
                :clearable="false"
                type="date"
                format="dd MMM yyyy"
                class="date-picker"
              />
              <el-date-picker
                v-model="airline.effectiveEndDate"
                :clearable="false"
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
                v-for="item in countryList"
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
  GET_COUNTRY_LIST,
  GET_PREFERENCE_LEVEL_LIST,
  GET_PREFERRED_AIRLINE_LIST,
  GET_PREFERRED_AIRLINE_COLLECTION,
  GET_AIRLINE_LIST
} from '@/graphql/queries';
import { EDIT_PREFERRED_AIRLINE } from '@/graphql/mutations';
import { formatDatePickerTime } from '@/helper';
export default {
  name: 'EditPreferredAirlineModal',
  apollo: {
    countryList: {
      query: GET_COUNTRY_LIST
    },
    preferenceLevelList: {
      query: GET_PREFERENCE_LEVEL_LIST
    },
    airlineList: {
      query: GET_AIRLINE_LIST
    }
  },
  data() {
    return {
      form: {
        groupId: null,
        airlineList: []
      },
      collectionName: null,
      airlineIdList: [],
      posIdList: [],
      preferenceLevelId: null,
      effectiveStartDate: null,
      effectiveEndDate: null,
      airlineList: [],
      countryList: [],
      preferenceLevelList: []
    };
  },
  computed: {
    filteredAirlineList() {
      return this.form.airlineList.filter(airline => !airline.deleted);
    }
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
        this.posIdList.length &&
        this.preferenceLevelId &&
        this.effectiveStartDate &&
        this.effectiveEndDate
      ) {
        const airlineList = this.airlineIdList.map(airlineId => ({
          id: null,
          airlineId,
          posIdList: [...this.posIdList],
          preferenceLevelId: this.preferenceLevelId,
          effectiveStartDate: formatDatePickerTime(this.effectiveStartDate),
          effectiveEndDate: formatDatePickerTime(this.effectiveEndDate),
          deleted: false
        }));
        this.form.airlineList.push(...airlineList);
        this.airlineIdList = [];
        this.posIdList = [];
        this.preferenceLevelId = null;
        this.effectiveStartDate = null;
        this.effectiveEndDate = null;
      }
    },
    removeAirline(id) {
      this.form.airlineList.find(airline => airline.id === id).deleted = true;
    },
    getAirline(id) {
      return this.airlineList.filter(airline => airline.id === id)[0].name;
    },
    async editPreferredAirline() {
      try {
        await this.$apollo.mutate({
          mutation: EDIT_PREFERRED_AIRLINE,
          variables: {
            ...this.form,
            effectiveStartDate: formatDatePickerTime(
              this.form.effectiveStartDate
            ),
            effectiveEndDate: formatDatePickerTime(this.form.effectiveEndDate)
          },
          refetchQueries: () => [
            {
              query: GET_PREFERRED_AIRLINE_LIST,
              variables: { groupId: this.form.groupId }
            },
            {
              query: GET_PREFERRED_AIRLINE_COLLECTION,
              variables: {
                id: this.form.groupId,
                projectId: this.projectId
              }
            }
          ]
        });
        this.$emit('toggle-row', this.form.groupId);
        this.$modal.show('success', {
          message: 'Preferred Airline successfully edited.',
          name: 'edit-preferred-airline'
        });
      } catch (error) {
        console.log(error);
        this.$modal.show('error', {
          message: 'Failed to edit preferred Airline. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      const {
        id,
        groupId,
        collectionName,
        preferredAirlineList,
        projectId
      } = event.params;
      this.collectionName = collectionName;
      this.form.groupId = groupId;
      this.projectId = projectId;
      this.form.airlineList = preferredAirlineList
        .map(airline => ({
          id: airline.id,
          airlineId: airline.airlineId,
          effectiveStartDate: airline.effectiveStartDate,
          effectiveEndDate: airline.effectiveEndDate,
          preferenceLevelId: airline.preferenceLevelId,
          posIdList: airline.posList.map(pos => pos.locationId),
          deleted: false
        }))
        .sort(a => {
          return a.id === id ? -1 : 1;
        });
    },
    beforeClose() {
      this.form.groupId = null;
      this.form.airlineList = [];
      this.collectionName = null;
      this.airlineIdList = [];
      this.posIdList = [];
      this.preferenceLevelId = null;
      this.effectiveStartDate = null;
      this.effectiveEndDate = null;
    }
  }
};
</script>

<style lang="scss">
.preference-level-select {
  margin-left: 200px;
}
</style>
