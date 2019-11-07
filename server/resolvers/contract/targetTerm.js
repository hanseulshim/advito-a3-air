import { TARGET_TERM_LOOKUP } from '../../constants';
import { updateQC } from './contractContainer';
import { TargetTerm } from '../../models';

export const targetTerm = {
  Query: {
    targetTermList: async (_, { contractId }, { db }) =>
      contractId ? await getTargetTermList(db, contractId) : [],
    targetTerm: async (_, { id }, { db }) => await getTargetTerm(db, id),
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
        cabinC,
        cabinP,
        cabinY,
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
          ${cabinC},
          ${cabinP},
          ${cabinY},
          ${incentiveTypeId},
          ${currencyId},
          ${softTarget},
          ${internalTarget},
          ${qsi},
          ${dpmPrice},
          ${dpmStartDate ? `'${dpmStartDate}'` : null},
          ${baselineDateFrom ? `'${baselineDateFrom}'` : null},
          ${baselineDateTo ? `'${baselineDateTo}'` : null},
          ${goalDateFrom ? `'${goalDateFrom}'` : null},
          ${goalDateTo ? `'${goalDateTo}'` : null},
          ${airlineGroupFrom ? `'${airlineGroupFrom}'` : null},
          ${airlineGroupTo ? `'${airlineGroupTo}'` : null},
          ${fareCategoryFrom ? `'${fareCategoryFrom}'` : null},
          ${fareCategoryTo ? `'${fareCategoryTo}'` : null}
        )`
      );
      const [{ targetterm_create: id }] = rows;
      updateQC(contractId);
      return await getTargetTerm(db, id);
    },
    copyTargetTerm: async (_, { id, name }, { db }) => {
      const { rows } = await db.raw(
        `SELECT targetterm_v2_createcopy(
          ${id},
          '${name}',
          null,
          null,
          null,
          null
        )`
      );
      const [{ targetterm_v2_createcopy: newId }] = rows;
      const targetTerm = await TargetTerm.query().findById(id);
      updateQC(parseInt(targetTerm.contractcontainerid));
      return await getTargetTerm(db, newId);
    },
    editTargetTerm: async (
      _,
      {
        id,
        name,
        timeframe,
        cabinF,
        cabinC,
        cabinP,
        cabinY,
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
          ${cabinC},
          ${cabinP},
          ${cabinY},
          ${currencyId},
          ${softTarget},
          ${internalTarget},
          ${qsi},
          ${dpmPrice},
          ${dpmStartDate ? `'${dpmStartDate}'` : null},
          ${baselineDateFrom ? `'${baselineDateFrom}'` : null},
          ${baselineDateTo ? `'${baselineDateTo}'` : null},
          ${goalDateFrom ? `'${goalDateFrom}'` : null},
          ${goalDateTo ? `'${goalDateTo}'` : null},
          ${airlineGroupFrom ? `'${airlineGroupFrom}'` : null},
          ${airlineGroupTo ? `'${airlineGroupTo}'` : null},
          ${fareCategoryFrom ? `'${fareCategoryFrom}'` : null},
          ${fareCategoryTo ? `'${fareCategoryTo}'` : null}
        )`
      );
      return await getTargetTerm(db, id);
    },
    toggleTargetTermQC: async (_, { contractId, idList }, { db }) => {
      const queries = idList.map(id =>
        db.raw(`
        SELECT targetterm_toggle_qc(${id})
      `)
      );
      await Promise.all(queries);
      updateQC(contractId);
      return await getTargetTermList(db, contractId);
    },
    deleteTargetTerms: async (_, { contractId, idList }, { db }) => {
      const queries = idList.map(id =>
        db.raw(`
        SELECT targetterm_delete(${id})
      `)
      );
      await Promise.all(queries);
      updateQC(contractId);
      return idList;
    }
  }
};

const getTargetTermList = async (db, contractId) =>
  await db('targetterm_getlist_vw')
    .select({
      id: 'targetterm_v2_id',
      name: 'targetterm_v2_name',
      effectiveFrom: db.raw(
        '(select _effectivefrom from targetterm_effectivedate(targetterm_v2_id))'
      ),
      effectiveTo: db.raw(
        '(select _effectiveto from targetterm_effectivedate(targetterm_v2_id))'
      ),
      timeframe: 'periodinmonths',
      qc: 'targetterm_v2_qc',
      targetTypeId: 'targettype',
      targetTypeName: 'l1_name_val',
      cabinF: 'targetterm_v2_cabinf',
      cabinC: 'targetterm_v2_cabinc',
      cabinP: 'targetterm_v2_cabinp',
      cabinY: 'targetterm_v2_cabiny',
      qsi: 'servedmarketqsithreshold',
      incentiveTypeId: 'l2_id',
      incentiveTypeName: 'l2_name_val',
      softTarget: 'targetterm_v2_softtarget',
      internalTarget: 'targetterm_v2_internaltarget',
      currencyId: 'currency',
      targetAmount: db.raw(`
        case when targettype = ${
          TARGET_TERM_LOOKUP.SEGMENT_SHARE
        } then (select segmentsshare
          from targetsegmentshare_v2
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false)
        when targettype = ${
          TARGET_TERM_LOOKUP.REVENUE_SHARE
        } then (select numberofsegments
          from targetrevenueshare_v2
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false)
        when targettype = ${
          TARGET_TERM_LOOKUP.SEGMENT
        } then (select numberofsegments
          from targetsegment_v2
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false)
        when targettype = ${TARGET_TERM_LOOKUP.REVENUE} then (select amount 
          from targetrevenue_v2
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false)
        when targettype = ${
          TARGET_TERM_LOOKUP.SHARE_GAP
        } then  (select segmentssharegap
          from targetsegmentsharegap_v2 
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false)
        when targettype = ${
          TARGET_TERM_LOOKUP.KPG
        } then (select targetsegmentshare  
          from targetkpg
          where overallscore = true
          and targettermid = targetterm_v2_id
          and isdeleted = false) end`),
      levelCount: db.raw(`
          case when targettype = ${
            TARGET_TERM_LOOKUP.SEGMENT_SHARE
          } then   (select count(*)
            from targetsegmentshare_v2
            where targettermid = targetterm_v2_id
            and isdeleted = false)
          when targettype = ${
            TARGET_TERM_LOOKUP.REVENUE_SHARE
          } then   (select count(*)
            from targetrevenueshare_v2
            where targettermid = targetterm_v2_id
            and isdeleted = false)
          when targettype = ${
            TARGET_TERM_LOOKUP.SEGMENT
          } then  ( select count(*)
            from targetsegment_v2
            where targettermid = targetterm_v2_id
            and isdeleted = false)
          when targettype = ${
            TARGET_TERM_LOOKUP.REVENUE
          } then   (select count(*)
            from targetrevenue_v2
            where targettermid = targetterm_v2_id
            and isdeleted = false)
          when targettype = ${
            TARGET_TERM_LOOKUP.SHARE_GAP
          } then  ( select count(*)
            from targetsegmentsharegap_v2 
            where targettermid = targetterm_v2_id
            and isdeleted = false)
          when targettype = ${TARGET_TERM_LOOKUP.KPG} then (select count(*)
            from targetkpg
            where targettermid = targetterm_v2_id
            and isdeleted = false) end`),
      ruleCount: 'ruleCount',
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
      effectiveFrom: db.raw(
        '(select _effectivefrom from targetterm_effectivedate(targetterm_v2_id))'
      ),
      effectiveTo: db.raw(
        '(select _effectiveto from targetterm_effectivedate(targetterm_v2_id))'
      ),
      timeframe: 'periodinmonths',
      qc: 'targetterm_v2_qc',
      targetTypeId: 'targettype',
      targetTypeName: 'l1_name_val',
      cabinF: 'targetterm_v2_cabinf',
      cabinC: 'targetterm_v2_cabinc',
      cabinP: 'targetterm_v2_cabinp',
      cabinY: 'targetterm_v2_cabiny',
      qsi: 'servedmarketqsithreshold',
      incentiveTypeId: 'l2_id',
      incentiveTypeName: 'l2_name_val',
      softTarget: 'targetterm_v2_softtarget',
      internalTarget: 'targetterm_v2_internaltarget',
      currencyId: 'currency',
      targetAmount: db.raw(`
  case when targettype = ${
    TARGET_TERM_LOOKUP.SEGMENT_SHARE
  } then (select segmentsshare
    from targetsegmentshare_v2
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false)
  when targettype = ${
    TARGET_TERM_LOOKUP.REVENUE_SHARE
  } then (select numberofsegments
    from targetrevenueshare_v2
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false)
  when targettype = ${TARGET_TERM_LOOKUP.SEGMENT} then (select numberofsegments
    from targetsegment_v2
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false)
  when targettype = ${TARGET_TERM_LOOKUP.REVENUE} then (select amount 
    from targetrevenue_v2
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false)
  when targettype = ${
    TARGET_TERM_LOOKUP.SHARE_GAP
  } then  (select segmentssharegap
    from targetsegmentsharegap_v2 
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false)
  when targettype = ${TARGET_TERM_LOOKUP.KPG} then (select targetsegmentshare  
    from targetkpg
    where overallscore = true
    and targettermid = targetterm_v2_id
    and isdeleted = false) end`),
      levelCount: db.raw(`
    case when targettype = ${
      TARGET_TERM_LOOKUP.SEGMENT_SHARE
    } then   (select count(*)
      from targetsegmentshare_v2
      where targettermid = targetterm_v2_id
      and isdeleted = false)
    when targettype = ${
      TARGET_TERM_LOOKUP.REVENUE_SHARE
    } then   (select count(*)
      from targetrevenueshare_v2
      where targettermid = targetterm_v2_id
      and isdeleted = false)
    when targettype = ${TARGET_TERM_LOOKUP.SEGMENT} then  ( select count(*)
      from targetsegment_v2
      where targettermid = targetterm_v2_id
      and isdeleted = false)
    when targettype = ${TARGET_TERM_LOOKUP.REVENUE} then   (select count(*)
      from targetrevenue_v2
      where targettermid = targetterm_v2_id
      and isdeleted = false)
    when targettype = ${TARGET_TERM_LOOKUP.SHARE_GAP} then  ( select count(*)
      from targetsegmentsharegap_v2 
      where targettermid = targetterm_v2_id
      and isdeleted = false)
    when targettype = ${TARGET_TERM_LOOKUP.KPG} then (select count(*)
      from targetkpg
      where targettermid = targetterm_v2_id
      and isdeleted = false) end`),
      ruleCount: 'ruleCount',
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
