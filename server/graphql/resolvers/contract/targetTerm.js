const { TARGET_TERM_LOOKUP } = require('../../constants');
const { targetLevelList } = require('../../../data');

exports.targetTerm = {
  Query: {
    targetTermList: async (_, { contractId }, { db }) =>
      contractId ? await getTargetTermList(db, contractId) : [],
    targetTerm: async (_, { id }, { db }) => await getTargetTerm(db, id),
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
    createTargetTerm: async (
      _,
      {
        contractId,
        name,
        targetTypeId,
        timeframe,
        cabinF,
        cabinB,
        cabinP,
        cabinE,
        incentiveTypeId,
        currencyId,
        softTarget,
        internalTarget,
        qsi,
        dpmPrice,
        dpmStartDate,
        baselineDateFrom,
        baselineDateTo,
        goalDateFrom,
        goalDateTo,
        airlineGroupFrom,
        airlineGroupTo,
        fareCategoryFrom,
        fareCategoryTo
      },
      { db }
    ) => {
      const { rows } = await db.raw(
        `SELECT targetterm_create(
          ${contractId},
          '${name}',
          ${targetTypeId},
          ${timeframe ? timeframe : 0},
          ${cabinF},
          ${cabinB},
          ${cabinP},
          ${cabinE},
          ${incentiveTypeId},
          ${currencyId},
          ${softTarget},
          ${internalTarget},
          ${qsi ? qsi / 100 : 0},
          ${dpmPrice},
          ${dpmStartDate},
          ${baselineDateFrom},
          ${baselineDateTo},
          ${goalDateFrom},
          ${goalDateTo},
          ${airlineGroupFrom},
          ${airlineGroupTo},
          ${fareCategoryFrom},
          ${fareCategoryTo}
        )`
      );
      const [{ targetterm_create: id }] = rows;
      return await getTargetTerm(db, id);
    },
    copyTargetTerm: async (_, { id, name }, { db }) => {
      const { rows } = await db.raw(
        `SELECT targetterm_createcopy(
          ${id},
          '${name}'
        )`
      );
      const [{ targetterm_createcopy: newId }] = rows;
      return await getTargetTerm(db, newId);
    },
    editTargetTerm: async (
      _,
      {
        id,
        name,
        timeframe,
        cabinF,
        cabinB,
        cabinP,
        cabinE,
        currencyId,
        softTarget,
        internalTarget,
        qsi,
        dpmPrice,
        dpmStartDate,
        baselineDateFrom,
        baselineDateTo,
        goalDateFrom,
        goalDateTo,
        airlineGroupFrom,
        airlineGroupTo,
        fareCategoryFrom,
        fareCategoryTo
      },
      { db }
    ) => {
      await db.raw(
        `SELECT targetterm_update(
          ${id},
          '${name}',
          ${timeframe ? timeframe : 0},
          ${cabinF},
          ${cabinB},
          ${cabinP},
          ${cabinE},
          ${currencyId},
          ${softTarget},
          ${internalTarget},
          ${qsi ? qsi / 100 : 0},
          ${dpmPrice},
          ${dpmStartDate},
          ${baselineDateFrom},
          ${baselineDateTo},
          ${goalDateFrom},
          ${goalDateTo},
          ${airlineGroupFrom},
          ${airlineGroupTo},
          ${fareCategoryFrom},
          ${fareCategoryTo}
        )`
      );
      return await getTargetTerm(db, id);
    },
    toggleTargetTermQC: async (_, { id }, { db }) => {
      await db('targetterm_v2')
        .update({
          qc: db.raw('NOT qc')
        })
        .where('id', id);
      return await getTargetTerm(db, id);
    },
    deleteTargetTerms: async (_, { idList }, { db }) => {
      await db('targetterm_v2')
        .update({ isdeleted: true })
        .whereIn('id', idList);
      return idList;
    }
  }
};

const getTargetTermList = async (db, contractId) =>
  await db('targetterm_getlist_vw')
    .select({
      id: 'targetterm_v2_id',
      name: 'targetterm_v2_name',
      effectiveFrom: 'contractcontainer_effectivefrom',
      effectiveTo: 'contractcontainer_effectiveto',
      timeframe: 'periodinmonths',
      qc: 'targetterm_v2_qc',
      targetTypeId: 'targettype',
      targetTypeName: 'l1_name_val',
      cabinF: 'targetterm_v2_cabinf',
      cabinB: 'targetterm_v2_cabinb',
      cabinP: 'targetterm_v2_cabinp',
      cabinE: 'targetterm_v2_cabine',
      qsi: 'servedmarketqsithreshold',
      incentiveTypeId: 'l2_id',
      incentiveTypeName: 'l2_name_val',
      softTarget: 'targetterm_v2_softtarget',
      internalTarget: 'targetterm_v2_internaltarget',
      currencyId: 'currency',
      targetAmount: db.raw(`
        case when targettype = 20 then   (select targetterm_getlist_vw.segmentsshare
          from targetterm_getlist_vw 
          where targetsegmentshare_v2_overallscore = 'True'
          and targetsegmentshare_v2_isdeleted = 'false')
        when targettype = 21 then   (select targetrevenueshare_v2_numberofsegments
                from targetterm_getlist_vw 
                where targetrevenueshare_v2_overallscore = 'True'
                and targetrevenueshare_v2_isdeleted = 'false'	)		
        when targettype = 22 then  ( select targetsegment_v2_numberofsegments
                from targetterm_getlist_vw 
                where targetsegment_v2_overallscore = 'True'
                and targetsegment_v2_isdeleted = 'false')
        when targettype = 23 then   (select amount 
                from targetterm_getlist_vw 
                where targetrevenue_v2_overallscore = 'True'
                and targetrevenue_v2_isdeleted = 'false')
        when targettype = 24 then  ( select targetterm_getlist_vw.segmentssharegap
                from targetterm_getlist_vw 
                where targetsegmentsharegap_v2_overallscore = 'True'
                and targetsegmentsharegap_v2_isdeleted = 'false')
        when targettype = 28 then (select dpmprice  
              from targetterm_getlist_vw 
              where targetkpg_overallscore = 'True'
              and targetkpg_isdeleted = 'false'	) end`),
      levelCount: db.raw(`
          case when targettype = 20 then   (select count(targetterm_getlist_vw.segmentsshare)
          from targetterm_getlist_vw )          
          when targettype = 21 then   (select count(targetrevenueshare_v2_numberofsegments)
                    from targetterm_getlist_vw )
          when targettype = 22 then  ( select count(targetsegment_v2_numberofsegments)
                    from targetterm_getlist_vw )
          when targettype = 23 then   (select count(amount) 
                    from targetterm_getlist_vw )
          when targettype = 24 then  ( select count(targetterm_getlist_vw.segmentssharegap)
                    from targetterm_getlist_vw )
          when targettype = 28 then (select count(dpmprice ) 
                  from targetterm_getlist_vw ) end`),
      ruleCount: 0,
      noteImportant: db.raw('COALESCE(important, FALSE)'),
      noteContent: db.raw(
        'CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = usernote_id) = 0 THEN FALSE else TRUE END '
      ),
      order: 'targetterm_v2_sequence',
      dpmPrice: 'dpmprice',
      dpmStartDate: 'dpmstart',
      baselineDateFrom: 'baselinestart',
      baselineDateTo: 'baselineend',
      goalDateFrom: 'goalstart',
      goalDateTo: 'goalend',
      airlineGroupFrom: 'airlinegrpfrom',
      airlineGroupTo: 'airlinegrpto',
      fareCategoryFrom: 'farecatfrom',
      fareCategoryTo: 'farecatto'
    })
    .where('targetterm_v2_isdeleted', false)
    .andWhere('contractcontainerid', contractId);

const getTargetTerm = async (db, id) => {
  const [targetTerm] = await db('targetterm_getlist_vw')
    .select({
      id: 'targetterm_v2_id',
      name: 'targetterm_v2_name',
      effectiveFrom: 'contractcontainer_effectivefrom',
      effectiveTo: 'contractcontainer_effectiveto',
      timeframe: 'periodinmonths',
      qc: 'targetterm_v2_qc',
      targetTypeId: 'targettype',
      targetTypeName: 'l1_name_val',
      cabinF: 'targetterm_v2_cabinf',
      cabinB: 'targetterm_v2_cabinb',
      cabinP: 'targetterm_v2_cabinp',
      cabinE: 'targetterm_v2_cabine',
      qsi: 'servedmarketqsithreshold',
      incentiveTypeId: 'l2_id',
      incentiveTypeName: 'l2_name_val',
      softTarget: 'targetterm_v2_softtarget',
      internalTarget: 'targetterm_v2_internaltarget',
      currencyId: 'currency',
      targetAmount: db.raw(`
        case when targettype = 20 then   (select targetterm_getlist_vw.segmentsshare
          from targetterm_getlist_vw 
          where targetsegmentshare_v2_overallscore = 'True'
          and targetsegmentshare_v2_isdeleted = 'false')
        when targettype = 21 then   (select targetrevenueshare_v2_numberofsegments
                from targetterm_getlist_vw 
                where targetrevenueshare_v2_overallscore = 'True'
                and targetrevenueshare_v2_isdeleted = 'false'	)		
        when targettype = 22 then  ( select targetsegment_v2_numberofsegments
                from targetterm_getlist_vw 
                where targetsegment_v2_overallscore = 'True'
                and targetsegment_v2_isdeleted = 'false')
        when targettype = 23 then   (select amount 
                from targetterm_getlist_vw 
                where targetrevenue_v2_overallscore = 'True'
                and targetrevenue_v2_isdeleted = 'false')
        when targettype = 24 then  ( select targetterm_getlist_vw.segmentssharegap
                from targetterm_getlist_vw 
                where targetsegmentsharegap_v2_overallscore = 'True'
                and targetsegmentsharegap_v2_isdeleted = 'false')
        when targettype = 28 then (select dpmprice  
              from targetterm_getlist_vw 
              where targetkpg_overallscore = 'True'
              and targetkpg_isdeleted = 'false'	) end`),
      levelCount: db.raw(`
          case when targettype = 20 then   (select count(targetterm_getlist_vw.segmentsshare)
          from targetterm_getlist_vw )          
          when targettype = 21 then   (select count(targetrevenueshare_v2_numberofsegments)
                    from targetterm_getlist_vw )
          when targettype = 22 then  ( select count(targetsegment_v2_numberofsegments)
                    from targetterm_getlist_vw )
          when targettype = 23 then   (select count(amount) 
                    from targetterm_getlist_vw )
          when targettype = 24 then  ( select count(targetterm_getlist_vw.segmentssharegap)
                    from targetterm_getlist_vw )
          when targettype = 28 then (select count(dpmprice ) 
                  from targetterm_getlist_vw ) end`),
      ruleCount: 0,
      noteImportant: db.raw('COALESCE(important, FALSE)'),
      noteContent: db.raw(
        'CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = usernote_id) = 0 THEN FALSE else TRUE END '
      ),
      order: 'targetterm_v2_sequence',
      dpmPrice: 'dpmprice',
      dpmStartDate: 'dpmstart',
      baselineDateFrom: 'baselinestart',
      baselineDateTo: 'baselineend',
      goalDateFrom: 'goalstart',
      goalDateTo: 'goalend',
      airlineGroupFrom: 'airlinegrpfrom',
      airlineGroupTo: 'airlinegrpto',
      fareCategoryFrom: 'farecatfrom',
      fareCategoryTo: 'farecatto'
    })
    .where('targetterm_v2_isdeleted', false)
    .andWhere('targetterm_v2_id', id);
  return targetTerm;
};
