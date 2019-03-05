const { client } = require('./client');
const { projectQueries, projectMutations } = require('./project');
exports.playground = {
  tabs: [client, projectQueries, projectMutations]
};
