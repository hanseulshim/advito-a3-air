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
          v-for="(airline, index) in filteredAirlineList"
          :key="index"
          class="airline-group-item airline-item"
        >
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
      </div>
      <el-form-item class="save-container">
        <button class="button" type="button" @click="validateForm">SAVE</button>
      </el-form-item>
    </el-form>
  </modal>
</template>

<script>
import { GET_AIRLINE_GROUP_LIST, GET_AIRLINE_LIST } from '@/graphql/queries';
import { EDIT_AIRLINE_GROUP } from '@/graphql/mutations';
export default {
  name: 'EditAirlineGroupModal',
  apollo: {
    airlineList: {
      query: GET_AIRLINE_LIST
    }
  },
  data() {
    return {
      form: {
        carrierGroupId: null,
        name: null,
        code: null,
        effectiveStartDate: null,
        effectiveEndDate: null,
        airlineList: []
      },
      collectionId: null,
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
      airlineList: [],
      airlineListCopy: []
    };
  },
  computed: {
    filteredAirlineList() {
      return this.airlineListCopy.filter(airline => !airline.delete);
    }
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
      if (
        this.airlineIdList.length &&
        this.effectiveStartDate &&
        this.effectiveEndDate
      ) {
        const airlineList = this.airlineIdList.map(airlineId => ({
          id: null,
          airlineId,
          effectiveStartDate: this.effectiveStartDate,
          effectiveEndDate: this.effectiveEndDate,
          delete: false
        }));
        this.airlineListCopy.push(...airlineList);
        this.airlineIdList = [];
        this.effectiveStartDate = null;
        this.effectiveEndDate = null;
      }
    },
    removeAirline(id) {
      this.airlineListCopy.find(airline => airline.id === id).delete = true;
    },
    getAirline(id) {
      return this.airlineList.find(airline => airline.id === id).name;
    },
    async addAirlineGroup() {
      try {
        this.form.airlineList = this.airlineListCopy.filter(
          airline => !airline.id || airline.delete
        );
        this.form.airlineList.forEach(airline => {
          delete airline.delete;
        });
        await this.$apollo.mutate({
          mutation: EDIT_AIRLINE_GROUP,
          variables: {
            ...this.form
          },
          refetchQueries: () => [
            {
              query: GET_AIRLINE_GROUP_LIST,
              variables: { collectionId: this.collectionId }
            }
          ]
        });
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
    beforeOpen(event) {
      const { airlineGroup, collectionId, collectionName } = event.params;
      this.collectionId = collectionId;
      this.collectionName = collectionName;
      this.form.carrierGroupId = airlineGroup.id;
      this.form.name = airlineGroup.name;
      this.form.code = airlineGroup.code;
      this.form.effectiveStartDate = airlineGroup.effectiveStartDate;
      this.form.effectiveEndDate = airlineGroup.effectiveEndDate;
      this.airlineListCopy = airlineGroup.airlineGroupMemberList.map(
        airline => ({
          id: airline.id,
          airlineId: airline.airlineId,
          effectiveStartDate: airline.effectiveStartDate,
          effectiveEndDate: airline.effectiveEndDate,
          delete: false
        })
      );
    },
    beforeClose() {
      this.form.carrierGroupId = null;
      this.form.name = null;
      this.form.code = null;
      this.form.effectiveStartDate = null;
      this.form.effectiveEndDate = null;
      this.form.airlineList = [];
      this.collectionId = null;
      this.collectionName = null;
      this.airlineIdList = [];
      this.effectiveStartDate = null;
      this.effectiveEndDate = null;
      this.airlineListCopy = [];
    }
  }
};
</script>
