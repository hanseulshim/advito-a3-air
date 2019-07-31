<template>
  <div>
    <el-table
      v-loading="$apollo.loading"
      :data="regionList"
      class="level-two-table"
    >
      <el-table-column label="Region" :min-width="region.name">
        <template slot-scope="scope">
          {{ scope.row.name }} ({{ scope.row.code }})
        </template>
      </el-table-column>
      <el-table-column
        prop="countryList.length"
        label="Countries"
        :min-width="region.countries"
      />
      <el-table-column label="Country Name" :min-width="region.countryName">
        <template slot-scope="scope">
          {{ getCountryNames(scope.row.countryList) }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" :min-width="region.actions">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Edit" placement="top">
            <i
              v-if="!scope.row.standard"
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditRegionModal(scope.row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete" placement="top">
            <i
              v-if="!scope.row.standard"
              class="fas fa-trash-alt"
              @click="
                showDeleteRegionModal(
                  scope.row.id,
                  scope.row.countryList.length
                )
              "
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NewRegionModal @toggle-row="toggleRow" />
    <EditRegionModal />
    <DeleteRegionModal @toggle-row="toggleRow" />
  </div>
</template>

<script>
import { GET_REGION_LIST } from '@/graphql/queries';
import NewRegionModal from './NewRegionModal';
import EditRegionModal from './EditRegionModal';
import DeleteRegionModal from './DeleteRegionModal';
import { region } from '@/config';
export default {
  name: 'Regions',
  components: {
    NewRegionModal,
    EditRegionModal,
    DeleteRegionModal
  },
  apollo: {
    regionList: {
      query: GET_REGION_LIST,
      variables() {
        return {
          geoSetId: this.geoSetId
        };
      }
    }
  },
  props: {
    geoSetId: {
      type: Number,
      required: true
    },
    projectId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      regionList: [],
      region
    };
  },
  methods: {
    showEditRegionModal(collection, region) {
      this.$modal.show('edit-region', { collection, region });
    },
    showDeleteRegionModal(id, countryListLength) {
      this.$modal.show('delete-region', {
        id,
        geoSetId: this.geoSetId,
        countryListLength,
        projectId: this.projectId
      });
    },
    toggleRow(id) {
      this.$emit('toggle-row', id);
    },
    getCountryNames(countryList) {
      const countryListCopy = countryList.map(country => country.name);
      return countryListCopy.length > 10
        ? countryListCopy.slice(0, 9).join(', ') + '...'
        : countryListCopy.join(', ');
    }
  }
};
</script>
