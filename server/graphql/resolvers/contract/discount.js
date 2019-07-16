const { DISCOUNT_LOOKUP } = require('../../constants');

exports.discount = {
  Query: {
    discountList: async (_, { pricingTermId }, { db }) =>
      pricingTermId ? await getDiscountList(db, pricingTermId) : [],
    discount: async (_, { id }, { db }) => await getDiscount(db, id),
    discountTypeList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', DISCOUNT_LOOKUP.DISCOUNT_TYPE),
    journeyTypeList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', DISCOUNT_LOOKUP.JOURNEY_TYPE),
    directionTypeList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', DISCOUNT_LOOKUP.DIRECTION_TYPE)
  },
  Mutation: {
    createDiscount: async (
      _,
      {
        pricingTermId,
        name,
        discountTypeId,
        discountValue,
        journeyTypeId,
        directionTypeId
      },
      { db }
    ) => {
      const { rows } = await db.raw(
        `SELECT discount_create(
          ${pricingTermId},
          '${name}',
          ${discountTypeId},
          ${discountValue},
          ${journeyTypeId},
          ${directionTypeId}
        )`
      );
      const [{ discount_create: id }] = rows;
      return await getDiscount(db, id);
    },
    copyDiscount: async (
      _,
      {
        id,
        name,
        discountTypeId,
        discountValue,
        journeyTypeId,
        directionTypeId
      },
      { db }
    ) => {
      const value =
        discountTypeId === DISCOUNT_LOOKUP.PERCENTAGE
          ? discountValue / 100
          : discountValue;
      const { rows } = await db.raw(
        `SELECT discount_createcopy(${id}, '${name}', ${discountTypeId}, ${value}, ${journeyTypeId}, ${directionTypeId})`
      );
      const [{ discount_createcopy: newId }] = rows;
      return await getDiscount(db, parseInt(newId));
    },
    editDiscount: async (
      _,
      {
        id,
        name,
        discountTypeId,
        discountValue,
        journeyTypeId,
        directionTypeId
      },
      { db }
    ) => {
      const value =
        discountTypeId === DISCOUNT_LOOKUP.PERCENTAGE
          ? discountValue / 100
          : discountValue;
      await db.raw(
        `SELECT discount_update(${id}, '${name}', ${discountTypeId}, ${value}, ${journeyTypeId}, ${directionTypeId})`
      );
      return await getDiscount(db, id);
    },
    deleteDiscounts: async (_, { pricingTermId, idList }, { db }) => {
      const queries = idList.map(id =>
        db.raw(`
        SELECT discount_delete(${id})
      `)
      );
      await Promise.all(queries);
      await db.raw(`SELECT discount_update_sequence_all(${pricingTermId})`);
      return idList;
    },
    updateDiscountAppliedOrder: async (_, { updateDiscountList }, { db }) => {
      const queries = updateDiscountList.map(discount =>
        db.raw(`
        SELECT discount_update_sequence_single(${discount.id}, ${
          discount.appliedOrder
        })
      `)
      );
      await Promise.all(queries);
    }
  }
};

const getDiscountList = async (db, pricingTermId) =>
  await db('discount as d')
    .select({
      id: 'd.id',
      pricingTermId: 'd.pricingtermid',
      contractOrder: 'd.readorder',
      appliedOrder: 'd.sequence',
      name: 'd.generateddiscountname',
      effectiveFrom: db.raw(
        '(select _effectivefrom from discount_effectivedate(d.id))'
      ),
      effectiveTo: db.raw(
        '(select _effectiveto from discount_effectivedate(d.id))'
      ),
      discountTypeId: 'l.id',
      discountTypeName: 'l.name_val',
      discountValue: 'd.discountvalue',
      journeyTypeId: 'l1.id',
      journeyTypeName: 'l1.name_val',
      directionTypeId: 'l2.id',
      directionTypeName: 'l2.name_val',
      ruleCount: db.raw(
        '(SELECT COUNT(*) from (select rules_checker(d.rulescontainerguidref)) as c)'
      ),
      normalizationCount: 'd.count_normalizations',
      noteImportant: db.raw('COALESCE(n.important, FALSE)'),
      noteContent: db.raw(
        'CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = n.id) = 0 THEN FALSE else TRUE END'
      )
    })
    .leftJoin('lov_lookup as l', 'd.discounttype', 'l.id')
    .leftJoin('lov_lookup as l1', 'd.journeytype', 'l1.id')
    .leftJoin('lov_lookup as l2', 'd.direction', 'l2.id')
    .leftJoin('usernote as n', 'd.notesid', 'n.id')
    .where('d.isdeleted', false)
    .andWhere('d.pricingtermid', pricingTermId)
    .groupBy('d.id', 'l.id', 'l1.id', 'l2.id', 'n.important', 'n.id');

const getDiscount = async (db, id) => {
  const [discount] = await db('discount as d')
    .select({
      id: 'd.id',
      pricingTermId: 'd.pricingtermid',
      contractOrder: 'd.readorder',
      appliedOrder: 'd.sequence',
      name: 'd.generateddiscountname',
      effectiveFrom: db.raw(
        '(select _effectivefrom from discount_effectivedate(d.id))'
      ),
      effectiveTo: db.raw(
        '(select _effectiveto from discount_effectivedate(d.id))'
      ),
      discountTypeId: 'l.id',
      discountTypeName: 'l.name_val',
      discountValue: 'd.discountvalue',
      journeyTypeId: 'l1.id',
      journeyTypeName: 'l1.name_val',
      directionTypeId: 'l2.id',
      directionTypeName: 'l2.name_val',
      ruleCount: db.raw(
        '(SELECT COUNT(*) from (select rules_checker(d.rulescontainerguidref)) as c)'
      ),
      normalizationCount: 'd.count_normalizations',
      noteImportant: db.raw('COALESCE(n.important, FALSE)'),
      noteContent: db.raw(
        'CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = n.id) = 0 THEN FALSE else TRUE END'
      )
    })
    .leftJoin('lov_lookup as l', 'd.discounttype', 'l.id')
    .leftJoin('lov_lookup as l1', 'd.journeytype', 'l1.id')
    .leftJoin('lov_lookup as l2', 'd.direction', 'l2.id')
    .leftJoin('usernote as n', 'd.notesid', 'n.id')
    .where('d.isdeleted', false)
    .andWhere('d.id', id)
    .groupBy('d.id', 'l.id', 'l1.id', 'l2.id', 'n.important', 'n.id');
  return discount;
};
