const { ApolloError } = require('apollo-server-lambda');
const { projectList } = require('../../data/project');
const { clientList } = require('../../data/client');
const { projectData } = require('../../data/projectData');
const { getProjectName } = require('../helper');

exports.projectResolvers = {
  projectList: (_, payload) => {
    const projectListFiltered = payload.clientId
      ? projectList.filter(project => project.clientId === payload.clientId)
      : projectList;
    return projectListFiltered.filter(project => !project.isDeleted);
  }
};

exports.projectMutations = {
  addProject: (_, payload) => {
    const maxId = Math.max(...projectList.map(project => project.id)) + 1;
    const client = clientList.filter(
      client => client.id === payload.clientId
    )[0];
    if (!client) {
      throw new ApolloError('Client not found', 400);
    }
    const projectType = projectData.projectTypeList[payload.projectTypeId - 1];
    const savingsType = projectData.savingsTypeList[payload.savingsTypeId - 1];
    const projectManager =
      projectData.projectManagerList[payload.projectManagerId - 1];
    const leadAnalyst = projectData.leadAnalystList[payload.leadAnalystId - 1];
    const dataSpecialist =
      projectData.dataSpecialistList[payload.dataSpecialistId - 1];
    const project = {
      id: maxId,
      clientId: client.id,
      clientName: client.name,
      name: getProjectName({
        ...payload,
        projectType: projectType.name,
        clientName: client.name
      }),
      description: payload.description,
      division: maxId % 2 === 0 ? 'Technology' : '',
      isDeleted: false,
      projectTypeId: projectType.id,
      projectType: projectType.name,
      savingsTypeId: savingsType.id,
      savingsType: savingsType.name,
      effectiveFrom: payload.effectiveFrom,
      effectiveTo: payload.effectiveTo,
      reportFrom: payload.reportFrom,
      reportTo: payload.reportTo,
      projectManagerId: projectManager.id,
      projectManagerName: projectManager.name,
      projectManagerEmail: projectManager.email,
      leadAnalystId: leadAnalyst.id,
      leadAnalystName: leadAnalyst.name,
      leadAnalystEmail: leadAnalyst.email,
      dataSpecialistId: dataSpecialist.id,
      dataSpecialistName: dataSpecialist.name,
      dataSpecialistEmail: dataSpecialist.email,
      progress: 'Front-line solution-oriented leverage',
      favorite: true
    };
    projectList.push(project);
    return project;
  },
  editProject: (_, payload) => {
    const project = projectList.filter(project => project.id === payload.id)[0];
    if (!project) {
      throw new ApolloError('Project not found', 400);
    }
    const savingsType = projectData.savingsTypeList[payload.savingsTypeId - 1];
    const projectManager =
      projectData.projectManagerList[payload.projectManagerId - 1];
    const leadAnalyst = projectData.leadAnalystList[payload.leadAnalystId - 1];
    const dataSpecialist =
      projectData.dataSpecialistList[payload.dataSpecialistId - 1];
    project.name = getProjectName({
      ...payload,
      clientName: project.clientName,
      projectType: project.projectType
    });
    project.description = payload.description;
    project.savingsTypeId = savingsType.id;
    project.savingsType = savingsType.name;
    project.effectiveFrom = payload.effectiveFrom;
    project.effectiveTo = payload.effectiveTo;
    project.projectManagerId = projectManager.id;
    project.projectManagerName = projectManager.name;
    project.projectManagerEmail = projectManager.email;
    project.leadAnalystId = leadAnalyst.id;
    project.leadAnalystName = leadAnalyst.name;
    project.leadAnalystEmail = leadAnalyst.email;
    project.dataSpecialistId = dataSpecialist.id;
    project.dataSpecialistName = dataSpecialist.name;
    project.dataSpecialistEmail = dataSpecialist.email;

    return project;
  },
  deleteProject: (_, payload) => {
    const project = projectList.filter(project => project.id === payload.id)[0];
    if (!project) {
      throw new ApolloError('Project not found', 400);
    }
    project.isDeleted = true;
    return payload.id;
  },
  toggleFavoriteProject: (_, payload) => {
    const project = projectList.filter(project => project.id === payload.id)[0];
    if (!project) {
      throw new ApolloError('Project not found', 400);
    }
    project.favorite = !project.favorite;
    return payload.id;
  }
};
