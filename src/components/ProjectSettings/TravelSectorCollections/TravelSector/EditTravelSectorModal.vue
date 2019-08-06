<template>
  <modal
    classes="modal-container"
    name="edit-travel-sector"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <el-form
      ref="editTravelSector"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="200px"
      hide-required-asterisk
    >
      <div class="title-row space-between">
        <div class="section-header">edit travel sector</div>
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
            @click="addGeography"
          >
            ADD BIDIRECTION
          </button>
        </div>
      </div>
      <div class="geography-list-container">
        <div
          v-for="(geography, index) in filteredGeographyList"
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
import { EDIT_TRAVEL_SECTOR } from '@/graphql/mutations';
import { filterGeography } from '@/helper';
export default {
  name: 'EditTravelSectorModal',
  apollo: {
    geographyList: {
      query: GET_GEOGRAPHY_LIST
    }
  },
  data() {
    return {
      form: {
        sectorId: null,
        name: null,
        shortName: null,
        geographyList: []
      },
      groupId: null,
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
      geographyList: [],
      geographyListCopy: []
    };
  },
  computed: {
    filteredGeographyList() {
      return this.geographyListCopy.filter(geo => !geo.delete);
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-travel-sector');
    },
    validateForm() {
      this.$refs.editTravelSector.validate(valid => {
        if (valid) {
          this.editTravelSector();
        } else {
          return false;
        }
      });
    },
    addGeography() {
      if (this.origin && this.destination) {
        const geography = {
          id: null,
          origin: this.origin,
          destination: this.destination,
          exclude: this.exclude,
          delete: false
        };
        this.geographyListCopy.push(geography);
        this.origin = null;
        this.destination = null;
        this.exclude = false;
      }
    },
    removeGeography(index) {
      this.geographyListCopy[index].delete = true;
    },
    getRegion(id) {
      return this.geographyList.find(geo => geo.id === id).name;
    },
    async editTravelSector() {
      try {
        this.form.geographyList = this.geographyListCopy.filter(
          geo => !geo.id || geo.delete
        );
        this.form.geographyList.forEach(geo => {
          delete geo.delete;
        });
        await this.$apollo.mutate({
          mutation: EDIT_TRAVEL_SECTOR,
          variables: {
            ...this.form,
            projectId: this.project.id
          },
          refetchQueries: () => [
            {
              query: GET_TRAVEL_SECTOR_LIST,
              variables: { groupId: this.groupId }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Travel Sector successfully edited.',
          name: 'edit-travel-sector'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to edit travel sector. Please try again.'
        });
      }
    },
    filterOrigin(query) {
      if (query !== '') {
        this.loadingOrigin = true;
        this.originOptions = filterGeography(this.geographyList, query);
        this.loadingOrigin = false;
      } else {
        this.originOptions = [];
      }
    },
    filterDestination(query) {
      if (query !== '') {
        this.loadingDestination = true;
        this.destinationOptions = filterGeography(this.geographyList, query);
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
      const { groupId, project, client, collectionName, sector } = event.params;
      this.project = project;
      this.client = client;
      this.collectionName = collectionName;
      this.groupId = groupId;
      this.form.sectorId = sector.id;
      this.form.name = sector.name;
      this.form.shortName = sector.shortName;
      this.geographyListCopy = sector.sectorGeographyList.map(geography => ({
        id: geography.id,
        destination: geography.destinationId,
        origin: geography.originId,
        exclude: geography.exclude,
        delete: false
      }));
    },
    beforeClose() {
      this.groupId = null;
      this.form.sectorId = null;
      this.form.name = null;
      this.form.shortName = null;
      this.geographyListCopy = [];
      this.origin = null;
      this.destination = null;
      this.exclude = false;
      this.collectionName = null;
    }
  }
};
</script>
