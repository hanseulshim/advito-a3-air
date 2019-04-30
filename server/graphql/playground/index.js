const { client } = require('./client');
const { collection } = require('./collection');
const { project } = require('./project');
const { dataSet } = require('./dataSet');
const { library } = require('./library');
const { contract } = require('./contract');
const { user } = require('./user');
const { process } = require('./process');

exports.playground = {
  tabs: [
    client,
    project.queries,
    project.mutations,
    collection.queries,
    ...collection.mutations,
    dataSet.queries,
    dataSet.mutations,
    library,
    contract.queries,
    contract.mutations,
    user.queries,
    process
  ]
};
