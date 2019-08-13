<template>
  <div>
    <el-table
      ref="travelSectorList"
      v-loading="$apollo.loading"
      :data="travelSectorList"
      class="level-two-table"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table
            ref="sectorGeographyList"
            :data="scope.row.sectorGeographyList"
            class="level-three-table"
          >
            <el-table-column label="Bidirection">
              <template slot-scope="prop">
                <div>
                  {{ prop.row.originName }} &lt;—&gt;
                  {{ prop.row.destinationName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Exclude">
              <template slot-scope="prop">
                <el-checkbox :value="prop.row.exclude" />
              </template>
            </el-table-column>
            <el-table-column :width="sector.actions">
              <template slot-scope="sectorGeography">
                <el-tooltip effect="dark" content="Delete" placement="top">
                  <i
                    class="fas fa-trash-alt"
                    @click="showDeleteSectorGeography(sectorGeography.row.id)"
                  />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Travel Sector"
        :min-width="sector.name"
      />
      <el-table-column
        prop="shortName"
        label="Short Name"
        :min-width="sector.shortName"
      />
      <el-table-column
        prop="sectorGeographyList.length"
        label="Geographies"
        :min-width="sector.geographies"
      />
      <el-table-column label="Actions" :min-width="sector.actions">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="Edit" placement="top">
            <i
              v-if="!scope.row.standard"
              class="fas fa-pencil-alt icon-spacer"
              @click="showEditTravelSector(scope.row)"
            ></i>
          </el-tooltip>
          <el-tooltip effect="dark" content="Delete" placement="top">
            <i
              v-if="!scope.row.standard"
              class="fas fa-trash-alt"
              @click="showDeleteTravelSector(scope.row.id)"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <NewTravelSectorModal @toggle-row="toggleRow" />
    <EditTravelSectorModal />
    <DeleteTravelSectorModal @toggle-row="toggleRow" />
    <DeleteSectorGeographyModal />
  </div>
</template>

<script>
import { GET_TRAVEL_SECTOR_LIST } from '@/graphql/queries';
import { sector } from '@/config';
import NewTravelSectorModal from './NewTravelSectorModal';
import EditTravelSectorModal from './EditTravelSectorModal';
import DeleteTravelSectorModal from './DeleteTravelSectorModal';
import DeleteSectorGeographyModal from './DeleteSectorGeographyModal';
export default {
  name: 'TravelSector',
  components: {
    NewTravelSectorModal,
    EditTravelSectorModal,
    DeleteTravelSectorModal,
    DeleteSectorGeographyModal
  },
  props: {
    groupId: {
      type: Number,
      required: true
    },
    client: {
      type: Object,
      required: true
    },
    project: {
      type: Object,
      required: true
    },
    collectionName: {
      type: String,
      required: true
    }
  },
  apollo: {
    travelSectorList: {
      query: GET_TRAVEL_SECTOR_LIST,
      variables() {
        return {
          groupId: this.groupId
        };
      }
    }
  },
  data() {
    return {
      sector
    };
  },
  methods: {
    showEditTravelSector(sector) {
      this.$modal.show('edit-travel-sector', {
        sector,
        project: this.project,
        client: this.client,
        collectionName: this.collectionName,
        groupId: this.groupId
      });
    },
    showDeleteTravelSector(id) {
      this.$modal.show('delete-travel-sector', {
        id,
        groupId: this.groupId,
        projectId: this.project.id
      });
    },
    toggleRow(id) {
      this.$emit('toggle-row', id);
    },
    showDeleteSectorGeography(id) {
      this.$modal.show('delete-bidirection', {
        id,
        groupId: this.groupId
      });
    }
  }
};
</script>
