const { client } = require('./client');
const { collection } = require('./collection');
const { projectQueries, projectMutations } = require('./project');
const { dataSetQueries, dataSetMutations } = require('./dataSet');
const { libraryQueries } = require('./library');
exports.playground = {
  tabs: [
    client,
    projectQueries,
    projectMutations,
    collection,
    dataSetQueries,
    dataSetMutations,
    libraryQueries
  ]
};
