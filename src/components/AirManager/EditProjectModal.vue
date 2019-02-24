<template>
  <modal
    classes="modal-container"
    name="edit-project"
    height="auto"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="title-row">
      <div class="section-header">edit project</div>
      <i class="fas fa-times" @click="hideModal"></i>
    </div>
    <div class="value-row">
      <div>Client *</div>
      <el-input v-model="client" class="input" disabled></el-input>
    </div>
    <div class="value-row">
      <div>Division *</div>
      <el-input v-model="division" class="input"></el-input>
    </div>
    <div class="value-row">
      <div>Project Type *</div>
      <el-input v-model="projectType" disabled class="input"></el-input>
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
        />
        <el-date-picker
          v-model="effectiveTo"
          class="date-container"
          type="date"
          format="dd MMM yyyy"
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
      <button class="button" @click="editProject">SAVE</button>
    </div>
    <SuccessModal
      :hide-modal="hideModal"
      message="Project successfully created."
    />
    <ErrorModal message="Failed to create project. Please try again" />
  </modal>
</template>

<script>
import SuccessModal from '@/components/Modals/SuccessModal.vue';
import ErrorModal from '@/components/Modals/ErrorModal.vue';
import { EDIT_PROJECT } from '@/graphql/mutations';
import projectData from '@/data/projectData';
export default {
  name: 'EditProjectModal',
  components: {
    SuccessModal,
    ErrorModal
  },
  props: {
    apollo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      client: null,
      id: null,
      division: null,
      projectType: null,
      projectTypeId: null,
      savingsTypeId: null,
      effectiveFrom: null,
      effectiveTo: null,
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
    projectTypeId: function(a, b) {
      if (a && b) this.savingsTypeId = null;
    }
  },
  methods: {
    hideModal() {
      this.$modal.hide('edit-project');
    },
    async editProject() {
      try {
        await this.apollo.mutate({
          mutation: EDIT_PROJECT,
          variables: {
            sessionToken: this.apollo.vm.user.sessionToken,
            id: this.id,
            division: this.division,
            savingsTypeId: this.savingsTypeId,
            effectiveFrom: this.effectiveFrom,
            effectiveTo: this.effectiveTo,
            description: this.description,
            projectManagerId: this.projectManagerId,
            leadAnalystId: this.leadAnalystId,
            dataSpecialistId: this.dataSpecialistId
          }
        });
        this.apollo.queries.projectList.refetch();
        this.$modal.show('success');
      } catch (error) {
        this.$modal.show('error');
      }
    },
    beforeOpen(event) {
      const project = event.params.project;
      this.client = project.clientName;
      this.id = project.id;
      this.division = project.division;
      this.projectType = project.projectType;
      this.projectTypeId = project.projectTypeId;
      this.savingsTypeId = project.savingsTypeId;
      this.effectiveFrom = project.effectiveFrom;
      this.effectiveTo = project.effectiveTo;
      this.description = project.description;
      this.projectManagerId = project.projectManagerId;
      this.leadAnalystId = project.leadAnalystId;
      this.dataSpecialistId = project.dataSpecialistId;
    },
    beforeClose() {
      this.projectTypeId = null;
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
