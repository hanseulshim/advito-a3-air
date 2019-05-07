const { ApolloError } = require('apollo-server-lambda');
const {
  discountTypeList,
  journeyTypeList,
  directionTypeList,
  userList,
  discountList
} = require('../../../data');

exports.discount = {
  Query: {
    discountList: (_, { pricingTermId }) =>
      discountList.filter(d => d.pricingTermId === pricingTermId),
    discountTypeList: () => discountTypeList,
    journeyTypeList: () => journeyTypeList,
    directionTypeList: () => directionTypeList
  },
  Mutation: {
    createDiscount: (
      _,
      {
        pricingTermId,
        name,
        discountTypeId,
        discountValue,
        journeyTypeId,
        directionTypeId
      }
    ) => {
      const maxId = Math.max(...discountList.map(d => d.id)) + 1;
      const maxContractOrder =
        Math.max(...discountList.map(discount => discount.contractOrder)) + 1;
      const maxAppliedOrder =
        Math.max(...discountList.map(discount => discount.appliedOrder)) + 1;
      const discountType = discountTypeId
        ? discountTypeList.filter(type => type.id === discountTypeId)[0]
        : null;
      const journeyType = journeyTypeId
        ? journeyTypeList.filter(type => type.id === journeyTypeId)[0]
        : null;
      const directionType = directionTypeId
        ? directionTypeList.filter(type => type.id === directionTypeId)[0]
        : null;
      const discount = {
        id: maxId,
        pricingTermId,
        contractOrder: maxContractOrder,
        appliedOrder: maxAppliedOrder,
        name,
        effectiveStartDate: new Date(),
        effectiveEndDate: new Date(253402232400000),
        discountType,
        discountValue:
          discountTypeId === 2 ? discountValue / 100 : discountValue,
        journeyType,
        directionType,
        normalizationList: 0,
        note: null,
        isDeleted: false
      };
      discountList.push(discount);
      return discount;
    },
    copyDiscount: (
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
      const discount = discountList.filter(discount => discount.id === id)[0];
      if (!discount) {
        throw new ApolloError('Discount not found', 400);
      }
      const maxId = Math.max(...discountList.map(d => d.id)) + 1;
      const maxContractOrder =
        Math.max(...discountList.map(discount => discount.contractOrder)) + 1;
      const maxAppliedOrder =
        Math.max(...discountList.map(discount => discount.appliedOrder)) + 1;
      const discountType = discountTypeId
        ? discountTypeList.filter(type => type.id === discountTypeId)[0]
        : null;
      const journeyType = journeyTypeId
        ? journeyTypeList.filter(type => type.id === journeyTypeId)[0]
        : null;
      const directionType = directionTypeId
        ? directionTypeList.filter(type => type.id === directionTypeId)[0]
        : null;
      const discountCopy = {
        id: maxId,
        pricingTermId: discount.pricingTermId,
        contractOrder: maxContractOrder,
        appliedOrder: maxAppliedOrder,
        name,
        effectiveStartDate: new Date(),
        effectiveEndDate: new Date(253402232400000),
        discountType,
        discountValue:
          discountTypeId === 2 ? discountValue / 100 : discountValue,
        journeyType,
        directionType,
        normalizationList: 0,
        note: null,
        isDeleted: false
      };
      discountList.push(discountCopy);
      return discountCopy;
    },
    editDiscount: (
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
      const discount = discountList.filter(discount => discount.id === id)[0];
      if (!discount) {
        throw new ApolloError('Discount not found', 400);
      }
      const discountType = discountTypeId
        ? discountTypeList.filter(type => type.id === discountTypeId)[0]
        : null;
      const journeyType = journeyTypeId
        ? journeyTypeList.filter(type => type.id === journeyTypeId)[0]
        : null;
      const directionType = directionTypeId
        ? directionTypeList.filter(type => type.id === directionTypeId)[0]
        : null;

      discount.name = name;
      discount.discountType = discountType;
      (discount.discountValue =
        discountTypeId === 2 ? discountValue / 100 : discountValue),
        (discount.journeyType = journeyType);
      discount.directionType = directionType;

      return discount;
    },
    deleteDiscounts: (_, { idList }) => {
      idList.forEach(id => {
        const discount = discountList.filter(d => d.id === id)[0];
        if (!discount) {
          throw new ApolloError('Discount not found', 400);
        }
        discount.isDeleted = true;
      });
      return idList;
    },
    saveDiscountNote: (
      _,
      { id, important, message, assigneeId, noteId },
      { user }
    ) => {
      const discount = discountList.filter(d => d.id === id)[0];
      if (!discount) {
        throw new ApolloError('Discount not found', 400);
      }
      const assignee = userList.filter(user => user.id === assigneeId)[0];
      const note =
        discount.note === null
          ? {
              important: false,
              noteList: []
            }
          : discount.note;
      note.important = important;
      if (message) {
        if (noteId) {
          const noteContent = note.noteList.filter(n => n.id === noteId)[0];
          noteContent.message = message;
          noteContent.date = new Date();
          noteContent.assignee = assignee;
        } else {
          const content = {
            id: new Date().getUTCMilliseconds(),
            author: user,
            date: new Date(),
            assignee,
            message
          };
          note.noteList.push(content);
        }
      }
      discount.note = note;
      return note;
    },
    deleteDiscountNote: (_, { id, noteId }) => {
      const discount = discountList.filter(discount => discount.id === id)[0];
      if (!discount) {
        throw new ApolloError('Discount not found', 400);
      }
      const noteIndex = discount.note.noteList.findIndex(n => n.id === noteId);
      discount.note.noteList.splice(noteIndex, 1);
      return discount.note;
    },
    updateDiscountAppliedOrder: (_, { updateDiscountList }) => {
      updateDiscountList.forEach(discount => {
        const foundDiscount = discountList.filter(d => d.id === discount.id)[0];
        foundDiscount.appliedOrder = discount.appliedOrder;
      });
      return discountList;
    }
  }
};
