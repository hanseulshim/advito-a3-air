<template>
  <el-table
    ref="sectorList"
    :data="sectorList"
    class="level-two-table"
    style="width: 100%"
    @expand-change="updateExpand"
  >
    <el-table-column type="expand" width="0">
      <template slot-scope="scope">
        <el-table
          ref="geographyList"
          :data="scope.row.geographyList"
          class="level-three-table"
          style="width: 100%"
        >
          <el-table-column label="Bidirection">
            <template slot-scope="prop">
              <div>
                {{ prop.row.origin }} &lt;—&gt; {{ prop.row.destination }}
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
    <el-table-column width="75">
      <template slot-scope="scope">
        <i
          v-if="expandedRows.indexOf(scope.row.id) === -1"
          class="fas fa-plus table-toggle-icon"
          @click="toggleRow(scope)"
        ></i>
        <i
          v-else
          class="fas fa-minus table-toggle-icon"
          @click="toggleRow(scope)"
        ></i>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Travel Sector" width="200" />
    <el-table-column prop="shortName" label="Short Name" width="200" />
    <el-table-column label="Geographies">
      <template slot-scope="scope">
        <div>{{ scope.row.geographyList.length }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Actions" width="90">
      <template>
        <div class="edit-project-container">
          <i class="fas fa-pencil-alt"></i>
          <i class="fas fa-trash-alt"></i>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'SectorTable',
  props: {
    sectorList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      expandedRows: []
    };
  },
  methods: {
    toggleRow(scope) {
      this.$refs.sectorList.toggleRowExpansion(scope.row);
    },
    updateExpand(row, expandedRows) {
      this.expandedRows = expandedRows.map(row => row.id);
    }
  }
};
</script>
