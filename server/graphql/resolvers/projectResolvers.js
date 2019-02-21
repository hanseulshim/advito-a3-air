const { fakeInvoke } = require('../helper');
const { projectList } = require('../../data/projects');

exports.projectResolvers = {
  projectList: (_, payload) => {
    const projectListFiltered = payload.clientId
      ? projectList.filter(project => project.clientId === payload.clientId)
      : projectList;
    return fakeInvoke(payload, projectListFiltered);
  }
};
