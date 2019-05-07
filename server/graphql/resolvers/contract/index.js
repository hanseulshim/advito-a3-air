const merge = require('lodash.merge');
const { contract } = require('./contract');
const { pricingTerm } = require('./pricingTerm');
const { discount } = require('./discount');

exports.contract = {
  ...merge(contract, pricingTerm, discount)
};
