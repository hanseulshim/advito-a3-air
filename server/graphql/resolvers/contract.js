const { ApolloError } = require('apollo-server-lambda');
const { contractList, contractTypeList } = require('../../data');

exports.contract = {
  Query: {
    contractList: () => contractList.filter(contract => !contract.isDeleted),
    contractTypeList: () => contractTypeList
  },
  Mutation: {
    createContract: (
      _,
      {
        name,
        typeId,
        round,
        effectiveStartDate,
        effectiveEndDate,
        description,
        division
      }
    ) => {
      const maxId = Math.max(...contractList.map(contract => contract.id)) + 1;
      const type = contractTypeList.filter(type => type.id === typeId)[0].name;
      const contract = {
        id: maxId,
        name,
        type,
        description,
        round,
        effectiveStartDate: new Date(effectiveStartDate),
        effectiveEndDate: effectiveEndDate
          ? new Date(effectiveEndDate)
          : new Date(253402232400000),
        qc: 0,
        pricingTermTotal: 0,
        targetTermTotal: 0,
        pointOfSaleList: [],
        pointOfOriginList: [],
        airlineList: [],
        division,
        isDeleted: false
      };
      contractList.push(contract);
      return contract;
    }
  }
};
