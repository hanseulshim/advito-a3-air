const { client } = require('./client');
const { collection } = require('./collection');
const { projectQueries, projectMutations } = require('./project');
exports.playground = {
  tabs: [client, projectQueries, projectMutations, collection]
};
