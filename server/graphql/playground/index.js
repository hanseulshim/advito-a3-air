const { client } = require('./client');
const { collection } = require('./collection');
const { project } = require('./project');
const { dataSet } = require('./dataSet');
const { libraryQueries } = require('./library');
const { contract } = require('./contract');
exports.playground = {
  tabs: [
    client,
    project.queries,
    project.mutations,
    collection.queries,
    ...collection.mutations,
    dataSet.queries,
    dataSet.mutations,
    libraryQueries,
    contract.queries
  ]
};
