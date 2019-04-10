const { contractList } = require('../../data/contract');

exports.contract = {
  Query: {
    contractList: () => contractList.filter(contract => !contract.isDeleted)
  }
};
