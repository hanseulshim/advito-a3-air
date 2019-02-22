const { ApolloError } = require('apollo-server-lambda');
const { fakeInvoke } = require('../helper');
const { projectList } = require('../../data/projects');
const { clientList } = require('../../data/clients');
const { projectData } = require('../../data/projectData');

exports.projectResolvers = {
  projectList: (_, payload) => {
    const projectListFiltered = payload.clientId
      ? projectList.filter(project => project.clientId === payload.clientId)
      : projectList;
    return fakeInvoke(payload, projectListFiltered);
  }
};

exports.projectMutations = {
  addProject: (_, payload) => {
    if (
      payload.client !== 'Home Depot' &&
      payload.client !== 'DuPont' &&
      payload.client !== 'Nestle' &&
      payload.client !== 'Optimus' &&
      payload.client !== 'Pfizer'
    )
      throw new ApolloError(
        'Please enter one of the following valid clients: Home Depot, DuPont, Nestle, Optimus, Pfizer',
        400
      );

    const maxId = Math.max(...projectList.map(project => project.id)) + 1;
    const client = clientList.filter(
      client => client.name === payload.client
    )[0];
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
      name: payload.division,
      description: payload.description,
      isDeleted: false,
      projectTypeId: projectType.id,
      projectType: projectType.name,
      savingsTypeId: savingsType.id,
      savingsType: savingsType.name,
      effectiveFrom: payload.effectiveFrom,
      effectiveTo: payload.effectiveTo,
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
    return {
      success: true,
      message: 'Successfully added project'
    };
  }
};
