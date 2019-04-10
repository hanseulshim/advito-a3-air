const { contractList, contractTypeList } = require('../../data');

exports.contract = {
  Query: {
    contractList: () => contractList.filter(contract => !contract.isDeleted),
    contractTypeList: () => contractTypeList
  }
};
