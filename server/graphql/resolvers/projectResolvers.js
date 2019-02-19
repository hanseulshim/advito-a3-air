const { fakeInvoke } = require('../helper');
const { projectList } = require('../../data/projects');

exports.projectResolvers = {
  getProjects: (_, payload) => fakeInvoke(payload, projectList)
};
