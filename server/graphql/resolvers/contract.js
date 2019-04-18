const { ApolloError } = require('apollo-server-lambda');
const {
  contractList,
  contractTypeList,
  pricingTermList,
  discountTypeList,
  journeyTypeList,
  directionTypeList
} = require('../../data');

exports.contract = {
  Query: {
    contractList: () => contractList.filter(contract => !contract.isDeleted),
    contractTypeList: () => contractTypeList,
    pricingTermList: () => pricingTermList.filter(term => !term.isDeleted),
    discountTypeList: () => discountTypeList,
    journeyTypeList: () => journeyTypeList,
    directionTypeList: () => directionTypeList
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
        discountList: [],
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
      let maxDiscountId = Math.max(
        ...pricingTermList.map(
          term => Math.max(...term.discountList.map(term => term.id)) + 1
        )
      );
      const copyDiscountList = pricingTerm.discountList.map(discount => ({
        ...discount,
        id: maxDiscountId++
      }));
      const copyPricingTerm = {
        ...pricingTerm,
        id: maxId,
        contractOrder: maxContractOrder,
        appliedOrder: maxAppliedOrder,
        discountList: copyDiscountList,
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
    },
    createDiscount: (
      _,
      {
        id,
        name,
        discountTypeId,
        discountValue,
        journeyTypeId,
        directionTypeId
      }
    ) => {
      const pricingTerm = pricingTermList.filter(term => term.id === id)[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      const maxId = Math.max(
        ...pricingTermList.map(
          term => Math.max(...term.discountList.map(term => term.id)) + 1
        )
      );
      const maxContractOrder =
        Math.max(
          ...pricingTerm.discountList.map(discount => discount.contractOrder)
        ) + 1;
      const maxAppliedOrder =
        Math.max(
          ...pricingTerm.discountList.map(discount => discount.appliedOrder)
        ) + 1;
      const discountType = discountTypeId
        ? discountTypeList.filter(type => type.id === discountTypeId)[0].name
        : null;
      const journeyType = journeyTypeId
        ? journeyTypeList.filter(type => type.id === journeyTypeId)[0].name
        : null;
      const directionType = directionTypeId
        ? directionTypeList.filter(type => type.id === directionTypeId)[0].name
        : null;
      const discount = {
        id: maxId,
        contractOrder: maxContractOrder,
        appliedOrder: maxAppliedOrder,
        name,
        effectiveStartDate: new Date(),
        effectiveEndDate: new Date(253402232400000),
        discountType,
        discountValue,
        journeyType,
        directionType,
        normalizationList: 0,
        note: null,
        isDeleted: false
      };
      pricingTerm.discountList.push(discount);
      return discount;
    },
    copyDiscount: (
      _,
      {
        pricingTermId,
        id,
        name,
        discountTypeId,
        discountValue,
        journeyTypeId,
        directionTypeId
      }
    ) => {
      const pricingTerm = pricingTermList.filter(
        term => term.id === pricingTermId
      )[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      const discount = pricingTerm.discountList.filter(
        discount => discount.id === id
      )[0];
      if (!discount) {
        throw new ApolloError('Discount not found', 400);
      }
      const maxId = Math.max(
        ...pricingTermList.map(
          term => Math.max(...term.discountList.map(term => term.id)) + 1
        )
      );
      const maxContractOrder =
        Math.max(
          ...pricingTerm.discountList.map(discount => discount.contractOrder)
        ) + 1;
      const maxAppliedOrder =
        Math.max(
          ...pricingTerm.discountList.map(discount => discount.appliedOrder)
        ) + 1;
      const discountType = discountTypeId
        ? discountTypeList.filter(type => type.id === discountTypeId)[0].name
        : null;
      const journeyType = journeyTypeId
        ? journeyTypeList.filter(type => type.id === journeyTypeId)[0].name
        : null;
      const directionType = directionTypeId
        ? directionTypeList.filter(type => type.id === directionTypeId)[0].name
        : null;
      const discountCopy = {
        id: maxId,
        contractOrder: maxContractOrder,
        appliedOrder: maxAppliedOrder,
        name,
        effectiveStartDate: new Date(),
        effectiveEndDate: new Date(253402232400000),
        discountType,
        discountValue,
        journeyType,
        directionType,
        normalizationList: 0,
        note: null,
        isDeleted: false
      };
      pricingTerm.discountList.push(discountCopy);
      return discountCopy;
    },
    editDiscount: (
      _,
      {
        pricingTermId,
        id,
        name,
        discountTypeId,
        discountValue,
        journeyTypeId,
        directionTypeId
      }
    ) => {
      const pricingTerm = pricingTermList.filter(
        term => term.id === pricingTermId
      )[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      const discount = pricingTerm.discountList.filter(
        discount => discount.id === id
      )[0];
      if (!discount) {
        throw new ApolloError('Discount not found', 400);
      }
      const discountType = discountTypeId
        ? discountTypeList.filter(type => type.id === discountTypeId)[0].name
        : null;
      const journeyType = journeyTypeId
        ? journeyTypeList.filter(type => type.id === journeyTypeId)[0].name
        : null;
      const directionType = directionTypeId
        ? directionTypeList.filter(type => type.id === directionTypeId)[0].name
        : null;

      discount.name = name;
      discount.discountType = discountType;
      discount.discountValue = discountValue;
      discount.journeyType = journeyType;
      discount.directionType = directionType;

      return discount;
    },
    deleteDiscounts: (_, { pricingTermId, idList }) => {
      const pricingTerm = pricingTermList.filter(
        term => term.id === pricingTermId
      )[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      idList.forEach(id => {
        const discount = pricingTerm.discountList.filter(
          discount => discount.id === id
        )[0];
        if (!discount) {
          throw new ApolloError('Discount not found', 400);
        }
        discount.isDeleted = true;
      });
      return idList;
    }
  }
};