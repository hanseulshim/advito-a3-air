const { TARGET_TERM_LOOKUP } = require('../../constants');
const { ApolloError } = require('apollo-server-lambda');
const {
  targetTermList,
  targetLevelList,
  targetTypeList,
  incentiveTypeList,
  userList
} = require('../../../data');

exports.targetTerm = {
  Query: {
    targetTermList: () => [],
    targetLevelList: (_, { targetTermId }) =>
      targetLevelList.filter(t => t.targetTermId === targetTermId),
    targetTypeList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', TARGET_TERM_LOOKUP.TARGET_TYPE),
    incentiveTypeList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', TARGET_TERM_LOOKUP.INCENTIVE_TYPE)
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
      const targetType = targetTypeList.filter(t => t.id === targetTypeId)[0];
      const incentiveType = incentiveTypeList.filter(
        t => t.id === incentiveTypeId
      )[0];
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
        qsi: qsi / 100,
        incentiveType,
        softTarget,
        internalTarget,
        targetAmount: 0,
        levelTotal: 0,
        ruleTotal: 0,
        note: null,
        order: maxOrder,
        isDeleted: false
      };
      targetTermList.push(targetTerm);
      return targetTerm;
    },
    copyTargetTerm: (_, { id, name }) => {
      const targetTerm = targetTermList.filter(term => term.id === id)[0];
      if (!targetTerm) {
        throw new ApolloError('Target Term not found', 400);
      }
      const maxId = Math.max(...targetTermList.map(term => term.id)) + 1;
      const maxOrder = Math.max(...targetTermList.map(term => term.order)) + 1;
      const filterTargetLevelList = targetLevelList.filter(
        t => t.targetTermId === id
      );
      filterTargetLevelList.forEach(discount => {
        const maxId = Math.max(...targetLevelList.map(d => d.id)) + 1;
        const copyDiscount = {
          ...discount,
          id: maxId,
          targetTermId: id
        };
        targetLevelList.push(copyDiscount);
      });
      const copyTargetTerm = {
        id: maxId,
        name,
        effectiveStartDate: new Date(),
        effectiveEndDate: new Date(253402232400000),
        timeframe: targetTerm.timeframe,
        qc: targetTerm.qc,
        targetType: targetTerm.targetType,
        cabinF: targetTerm.cabinF,
        cabinB: targetTerm.cabinB,
        cabinP: targetTerm.cabinP,
        cabinE: targetTerm.cabinE,
        qsi: targetTerm.qsi,
        incentiveType: targetTerm.incentiveType,
        softTarget: targetTerm.softTarget,
        internalTarget: targetTerm.internalTarget,
        targetAmount: targetTerm.targetAmount,
        levelTotal: targetTerm.levelTotal,
        ruleTotal: targetTerm.ruleTotal,
        note: targetTerm.note,
        order: maxOrder,
        isDeleted: false
      };
      targetTermList.push(copyTargetTerm);
      return copyTargetTerm;
    },
    editTargetTerm: (
      _,
      {
        id,
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
      const targetTerm = targetTermList.filter(term => term.id === id)[0];
      if (!targetTerm) {
        throw new ApolloError('Target Term not found', 400);
      }
      const targetType = targetTypeList.filter(t => t.id === targetTypeId)[0];
      const incentiveType = incentiveTypeList.filter(
        t => t.id === incentiveTypeId
      )[0];
      targetTerm.name = name;
      targetTerm.timeframe = timeframe;
      targetTerm.targetType = targetType;
      targetTerm.cabinF = cabinF;
      targetTerm.cabinB = cabinB;
      targetTerm.cabinP = cabinP;
      targetTerm.cabinE = cabinE;
      targetTerm.qsi = qsi / 100;
      targetTerm.incentiveType = incentiveType;
      targetTerm.softTarget = softTarget;
      targetTerm.internalTarget = internalTarget;
      return targetTerm;
    },
    toggleTargetTermQC: (_, { id }) => {
      const targetTerm = targetTermList.filter(term => term.id === id)[0];
      if (!targetTerm) {
        throw new ApolloError('Target Term not found', 400);
      }
      targetTerm.qc = targetTerm.qc !== 1 ? 1 : 0;
      return targetTerm;
    },
    deleteTargetTerms: (_, { idList }) => {
      idList.forEach(id => {
        const targetTerm = targetTermList.filter(term => term.id === id)[0];
        if (!targetTerm) {
          throw new ApolloError('Target Term not found', 400);
        }
        targetTerm.isDeleted = true;
      });
      return idList;
    },
    saveTargetTermNote: (
      _,
      { id, important, message, assigneeId, noteId },
      { user }
    ) => {
      const targetTerm = targetTermList.filter(term => term.id === id)[0];
      if (!targetTerm) {
        throw new ApolloError('Target Term not found', 400);
      }
      const assignee = userList.filter(user => user.id === assigneeId)[0];
      const note =
        targetTerm.note === null
          ? {
              important: false,
              noteList: []
            }
          : targetTerm.note;
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
      targetTerm.note = note;
      return note;
    },
    deleteTargetTermNote: (_, { id, noteId }) => {
      const targetTerm = targetTermList.filter(term => term.id === id)[0];
      if (!targetTerm) {
        throw new ApolloError('Target Term not found', 400);
      }
      const noteIndex = targetTerm.note.noteList.findIndex(
        n => n.id === noteId
      );
      targetTerm.note.noteList.splice(noteIndex, 1);
      return targetTerm.note;
    }
  }
};
