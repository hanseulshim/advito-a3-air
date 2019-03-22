<template>
  <modal
    classes="modal-container"
    name="new-preferred-airline"
    height="auto"
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
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </div>
      <el-form-item label="Collection Name *" prop="id">
        <el-select v-model="form.id" class="select-modal">
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
          v-model="airlineId"
          class="select-modal airline-group-content"
          filterable
        >
          <el-option
            v-for="item in airlineGroupAirlineList"
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
      <button class="button airline-group-button" @click="addAirline">
        ADD
      </button>
      <div class="airline-group-spacer" />
      <div v-for="(airline, index) in form.airlineList" :key="index">
        <div class="airline-group-item">
          <div class="airline-group-label">
            <i class="fas fa-times" @click="removeAirline(index)" />
            {{ getAirline(airline.id) }}
          </div>
          <el-select v-model="airline.posId" class="select-modal" filterable>
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
            class="select-modal"
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
import { ADD_PREFERRED_AIRLINE } from '@/graphql/mutations';
export default {
  name: 'NewPreferredAirlineModal',
  apollo: {
    preferredAirlineCollectionList: {
      query: GET_PREFERRED_AIRLINE_COLLECTION_LIST
    },
    preferredAirlineInfo: {
      query: GET_PREFERRED_AIRLINE_INFO
    },
    airlineGroupAirlineList: {
      query: GET_AIRLINE_LIST
    }
  },
  data() {
    return {
      form: {
        id: null,
        airlineList: []
      },
      airlineId: null,
      posId: null,
      preferenceLevelId: null,
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
      preferredAirlineInfo: {}
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
      if (this.airlineId && this.posId && this.preferenceLevelId) {
        const airline = {
          id: this.airlineId,
          posId: this.posId,
          preferenceLevelId: this.preferenceLevelId
        };
        this.form.airlineList.push(airline);
        this.airlineId = null;
        this.posId = null;
        this.preferenceLevelId = null;
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
    beforeClose() {
      this.form.id = null;
      this.form.airlineList = [];
      this.airlineId = null;
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
