const { ApolloError } = require('apollo-server-lambda');
const {
  targetTermList,
  targetLevelList,
  targetTypeList,
  incentiveTypeList
} = require('../../../data');

exports.targetTerm = {
  Query: {
    targetTermList: () => targetTermList.filter(term => !term.isDeleted),
    targetLevelList: (_, { targetTermId }) =>
      targetLevelList.filter(t => t.targetTermId === targetTermId),
    targetTypeList: () => targetTypeList,
    incentiveTypeList: () => incentiveTypeList
  },
  Mutation: {
    createTargetTerm: (
      _,
      {
        name,
        targetTypeId,
        cabinF,
        cabinB,
        cabinP,
        cabinE,
        incentiveTypeId,
        qsi,
        softTarget,
        internalTarget,
        timeframe
      }
    ) => {
      const maxId = Math.max(...targetTermList.map(term => term.id)) + 1;
      const maxOrder = Math.max(...targetTermList.map(term => term.order)) + 1;
      const targetType = targetTypeList.filter(t => t.id === targetTypeId)[0]
        .id;
      const incentiveType = incentiveTypeList.filter(
        t => t.id === incentiveTypeId
      )[0].id;
      const targetTerm = {
        id: maxId,
        name,
        effectiveStartDate: new Date(),
        effectiveEndDate: new Date(253402232400000),
        timeframe,
        qc: 0,
        targetType,
        cabinF,
        cabinB,
        cabinP,
        cabinE,
        qsi,
        incentiveType,
        softTarget,
        internalTarget,
        targetAmount: null,
        levelTotal: 3,
        ruleTotal: 4,
        note: null,
        order: maxOrder,
        isDeleted: false
      };
      targetTermList.push(targetTerm);
      return targetTerm;
    }
    // copyTargetTerm: (_, { id, name, ignore }) => {
    //   const targetTerm = targetTermList.filter(term => term.id === id)[0];
    //   if (!targetTerm) {
    //     throw new ApolloError('Pricing Term not found', 400);
    //   }
    //   const maxId = Math.max(...targetTermList.map(term => term.id)) + 1;
    //   const maxContractOrder =
    //     Math.max(...targetTermList.map(term => term.id)) + 1;
    //   const maxAppliedOrder =
    //     Math.max(...targetTermList.map(term => term.id)) + 1;
    //   const filterDiscountList = discountList.filter(
    //     d => d.targetTermId === id
    //   );
    //   filterDiscountList.forEach(discount => {
    //     const maxId = Math.max(...discountList.map(d => d.id)) + 1;
    //     const copyDiscount = {
    //       ...discount,
    //       id: maxId,
    //       targetTermId: id
    //     };
    //     discountList.push(copyDiscount);
    //   });
    //   const copytargetTerm = {
    //     ...targetTerm,
    //     id: maxId,
    //     contractOrder: maxContractOrder,
    //     appliedOrder: maxAppliedOrder,
    //     discountTotal: filterDiscountList.length,
    //     name,
    //     ignore
    //   };
    //   targetTermList.push(copytargetTerm);
    //   return copytargetTerm;
    // },
  }
};
