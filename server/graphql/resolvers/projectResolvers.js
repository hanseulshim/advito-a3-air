const { lambdaFakeInvoke } = require('../helper');
const { projectList } = require('../../data/projects');

exports.projectResolvers = {
  getProjects: (_, payload) => lambdaFakeInvoke(payload, projectList)
};
