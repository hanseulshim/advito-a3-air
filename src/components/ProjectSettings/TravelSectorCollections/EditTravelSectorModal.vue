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
        <i class="fas fa-times close-modal-button" @click="hideModal"></i>
      </div>
      <div>
        <div class="form-label-no-select">Client</div>
        <span>{{ client.name }}</span>
      </div>
      <div>
        <div class="form-label-no-select">Project</div>
        <span>{{ project.name }}</span>
      </div>
      <el-form-item label="Collection Name *" prop="id">
        <el-select v-model="form.id" class="select-modal" disabled>
          <el-option
            v-for="item in travelSectorCollectionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
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
          <el-select v-model="origin" class="select-modal">
            <el-option
              v-for="item in travelSectorRegionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="destination"
            class="select-modal bidirectional-spacer"
          >
            <el-option
              v-for="item in travelSectorRegionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-checkbox v-model="exclude" class="bidirectional-spacer"
            >Exclude</el-checkbox
          >
          <button class="button bidirectional-spacer" @click="addGeography">
            ADD
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
          <i class="fas fa-times" @click="removeGeography(index)" />
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
  GET_CLIENT,
  GET_PROJECT,
  GET_TRAVEL_SECTOR_COLLECTION_LIST,
  GET_TRAVEL_SECTOR_REGION_LIST
} from '@/graphql/queries';
import { EDIT_TRAVEL_SECTOR } from '@/graphql/mutations';
export default {
  name: 'EditTravelSectorModal',
  apollo: {
    client: {
      query: GET_CLIENT
    },
    project: {
      query: GET_PROJECT
    },
    travelSectorCollectionList: {
      query: GET_TRAVEL_SECTOR_COLLECTION_LIST
    },
    travelSectorRegionList: {
      query: GET_TRAVEL_SECTOR_REGION_LIST
    }
  },
  data() {
    return {
      form: {
        id: null,
        collectionId: null,
        name: null,
        shortName: null,
        geographyList: []
      },
      origin: null,
      destination: null,
      exclude: false,
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
      travelSectorCollectionList: [],
      travelSectorRegionList: []
    };
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
      return this.travelSectorRegionList.filter(sector => sector.id === id)[0]
        .name;
    },
    async editTravelSector() {
      try {
        const data = await this.$apollo.mutate({
          mutation: EDIT_TRAVEL_SECTOR,
          variables: {
            ...this.form
          }
        });
        this.$emit('toggle-row', data.data.editTravelSector.id);
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
    beforeOpen(event) {
      const sector = event.params.sector;
      const collectionId = event.params.collectionId;
      this.form.id = sector.id;
      this.form.collectionId = collectionId;
      this.form.name = sector.name;
      this.form.shortName = sector.shortName;
      this.form.geographyList = sector.geographyList.map(geography => ({
        destination: geography.destination.id,
        origin: geography.origin.id,
        exclude: geography.exclude
      }));
    },
    beforeClose() {
      this.form.id = null;
      this.form.collectionId = null;
      this.form.name = null;
      this.form.shortName = null;
      this.form.geographyList = [];
      this.origin = null;
      this.destination = null;
      this.exclude = false;
    }
  }
};
</script>
