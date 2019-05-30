const { TARGET_TERM, TARGET_LEVEL } = require('../../constants');

exports.targetTerm = {
  queries: {
    name: 'Target Term Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      targetTermList {
        ${TARGET_TERM}
      }
      targetLevelList(targetTermId: 1) {
        ${TARGET_LEVEL}
      }
    }`
  },
  mutations: {
    name: 'Target Term Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      createTargetTerm(
        name: "test",
        targetTypeId: 1,
        cabinF: true,
        cabinB: false,
        cabinP: true,
        cabinE: false,
        incentiveTypeId: 2,
        qsi: 0.7,
        softTarget: true,
        internalTarget: true,
        timeframe: 20
      ) {
        ${TARGET_TERM}
      }

      createTargetLevel(
        targetTermId: 1
        targetAmount: 50
        scoringTarget: true
        incentiveDescription: "Test"
      ) {
        ${TARGET_LEVEL}
      }
    }
    `
  }
};
