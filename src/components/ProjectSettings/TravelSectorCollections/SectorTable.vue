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
      <template>
        <i class="fas fa-pencil-alt icon-spacer"></i>
        <i class="fas fa-trash-alt"></i>
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
    }
  },
  data() {
    return {
      tableColumnWidth
    };
  }
};
</script>
