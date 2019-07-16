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
      const [{ maxAppliedOrder, maxContractOrder }] = await db('discount')
        .max({ maxAppliedOrder: 'sequence' })
        .max({ maxContractOrder: 'readorder' })
        .where('pricingtermid', pricingTermId)
        .andWhere('isdeleted', false);
      const [id] = await db('discount').insert(
        {
          pricingtermid: pricingTermId,
          sequence: maxAppliedOrder ? parseInt(maxAppliedOrder) + 1 : 1,
          readorder: maxContractOrder ? parseInt(maxContractOrder) + 1 : 1,
          generateddiscountname: name,
          discounttype: discountTypeId,
          discountvalue:
            discountTypeId === DISCOUNT_LOOKUP.PERCENTAGE
              ? discountValue / 100
              : discountValue,
          direction: directionTypeId,
          journeytype: journeyTypeId,
          count_normalizations: 0,
          ignore: false
        },
        'id'
      );
      await updateDiscountOrder(db, pricingTermId);
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
      await db('discount')
        .where('id', id)
        .update({
          generateddiscountname: name,
          discounttype: discountTypeId,
          discountvalue:
            discountTypeId === DISCOUNT_LOOKUP.PERCENTAGE
              ? discountValue / 100
              : discountValue,
          direction: directionTypeId,
          journeytype: journeyTypeId
        });
      return await getDiscount(db, id);
    },
    deleteDiscounts: async (_, { pricingTermId, idList }, { db }) => {
      await db('discount')
        .update({ isdeleted: true }, 'id')
        .whereIn('id', idList);
      await updateDiscountOrder(db, pricingTermId);
      return idList;
    },
    updateDiscountAppliedOrder: async (_, { updateDiscountList }, { db }) => {
      const [[pricingTermid]] = await db.transaction(trx => {
        const queries = [];
        updateDiscountList.forEach(discount => {
          const query = db('discount')
            .where('id', discount.id)
            .update(
              {
                sequence: discount.appliedOrder
              },
              'pricingtermid'
            )
            .transacting(trx);
          queries.push(query);
        });

        Promise.all(queries)
          .then(trx.commit)
          .catch(trx.rollback);
      });
      return await getDiscountList(db, parseInt(pricingTermid));
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

const updateDiscountOrder = async (db, pricingTermId) => {
  await db.raw(`SELECT discount_update_sequence(${pricingTermId})`);
};
