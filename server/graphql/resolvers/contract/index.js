const merge = require('lodash.merge');
const { contract } = require('./contract');
const { pricingTerm } = require('./pricingTerm');
const { targetTerm } = require('./targetTerm');
const { targetLevel } = require('./targetLevel');
const { discount } = require('./discount');

exports.contract = {
  ...merge(contract, pricingTerm, targetTerm, discount, targetLevel)
};