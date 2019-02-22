<template>
  <modal classes="modal-container" name="new-project" height="auto">
    <div class="title-row">
      <div class="section-header">new project</div>
      <i class="fas fa-times" @click="hideModal"></i>
    </div>
    <div class="value-row">
      <div>Client *</div>
      <el-input v-model="client" class="input"></el-input>
    </div>
    <div class="value-row">
      <div>Division *</div>
      <el-input v-model="division" class="input"></el-input>
    </div>
    <div class="value-row">
      <div>Project Type *</div>
      <el-select v-model="projectTypeId" class="input">
        <el-option
          v-for="item in projectTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="value-row">
      <div>Savings Type *</div>
      <el-select v-model="savingsTypeId" class="input">
        <el-option
          v-for="item in savingsTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="value-row">
      <div>Effective Dates *</div>
      <div class="input">
        <el-date-picker
          v-model="effectiveFrom"
          class="date-container"
          type="date"
          format="dd MMM yyyy"
          value-format="dd MMM yyyy"
        />
        <el-date-picker
          v-model="effectiveTo"
          class="date-container"
          type="date"
          format="dd MMM yyyy"
          value-format="dd MMM yyyy"
        />
      </div>
    </div>
    <div class="value-row">
      <div>Description</div>
      <el-input v-model="description" type="textarea" class="input"></el-input>
    </div>
    <div class="value-row">
      <div>Project Manager *</div>
      <el-select v-model="projectManagerId" class="input">
        <el-option
          v-for="item in projectManagerList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="value-row">
      <div>Lead Analyst *</div>
      <el-select v-model="leadAnalystId" class="input">
        <el-option
          v-for="item in leadAnalystList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="value-row">
      <div>Data Specialist *</div>
      <el-select v-model="dataSpecialistId" class="input">
        <el-option
          v-for="item in dataSpecialistList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>
    <div class="save-container">
      <button class="button">SAVE</button>
    </div>
  </modal>
</template>

<script>
import projectData from '@/data/projectData';
export default {
  name: 'NewProjectModal',
  data() {
    return {
      client: null,
      division: null,
      projectTypeId: null,
      savingsTypeId: null,
      effectiveFrom: '01 Jan 2018',
      effectiveTo: '31 Dec 2018',
      description: null,
      projectManagerId: null,
      leadAnalystId: null,
      dataSpecialistId: null,
      projectTypeList: projectData.projectTypeList.slice(),
      projectManagerList: projectData.projectManagerList.slice(),
      leadAnalystList: projectData.leadAnalystList.slice(),
      dataSpecialistList: projectData.dataSpecialistList.slice()
    };
  },
  computed: {
    savingsTypeList: function() {
      const savingsTypeList = projectData.savingsTypeList.slice();
      if (this.projectTypeId === 1) {
        return savingsTypeList.slice(0, 2);
      } else if (this.projectTypeId === 2) {
        return savingsTypeList.slice(1, 3);
      } else if (this.projectTypeId === 3) {
        return savingsTypeList.slice(0, 1);
      }
      return [];
    }
  },
  watch: {
    projectTypeId: function() {
      this.savingsTypeId = null;
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('new-project');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.title-row {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.fa-times {
  color: $tree-poppy;
  margin-bottom: 1em;
  border: 1px solid $tree-poppy;
  padding: 7px;
  border-radius: 100%;
  height: 10px;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: $tree-poppy;
    color: $white;
  }
}
.value-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1em;
  .input {
    width: 70%;
    display: flex;
    justify-content: space-between;
    .date-container {
      width: 48%;
    }
  }
}
.save-container {
  display: flex;
  justify-content: center;
  margin-top: 2em;
}
</style>
