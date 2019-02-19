const { fakeInvoke } = require('../helper');
const { projectList } = require('../../data/projects');

exports.projectResolvers = {
  projectList: (_, payload) => fakeInvoke(payload, projectList)
};
