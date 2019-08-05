<template>
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
            <template slot-scope="bidirection">
              <el-tooltip effect="dark" content="Delete" placement="top">
                <i
                  class="fas fa-trash-alt"
                  @click="showDeleteBidirection(scope.row.id, bidirection)"
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
            @click="showDeleteTravelSector(scope.row)"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { GET_TRAVEL_SECTOR_LIST } from '@/graphql/queries';
import { sector } from '@/config';
export default {
  name: 'SectorTable',
  props: {
    groupId: {
      type: Number,
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
        groupId: this.groupId
      });
    },
    showDeleteTravelSector(sector) {
      this.$modal.show('delete-travel-sector', {
        sector,
        groupId: this.groupId
      });
    },
    showDeleteBidirection(id, bidirection) {
      this.$modal.show('delete-bidirection', {
        id,
        groupId: this.groupId,
        index: bidirection.$index
      });
    }
  }
};
</script>
