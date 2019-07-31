<template>
  <modal
    classes="modal-container"
    name="edit-region"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row space-between">
      <div class="section-header">edit region</div>
      <el-tooltip effect="dark" content="Close Modal" placement="top">
        <i class="fas fa-times close-modal-button" @click="hideModal" />
      </el-tooltip>
    </div>
    <div style="margin-bottom: 5px">All Countries</div>
    <div class="country-list-container">
      <div v-for="region in regionList" :key="region.id">
        <div class="region-container">
          <i
            v-if="!region.expand"
            class="fa fa-plus edit-region-toggle"
            @click="toggleExpand(region)"
          />
          <i
            v-else
            class="fa fa-minus edit-region-toggle"
            @click="toggleExpand(region)"
          />
          <span>{{ region.name }} ({{ region.code }})</span>
        </div>
        <div v-if="region.expand" class="country-container">
          <div v-for="country in region.countryList" :key="country.id">
            <el-checkbox
              :value="checkCountry(country)"
              @change="value => toggleCountry(country, value)"
              >{{ country.name }}</el-checkbox
            >
          </div>
        </div>
      </div>
    </div>
    <div class="select-region-container">
      <el-select
        v-model="selectedRegion"
        class="select-modal"
        placeholder="Move to"
      >
        <el-option
          v-for="item in regionList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <button class="button" @click="moveCountries">MOVE</button>
    </div>
  </modal>
</template>

<script>
import { GET_REGION_LIST } from '@/graphql/queries';
import { MOVE_COUNTRIES } from '@/graphql/mutations';
export default {
  name: 'EditRegionModal',
  data() {
    return {
      geoSetId: null,
      regionId: null,
      selectedRegion: null,
      regionList: [],
      countryList: []
    };
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-region');
    },
    toggleExpand(region) {
      region.expand = !region.expand;
    },
    toggleCountry(country, value) {
      if (value) {
        this.countryList.push(country);
      } else {
        const index = this.countryList.findIndex(c => c.id === country.id);
        this.countryList.splice(index, 1);
      }
    },
    checkCountry(country) {
      const index = this.countryList.findIndex(c => c.id === country.id);
      return index !== -1;
    },
    async moveCountries() {
      try {
        const countryList = this.countryList.map(country => country.id);
        await this.$apollo.mutate({
          mutation: MOVE_COUNTRIES,
          variables: {
            geoSetId: this.geoSetId,
            regionId: this.selectedRegion,
            countryList
          },
          refetchQueries: () => [
            {
              query: GET_REGION_LIST,
              variables: {
                geoSetId: this.geoSetId
              }
            }
          ]
        });
        this.$modal.show('success', {
          message: 'Countries successfully moved.',
          name: 'edit-region'
        });
      } catch (error) {
        this.$modal.show('error', {
          message: 'Failed to move countries. Please try again.'
        });
      }
    },
    beforeOpen(event) {
      const { geoSetId, regionList } = event.params;
      this.geoSetId = geoSetId;
      this.regionList = regionList.map(region => ({
        ...region,
        expand: false
      }));
    },
    beforeClose() {
      this.geoSetId = null;
      this.countryList = [];
      this.selectedRegion = null;
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
.region-name-container {
  display: flex;
  align-items: center;
  margin-left: -150px;
  .el-input {
    flex: 1;
    margin: 0 1em;
  }
}
.country-list-container {
  border: 1px solid $gray-nurse;
  padding: 5px 10px;
  height: 200px;
  overflow: auto;
}
.edit-region-toggle {
  color: $tree-poppy;
  margin-right: 10px;
  cursor: pointer;
}
.region-container {
  margin-bottom: 0.7em;
}
.country-container {
  margin-left: 1em;
}
#app {
  .country-container {
    .el-checkbox__inner {
      background-color: $white;
      border: 1px solid $gray-nurse;
    }
  }
}
.select-region-container {
  margin-top: 1em;
  display: flex;
  align-items: center;
  .el-select {
    width: 50%;
    margin-right: 1em;
  }
}
</style>
