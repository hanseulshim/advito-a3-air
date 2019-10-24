<template>
  <modal
    classes="modal-container"
    name="new-travel-sector"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="newTravelSector"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="200px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">new travel sector</div>
        <el-tooltip effect="dark" content="Close Modal" placement="top">
          <i class="fas fa-times close-modal-button" @click="hideModal" />
        </el-tooltip>
      </div>
      <div>
        <div class="form-label-no-select">Client</div>
        <span>{{ client.name }}</span>
      </div>
      <div>
        <div class="form-label-no-select">Project</div>
        <span>{{ project.name }}</span>
      </div>
      <div>
        <div class="form-label-no-select">Collection Name</div>
        <span>{{ collectionName }}</span>
      </div>
      <el-form-item label="Travel Sector Name *" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Travel Sector Short Name *" prop="shortName">
        <el-input v-model="form.shortName" />
      </el-form-item>
      <div class="bidirectional-container">
        <div class="bidirectional-label">
          Origin / Destination (bidirectional)
        </div>
        <div class="bidirectional-content">
          <el-select
            v-model="origin"
            class="select-modal"
            filterable
            remote
            reserve-keyword
            placeholder="Please enter a keyword"
            :remote-method="filterOrigin"
            :loading="loadingOrigin"
            value-key="name"
            @change="clearOrigin"
          >
            <el-option
              v-for="item in originOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="destination"
            class="select-modal bidirectional-spacer"
            filterable
            remote
            reserve-keyword
            placeholder="Please enter a keyword"
            :remote-method="filterDestination"
            :loading="loadingDestination"
            value-key="name"
            @change="clearDestination"
          >
            <el-option
              v-for="item in destinationOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-checkbox v-model="exclude" class="bidirectional-spacer"
            >Exclude</el-checkbox
          >
          <button
            class="button long bidirectional-spacer"
            type="button"
            @click="addGeography"
          >
            ADD BIDIRECTION
          </button>
        </div>
      </div>
      <div class="geography-list-container">
        <div
          v-for="(geography, index) in form.geographyList"
          :key="index"
          class="geography-item"
        >
          {{ getRegion(geography.origin) }} &lt;—&gt;
          {{ getRegion(geography.destination) }}
          <el-tooltip effect="dark" content="Delete" placement="top">
            <i class="fas fa-times" @click="removeGeography(index)" />
          </el-tooltip>
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
  GET_GEOGRAPHY_LIST,
  GET_TRAVEL_SECTOR_LIST,
  GET_TRAVEL_SECTOR_COLLECTION
} from '@/graphql/queries';
import { ADD_TRAVEL_SECTOR } from '@/graphql/mutations';
import { filterByNameAndCode } from '@/helper';
export default {
  name: 'NewTravelSectorModal',
  apollo: {
    geographyList: {
      query: GET_GEOGRAPHY_LIST
    }
  },
  data() {
    return {
      form: {
        groupId: null,
        name: null,
        shortName: null,
        geographyList: []
      },
      collectionName: null,
      origin: null,
      loadingOrigin: false,
      originOptions: [],
      destination: null,
      loadingDestination: false,
      destinationOptions: [],
      exclude: false,
      rules: {
        name: [
          {
            required: true,
            message: 'Please input a travel sector name.',
            trigger: 'change'
          }
        ],
        shortName: [
          {
            required: true,
            message: 'Please input a travel sector short name.',
            trigger: 'change'
          }
        ]
      },
      client: {},
      project: {},
      geographyList: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-travel-sector');
    },
    validateForm() {
      this.$refs.newTravelSector.validate(valid => {
        if (valid) {
          this.addTravelSector();
        } else {
          return false;
        }
      });
    },
    addGeography() {
      if (this.origin && this.destination) {
        const geography = {
          origin: this.origin,
          destination: this.destination,
          exclude: this.exclude
        };
        this.form.geographyList.push(geography);
        this.origin = null;
        this.destination = null;
        this.exclude = false;
      }
    },
    removeGeography(index) {
      this.form.geographyList.splice(index, 1);
    },
    getRegion(id) {
      return this.geographyList.find(geo => geo.id === id).name;
    },
    async addTravelSector() {
      try {
        await this.$apollo.mutate({
          mutation: ADD_TRAVEL_SECTOR,
          variables: {
            ...this.form
          },
          refetchQueries: () => [
            {
              query: GET_TRAVEL_SECTOR_LIST,
              variables: { groupId: this.form.groupId }
            },
            {
              query: GET_TRAVEL_SECTOR_COLLECTION,
              variables: { id: this.form.groupId, projectId: this.project.id }
            }
          ]
        });
        this.$emit('toggle-row', this.form.groupId);
        this.$modal.show('success', {
          message: 'Travel Sector successfully created.',
          name: 'new-travel-sector'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to create travel sector. Please try again.'
        });
      }
    },
    filterOrigin(query) {
      if (query !== '') {
        this.loadingOrigin = true;
        this.originOptions = filterByNameAndCode(this.geographyList, query);
        this.loadingOrigin = false;
      } else {
        this.originOptions = [];
      }
    },
    filterDestination(query) {
      if (query !== '') {
        this.loadingDestination = true;
        this.destinationOptions = filterByNameAndCode(
          this.geographyList,
          query
        );
        this.loadingDestination = false;
      } else {
        this.destinationOptions = [];
      }
    },
    clearOrigin() {
      this.originOptions = [];
    },
    clearDestination() {
      this.destinationOptions = [];
    },
    beforeOpen(event) {
      const { name, id } = event.params.collection;
      this.project = event.params.project;
      this.client = event.params.client;
      this.collectionName = name;
      this.form.groupId = id;
    },
    beforeClose() {
      this.form.groupId = null;
      this.form.name = null;
      this.form.shortName = null;
      this.form.geographyList = [];
      this.origin = null;
      this.destination = null;
      this.exclude = false;
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
.bidirectional-container {
  display: flex;
  .bidirectional-label {
    width: 200px;
  }
  .bidirectional-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .bidirectional-spacer {
      margin-top: 1em;
    }
  }
}
.geography-list-container {
  border: 1px solid $gray-nurse;
  height: 150px;
  padding: 0 1em;
  margin-top: 3em;
  overflow: auto;
  .geography-item {
    margin: 1em 0;
    .fa-times {
      margin-left: 10px;
    }
  }
}
</style>
