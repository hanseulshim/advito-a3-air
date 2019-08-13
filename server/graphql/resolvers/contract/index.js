const merge = require('lodash.merge');
const { contract } = require('./contract');
const { pricingTerm } = require('./pricingTerm');
const { targetTerm } = require('./targetTerm');
const { targetLevel } = require('./targetLevel');
const { discount } = require('./discount');
const { normalization } = require('./normalization');
const { note } = require('./note');
const { rule } = require('./rule');
const { bulkRule } = require('./bulkRule');

exports.contract = {
  ...merge(
    contract,
    pricingTerm,
    targetTerm,
    discount,
    normalization,
    note,
    targetLevel,
    rule,
    bulkRule
  )
};
