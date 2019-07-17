const { TARGET_TERM_LOOKUP } = require('../../constants');

exports.targetLevel = {
  Query: {
    targetLevelList: async (_, { targetTermId }, { db }) =>
      await getTargetLevelList(db, targetTermId),
    targetLevel: async (_, { id, targetTermId }, { db }) =>
      await getTargetLevel(db, id, targetTermId)
  },
  Mutation: {
    createTargetLevel: async (
      _,
      { targetTermId, targetAmount, scoringTarget, incentiveDescription },
      { db }
    ) => {
      const targetLevelName = await getTargetLevelName(db, targetTermId);
      await db.raw(`SELECT targetlevel_create(
        '${targetLevelName.tableName}',
        ${targetTermId},
        '${targetLevelName.targetAmount}',
        ${
          targetLevelName.targetAmount === 'numberofsegments'
            ? targetAmount
            : targetAmount / 100
        },
        '${incentiveDescription}',
        ${scoringTarget},
        ${1}
      )`);
    },
    editTargetLevel: async (
      _,
      { id, targetTermId, targetAmount, scoringTarget, incentiveDescription },
      { db }
    ) => {
      const targetLevelName = await getTargetLevelName(db, targetTermId);
      await db.raw(`SELECT targetlevel_update(
        '${id}',
        '${targetLevelName.tableName}',
        ${targetTermId},
        '${targetLevelName.targetAmount}',
        ${
          targetLevelName.targetAmount === 'numberofsegments'
            ? targetAmount
            : targetAmount / 100
        },
        '${incentiveDescription}',
        ${scoringTarget},
        ${1}
      )`);
      return await getTargetLevelList(db, targetTermId);
    },
    toggleTargetLevel: async (_, { id, targetTermId }, { db }) => {
      const targetLevel = await getTargetLevelName(db, targetTermId);
      await db.raw(
        `SELECT targetlevel_toggle('${
          targetLevel.tableName
        }', '${id}', ${targetTermId})`
      );
      return await getTargetLevelList(db, targetTermId);
    },
    deleteTargetLevel: async (_, { id, targetTermId }, { db }) => {
      const targetLevel = await getTargetLevelName(db, targetTermId);
      await db.raw(
        `SELECT targetlevel_delete('${targetLevel.tableName}', '${id}')`
      );
      return id;
    }
  }
};

const getTargetLevelList = async (db, targetTermId) => {
  const targetLevel = await getTargetLevelName(db, targetTermId);
  return await db(targetLevel.tableName)
    .select({
      id: 'control',
      targetTermId: 'targettermid',
      targetAmount: targetLevel.targetAmount,
      scoringTarget: 'overallscore',
      incentiveDescription: 'incentivedescription'
    })
    .orderBy('control')
    .where('isdeleted', false)
    .andWhere('targettermid', targetTermId);
};

const getTargetLevel = async (db, id, targetTermId) => {
  const targetLevel = await getTargetLevelName(db, targetTermId);
  const [level] = await db(targetLevel.tableName)
    .select({
      id: 'control',
      targetTermId: 'targettermid',
      targetAmount: targetLevel.targetAmount,
      scoringTarget: 'overallscore',
      incentiveDescription: 'incentivedescription'
    })
    .orderBy('control')
    .where('control', id);
  return level;
};

const getTargetLevelName = async (db, targetTermId) => {
  const [targetTerm] = await db('targetterm_v2')
    .select('targettype')
    .where('id', targetTermId);
  if (!targetTerm) return null;
  const targetType = parseInt(targetTerm.targettype);
  if (targetType === TARGET_TERM_LOOKUP.SEGMENT_SHARE) {
    return {
      tableName: 'targetsegmentshare_v2',
      targetAmount: 'segmentsshare'
    };
  } else if (targetType === TARGET_TERM_LOOKUP.REVENUE_SHARE) {
    return {
      tableName: 'targetrevenueshare_v2',
      targetAmount: 'numberofsegments'
    };
  } else if (targetType === TARGET_TERM_LOOKUP.SHARE_GAP) {
    return {
      tableName: 'targetsegmentsharegap_v2',
      targetAmount: 'segmentssharegap'
    };
  } else if (targetType === TARGET_TERM_LOOKUP.SEGMENT) {
    return {
      tableName: 'targetsegment_v2',
      targetAmount: 'numberofsegments'
    };
  } else if (targetType === TARGET_TERM_LOOKUP.REVENUE) {
    return {
      tableName: 'targetrevenue_v2',
      targetAmount: 'amount'
    };
  } else if (targetType === TARGET_TERM_LOOKUP.KPG) {
    return {
      tableName: 'targetkpg',
      targetAmount: 'targetsegmentshare'
    };
  }
};
