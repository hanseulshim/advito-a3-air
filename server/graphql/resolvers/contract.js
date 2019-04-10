const { contractList } = require('../../data/contract');

exports.contractResolvers = {
  Query: {
    contractList: () => contractList.filter(contract => !contract.isDeleted)
  }
};
