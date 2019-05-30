const { DISCOUNT_LOOKUP } = require('../../constants');
const { ApolloError } = require('apollo-server-lambda');
const {
  discountTypeList,
  journeyTypeList,
  directionTypeList,
  discountList
} = require('../../../data');

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
      await updateDiscountCount(db, pricingTermId);
      const [discount] = await getDiscount(db, id);
      return discount;
    },
    copyDiscount: (
      _,
      {
        id,
        name,
        discountTypeId,
        discountValue,
        journeyTypeId,
        directionTypeId
      }
    ) => {
      const discount = discountList.filter(discount => discount.id === id)[0];
      if (!discount) {
        throw new ApolloError('Discount not found', 400);
      }
      const maxId = Math.max(...discountList.map(d => d.id)) + 1;
      const maxContractOrder =
        Math.max(...discountList.map(discount => discount.contractOrder)) + 1;
      const maxAppliedOrder =
        Math.max(...discountList.map(discount => discount.appliedOrder)) + 1;
      const discountType = discountTypeId
        ? discountTypeList.filter(type => type.id === discountTypeId)[0]
        : null;
      const journeyType = journeyTypeId
        ? journeyTypeList.filter(type => type.id === journeyTypeId)[0]
        : null;
      const directionType = directionTypeId
        ? directionTypeList.filter(type => type.id === directionTypeId)[0]
        : null;
      const discountCopy = {
        id: maxId,
        pricingTermId: discount.pricingTermId,
        contractOrder: maxContractOrder,
        appliedOrder: maxAppliedOrder,
        name,
        effectiveStartDate: new Date(),
        effectiveEndDate: new Date(253402232400000),
        discountType,
        discountValue:
          discountTypeId === 2 ? discountValue / 100 : discountValue,
        journeyType,
        directionType,
        normalizationList: 0,
        note: null,
        isDeleted: false
      };
      discountList.push(discountCopy);
      return discountCopy;
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
      const [discount] = await getDiscount(db, id);
      return discount;
    },
    deleteDiscounts: async (_, { pricingTermId, idList }, { db }) => {
      await db('discount')
        .update({ isdeleted: true })
        .whereIn('id', idList);
      await updateDiscountCount(db, pricingTermId);
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
      discountTypeId: 'l.id',
      discountTypeName: 'l.name_val',
      discountValue: 'd.discountvalue',
      journeyTypeId: 'l1.id',
      journeyTypeName: 'l1.name_val',
      directionTypeId: 'l2.id',
      directionTypeName: 'l2.name_val',
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

const getDiscount = async (db, id) =>
  await db('discount as d')
    .select({
      id: 'd.id',
      pricingTermId: 'd.pricingtermid',
      contractOrder: 'd.readorder',
      appliedOrder: 'd.sequence',
      name: 'd.generateddiscountname',
      discountTypeId: 'l.id',
      discountTypeName: 'l.name_val',
      discountValue: 'd.discountvalue',
      journeyTypeId: 'l1.id',
      journeyTypeName: 'l1.name_val',
      directionTypeId: 'l2.id',
      directionTypeName: 'l2.name_val',
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

const updateDiscountCount = async (db, pricingTermId) => {
  const [{ count }] = await db('discount')
    .count('*')
    .where('pricingtermid', pricingTermId)
    .andWhere('isdeleted', false);
  await db('pricingterm')
    .update({
      count_discounts: count
    })
    .where('id', pricingTermId);
};
