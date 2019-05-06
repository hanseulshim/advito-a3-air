const { ApolloError } = require('apollo-server-lambda');
const { pricingTermList, userList, discountList } = require('../../../data');

exports.pricingTerm = {
  Query: {
    pricingTermList: () => pricingTermList.filter(term => !term.isDeleted)
  },
  Mutation: {
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
        discountTotal: 0,
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
      const filterDiscountList = discountList.filter(
        d => d.pricingTermId === id
      );
      filterDiscountList.forEach(discount => {
        const maxId = Math.max(...discountList.map(d => d.id)) + 1;
        const copyDiscount = {
          ...discount,
          id: maxId,
          pricingTermId: id
        };
        discountList.push(copyDiscount);
      });
      const copyPricingTerm = {
        ...pricingTerm,
        id: maxId,
        contractOrder: maxContractOrder,
        appliedOrder: maxAppliedOrder,
        discountTotal: filterDiscountList.length,
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
    togglePricingTermQC: (_, { id }) => {
      const pricingTerm = pricingTermList.filter(term => term.id === id)[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      pricingTerm.qc = pricingTerm.qc !== 1 ? 1 : 0;
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
    saveNote: (_, { id, important, message, assigneeId, noteId }, { user }) => {
      const pricingTerm = pricingTermList.filter(term => term.id === id)[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      const assignee = userList.filter(user => user.id === assigneeId)[0];
      const note =
        pricingTerm.note === null
          ? {
              important: false,
              noteList: []
            }
          : pricingTerm.note;
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
      pricingTerm.note = note;
      return note;
    },
    deleteNote: (_, { id, noteId }) => {
      const pricingTerm = pricingTermList.filter(term => term.id === id)[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      const noteIndex = pricingTerm.note.noteList.findIndex(
        n => n.id === noteId
      );
      pricingTerm.note.noteList.splice(noteIndex, 1);
      return pricingTerm.note;
    },
    updateAppliedOrder: (_, { updatePricingTermList }) => {
      updatePricingTermList.forEach(term => {
        const pricingTerm = pricingTermList.filter(t => t.id === term.id)[0];
        pricingTerm.appliedOrder = term.appliedOrder;
      });
      return pricingTermList;
    }
  }
};
