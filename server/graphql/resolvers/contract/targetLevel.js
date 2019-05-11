const { ApolloError } = require('apollo-server-lambda');
const { targetLevelList } = require('../../../data');

exports.targetLevel = {
  Query: {
    targetLevelList: (_, { targetTermId }) =>
      targetLevelList.filter(t => t.targetTermId === targetTermId)
  },
  Mutation: {
    createTargetLevel: (
      _,
      { targetTermId, targetAmount, scoringTarget, incentiveDescription }
    ) => {
      const maxId = Math.max(...targetLevelList.map(t => t.id)) + 1;
      const targetLevel = {
        id: maxId,
        targetTermId,
        targetAmount: targetAmount / 100,
        scoringTarget,
        incentiveDescription
      };
      targetLevelList.push(targetLevel);
      return targetLevel;
    },
    editTargetLevel: (
      _,
      { id, targetAmount, scoringTarget, incentiveDescription }
    ) => {
      const targetLevel = targetLevelList.filter(t => t.id === id)[0];
      if (!targetLevel) {
        throw new ApolloError('Target Level not found', 400);
      }
      targetLevel.targetAmount = targetAmount / 100;
      targetLevel.scoringTarget = scoringTarget;
      targetLevel.incentiveDescription = incentiveDescription;
      return targetLevel;
    },
    deleteTargetLevel: (_, { id }) => {
      const targetLevel = targetLevelList.filter(t => t.id === id)[0];
      if (!targetLevel) {
        throw new ApolloError('Target Level not found', 400);
      }
      targetLevel.isDeleted = true;
      return id;
    }
  }
};
