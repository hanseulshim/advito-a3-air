import { TARGET_TERM, TARGET_LEVEL } from '../../constants';

export default {
  queries: {
    name: 'Target Term Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      targetTermList {
        ${TARGET_TERM}
      }
      targetLevelList(targetTermId: 33) {
        ${TARGET_LEVEL}
      }
      targetTypeList {
        id
        name
      }
      incentiveTypeList {
        id
        name
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
        cabinC: false,
        cabinP: true,
        cabinY: false,
        incentiveTypeId: 2,
        qsi: 0.7,
        softTarget: true,
        internalTarget: true,
        timeframe: 20
      ) {
        ${TARGET_TERM}
      }

      deleteTargetTerms(idList: [34, 35, 36])

      createTargetLevel(
        targetTermId: 1
        targetAmount: 50
        scoringTarget: true
        incentiveDescription: "Test"
      ) {
        ${TARGET_LEVEL}
      }

      toggleTargetLevel(id: 3, targetTermId: 33) {
        ${TARGET_LEVEL}
      }
    }
    `
  }
};
