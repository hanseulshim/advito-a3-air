const { client } = require('./client');
const { collection } = require('./collection');
const { project } = require('./project');
const { dataSet } = require('./dataSet');
const { library } = require('./library');
const { contract } = require('./contract');
const { pricingTerm } = require('./contract/pricingTerm');
const { targetTerm } = require('./contract/targetTerm');
const { discount } = require('./contract/discount');
const { note } = require('./contract/note');
const { rule } = require('./contract/rule');
const { user } = require('./user');
const { process } = require('./process');

exports.playground = {
  tabs: [
    collection.queries,
    client,
    rule.queries,
    rule.mutations,
    project.queries,
    project.mutations,
    ...collection.mutations,
    dataSet.queries,
    dataSet.mutations,
    library,
    contract.queries,
    contract.mutations,
    pricingTerm.queries,
    pricingTerm.mutations,
    targetTerm.queries,
    targetTerm.mutations,
    discount.queries,
    discount.mutations,
    note.queries,
    note.mutations,
    user.queries,
    process.queries,
    process.mutations
  ]
};
