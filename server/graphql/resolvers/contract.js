const { ApolloError } = require('apollo-server-lambda');
const {
  contractList,
  contractTypeList,
  pricingTermList
} = require('../../data');

exports.contract = {
  Query: {
    contractList: () => contractList.filter(contract => !contract.isDeleted),
    contractTypeList: () => contractTypeList,
    pricingTermList: () => pricingTermList.filter(term => !term.isDeleted)
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
        division,
        description
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
    },
    copyContract: (_, { id, name }) => {
      const contract = contractList.filter(c => c.id === id)[0];
      if (!contract) {
        throw new ApolloError('Contract not found', 400);
      }
      const maxId = Math.max(...contractList.map(contract => contract.id)) + 1;
      const copyContract = {
        ...contract,
        id: maxId,
        name
      };
      contractList.push(copyContract);
      return copyContract;
    },
    editContract: (
      _,
      {
        id,
        name,
        typeId,
        round,
        effectiveStartDate,
        effectiveEndDate,
        division,
        description
      }
    ) => {
      const contract = contractList.filter(c => c.id === id)[0];
      if (!contract) {
        throw new ApolloError('Contract not found', 400);
      }
      const type = contractTypeList.filter(type => type.id === typeId)[0].name;
      contract.name = name;
      contract.type = type;
      contract.round = round;
      contract.effectiveStartDate = new Date(effectiveStartDate);
      contract.effectiveEndDate = effectiveEndDate
        ? new Date(effectiveEndDate)
        : new Date(253402232400000);
      contract.division = division;
      contract.description = description;
      return contract;
    },
    deleteContract: (_, { id }) => {
      const contract = contractList.filter(c => c.id === id)[0];
      if (!contract) {
        throw new ApolloError('Contract not found', 400);
      }
      contract.isDeleted = true;
      return id;
    },
    createPricingTerm: (_, { name, ignore }) => {
      const maxId = Math.max(...pricingTermList.map(term => term.id)) + 1;
      const maxContractOrder =
        Math.max(...pricingTermList.map(term => term.id)) + 1;
      const maxAppliedOrder =
        Math.max(...pricingTermList.map(term => term.id)) + 1;
      const pricingTerm = {
        id: maxId,
        contractOrder: maxContractOrder,
        appliedOrder: maxAppliedOrder,
        name,
        effectiveStartDate: new Date(),
        effectiveEndDate: new Date(253402232400000),
        qc: 0,
        discountList: 0,
        pointOfSaleList: [],
        pointOfOriginList: [],
        airlineList: [],
        ignore,
        isDeleted: false,
        note: null
      };
      pricingTermList.push(pricingTerm);
      return pricingTerm;
    },
    copyPricingTerm: (_, { id, name, ignore }) => {
      const pricingTerm = pricingTermList.filter(term => term.id === id)[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      const maxId = Math.max(...pricingTermList.map(term => term.id)) + 1;
      const maxContractOrder =
        Math.max(...pricingTermList.map(term => term.id)) + 1;
      const maxAppliedOrder =
        Math.max(...pricingTermList.map(term => term.id)) + 1;
      const copyPricingTerm = {
        ...pricingTerm,
        id: maxId,
        contractOrder: maxContractOrder,
        appliedOrder: maxAppliedOrder,
        name,
        ignore
      };
      pricingTermList.push(copyPricingTerm);
      return copyPricingTerm;
    },
    editPricingTerm: (_, { id, name, ignore }) => {
      const pricingTerm = pricingTermList.filter(term => term.id === id)[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      pricingTerm.name = name;
      pricingTerm.ignore = ignore;
      return pricingTerm;
    },
    deletePricingTerms: (_, { idList }) => {
      idList.forEach(id => {
        const pricingTerm = pricingTermList.filter(term => term.id === id)[0];
        if (!pricingTerm) {
          throw new ApolloError('Pricing Term not found', 400);
        }
        pricingTerm.isDeleted = true;
      });
      return idList;
    }
  }
};
