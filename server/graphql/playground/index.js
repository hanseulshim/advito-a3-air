const { client } = require('./client');
const { collection } = require('./collection');
const { projectQueries, projectMutations } = require('./project');
const { defaultDataQueries, defaultDataMutations } = require('./defaultData');
exports.playground = {
  tabs: [
    client,
    projectQueries,
    projectMutations,
    collection,
    defaultDataQueries,
    defaultDataMutations
  ]
};
