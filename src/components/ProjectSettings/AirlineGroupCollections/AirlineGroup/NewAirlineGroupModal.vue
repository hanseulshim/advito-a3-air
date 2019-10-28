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
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal"></i>
        </el-tooltip>
      </div>
      <div>
        <div class="form-label-no-select airline-group">Collection Name</div>
        <span>{{ collectionName }}</span>
      </div>
      <el-form-item label="Airline Group Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Airline Group Code *" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="Effective Dates *">
        <div class="date-picker-container">
          <el-form-item prop="effectiveStartDate" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveStartDate"
              :clearable="false"
              type="date"
              format="dd MMM yyyy"
              class="date-picker"
            />
          </el-form-item>
          <el-form-item prop="effectiveEndDate" class="date-picker-item">
            <el-date-picker
              v-model="form.effectiveEndDate"
              :clearable="false"
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
        <div
          v-for="(airline, index) in form.airlineList"
          :key="index"
          class="airline-group-item"
        >
          <div class="airline-group-label">
            <el-tooltip effect="dark" content="Delete" placement="top">
              <i class="fas fa-times" @click="removeAirline(index)" />
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
      </div>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import {
  GET_AIRLINE_GROUP_LIST,
  GET_AIRLINE_GROUP_COLLECTION,
  GET_AIRLINE_LIST
} from '@/graphql/queries';
import { ADD_AIRLINE_GROUP } from '@/graphql/mutations';
import { formatDatePickerTime } from '@/helper';
export default {
  name: 'NewAirlineGroupModal',
  apollo: {
    airlineList: {
      query: GET_AIRLINE_LIST
    }
  },
  data() {
    return {
      form: {
        collectionId: null,
        name: null,
        code: null,
        effectiveStartDate: null,
        effectiveEndDate: null,
        airlineList: []
      },
      collectionName: null,
      airlineIdList: [],
      effectiveStartDate: null,
      effectiveEndDate: null,
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a travel sector name.',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: 'Please input a travel sector code.',
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
      airlineList: []
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
        const airlineList = this.airlineIdList.map(airlineId => ({
          airlineId,
          effectiveStartDate: formatDatePickerTime(this.effectiveStartDate),
          effectiveEndDate: formatDatePickerTime(this.effectiveEndDate)
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
      return this.airlineList.find(airline => airline.id === id).name;
    },
    async addAirlineGroup() {
      try {
        await this.$apollo.mutate({
          mutation: ADD_AIRLINE_GROUP,
          variables: {
            ...this.form,
            effectiveStartDate: formatDatePickerTime(
              this.form.effectiveStartDate
            ),
            effectiveEndDate: formatDatePickerTime(this.form.effectiveEndDate)
          },
          refetchQueries: () => [
            {
              query: GET_AIRLINE_GROUP_LIST,
              variables: { collectionId: this.form.collectionId }
            },
            {
              query: GET_AIRLINE_GROUP_COLLECTION,
              variables: {
                id: this.form.collectionId,
                projectId: this.project.id
              }
            }
          ]
        });
        this.$emit('toggle-row', this.form.collectionId);
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
    beforeOpen(event) {
      const { name, id } = event.params.collection;
      this.project = event.params.project;
      this.client = event.params.client;
      this.collectionName = name;
      this.form.collectionId = id;
    },
    beforeClose() {
      this.form.collectionId = null;
      this.form.name = null;
      this.form.code = null;
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
  &.airline-group {
    width: 200px;
  }
}
.airline-group-spacer {
  width: 200px;
  border: 1px solid $gray-nurse;
  margin: 2em 0;
}
.airline-group-container {
  min-height: 100px;
  max-height: 330px;
  overflow: auto;
  border: 1px solid $gray-nurse;
  padding: 0 1em;
  margin-top: 2em;
}
.airline-group-item {
  display: flex;
  margin: 1em 0;
  align-items: center;
  .airline-group-label {
    width: 200px;
    .fa-times {
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
