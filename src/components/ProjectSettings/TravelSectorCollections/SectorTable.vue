<template>
  <el-table ref="sectorList" :data="sectorList" class="level-two-table">
    <el-table-column type="expand" :width="tableColumnWidth.expand">
      <template slot-scope="scope">
        <el-table
          ref="geographyList"
          :data="scope.row.geographyList"
          class="level-three-table"
        >
          <el-table-column label="Bidirection">
            <template slot-scope="prop">
              <div>
                {{ prop.row.origin.name }} &lt;—&gt;
                {{ prop.row.destination.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Exclude">
            <template slot-scope="prop">
              <el-checkbox :value="prop.row.exclude" />
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="Travel Sector"
      :width="tableColumnWidth.name"
    />
    <el-table-column
      prop="shortName"
      label="Short Name"
      :width="tableColumnWidth.name"
    />
    <el-table-column prop="geographyList.length" label="Geographies" />
    <el-table-column label="Actions" :width="tableColumnWidth.actions">
      <template slot-scope="scope">
        <i
          class="fas fa-pencil-alt icon-spacer"
          @click="showEditTravelSector(scope.row)"
        ></i>
        <i
          class="fas fa-trash-alt"
          @click="showDeleteTravelSector(scope.row)"
        ></i>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { tableColumnWidth } from '@/config';
export default {
  name: 'SectorTable',
  props: {
    sectorList: {
      type: Array,
      required: true
    },
    collectionId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tableColumnWidth
    };
  },
  methods: {
    showEditTravelSector(sector) {
      this.$modal.show('edit-travel-sector', {
        sector,
        collectionId: this.collectionId
      });
    },
    showDeleteTravelSector(sector) {
      this.$modal.show('delete-travel-sector', {
        sector,
        collectionId: this.collectionId
      });
    }
  }
};
</script>
