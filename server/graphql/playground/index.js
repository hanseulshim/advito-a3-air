const { client } = require('./client');
const { collection } = require('./collection');
const { projectQueries, projectMutations } = require('./project');
const { dataSetQueries, dataSetMutations } = require('./dataSet');
exports.playground = {
  tabs: [
    client,
    projectQueries,
    projectMutations,
    collection,
    dataSetQueries,
    dataSetMutations
  ]
};
