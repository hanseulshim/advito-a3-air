exports.pricingTerm = {
  Query: {
    pricingTermList: async (_, { contractId }, { db }) =>
      contractId ? await getPricingTermList(db, contractId) : [],
    pricingTerm: async (_, { id }, { db }) => await getPricingTerm(db, id)
  },
  Mutation: {
    createPricingTerm: async (_, { contractId, name, ignore }, { db }) => {
      const [{ maxAppliedOrder, maxContractOrder }] = await db('pricingterm')
        .max({ maxAppliedOrder: 'sequence' })
        .max({ maxContractOrder: 'readorder' })
        .where('contractcontainerid', contractId)
        .andWhere('isdeleted', false);
      const [id] = await db('pricingterm').insert(
        {
          contractcontainerid: contractId,
          name,
          type: 1,
          sequence: maxAppliedOrder ? parseInt(maxAppliedOrder) + 1 : 1,
          readorder: maxContractOrder ? parseInt(maxContractOrder) + 1 : 1,
          qc: false,
          ignore
        },
        'id'
      );
      await updatePricingTermOrder(db, contractId);
      return await getPricingTerm(db, id);
    },
    copyPricingTerm: async (_, { id, contractId, name }, { db }) => {
      const { rows } = await db.raw(
        `SELECT pricingterm_createcopy(${id}, '${name}')`
      );
      const [{ pricingterm_createcopy: newId }] = rows;
      await updatePricingTermOrder(db, contractId);
      const [pricingTerm] = await getPricingTerm(db, parseInt(newId));
      return pricingTerm;
    },
    editPricingTerm: async (_, { id, name, ignore }, { db }) => {
      await db('pricingterm')
        .where('id', id)
        .update({
          name,
          ignore
        });
      return await getPricingTerm(db, id);
    },
    togglePricingTermQC: async (_, { id }, { db }) => {
      await db('pricingterm')
        .update({
          qc: db.raw('NOT qc')
        })
        .where('id', id);
      return await getPricingTerm(db, id);
    },
    deletePricingTerms: async (_, { contractId, idList }, { db }) => {
      await db('pricingterm')
        .update({ isdeleted: true })
        .whereIn('id', idList);
      await updatePricingTermOrder(db, contractId);
      return idList;
    },
    updateAppliedOrder: async (_, { updatePricingTermList }, { db }) => {
      const [[contractId]] = await db.transaction(trx => {
        const queries = [];
        updatePricingTermList.forEach(term => {
          const query = db('pricingterm')
            .where('id', term.id)
            .update(
              {
                sequence: term.appliedOrder
              },
              'contractcontainerid'
            )
            .transacting(trx);
          queries.push(query);
        });
        Promise.all(queries)
          .then(trx.commit)
          .catch(trx.rollback);
      });
      return await getPricingTermList(db, parseInt(contractId));
    }
  }
};

const getPricingTermList = async (db, contractId) =>
  await db('pricingterm as p')
    .select({
      id: 'p.id',
      contractOrder: 'p.readorder',
      appliedOrder: 'p.sequence',
      name: 'p.name',
      effectiveFrom: 'c.effectivefrom',
      effectiveTo: 'c.effectiveto',
      qc: 'p.qc',
      discountCount: db.raw(
        '(SELECT COUNT(*) from discount as d where d.pricingtermid = p.id and d.isdeleted = false)'
      ),
      ignore: 'p.ignore',
      noteImportant: db.raw('COALESCE(n.important, FALSE)'),
      noteContent: db.raw(
        'CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = n.id) = 0 THEN FALSE else TRUE END'
      ),
      discountNoteCount: db.raw(`
        (SELECT COUNT (
          notecount != 0 OR NULL
        )
        FROM (
          SELECT (
            SELECT COUNT ( * ) FROM usernote WHERE discount.notesid = usernote.parentnoteid
          ) as notecount
          FROM discount WHERE pricingtermid = p.id AND isdeleted = FALSE
        ) as count)`),
      pointOfOriginList: db.raw(
        'ARRAY_REMOVE(ARRAY_AGG(DISTINCT po.countrycode), NULL)'
      ),
      pointOfSaleList: db.raw(
        'ARRAY_REMOVE(ARRAY_AGG(DISTINCT ps.countrycode), NULL)'
      ),
      airlineList: db.raw(
        'ARRAY_REMOVE(ARRAY_AGG(DISTINCT cr.carriercode), NULL)'
      )
    })
    .leftJoin('contractcontainer as c', 'c.id', contractId)
    .leftJoin('rulescontainer as r', 'c.guidref', 'r.guidref')
    .leftJoin('pointoforigin as po', 'r.guidref', 'po.rulescontainerguidref')
    .leftJoin('pointofsale as ps', 'r.guidref', 'ps.rulescontainerguidref')
    .leftJoin('carrierrule as cr', 'r.guidref', 'cr.rulescontainerguidref')
    .leftJoin('usernote as n', 'p.notesid', 'n.id')
    .where('p.isdeleted', false)
    .andWhere('p.contractcontainerid', contractId)
    .groupBy('p.id', 'c.id', 'n.important', 'n.id');

const getPricingTerm = async (db, id) => {
  const [pricingTerm] = await db('pricingterm as p')
    .select({
      id: 'p.id',
      contractOrder: 'p.readorder',
      appliedOrder: 'p.sequence',
      name: 'p.name',
      effectiveFrom: 'c.effectivefrom',
      effectiveTo: 'c.effectiveto',
      qc: 'p.qc',
      discountCount: db.raw(
        '(SELECT COUNT(*) from discount as d where d.pricingtermid = p.id and d.isdeleted = false)'
      ),
      ignore: 'p.ignore',
      noteImportant: db.raw('COALESCE(n.important, FALSE)'),
      noteContent: db.raw(
        'CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = n.id) = 0 THEN FALSE else TRUE END'
      ),
      discountNoteCount: db.raw(`
        (SELECT COUNT (
          notecount != 0 OR NULL
        )
        FROM (
          SELECT (
            SELECT COUNT ( * ) FROM usernote WHERE discount.notesid = usernote.parentnoteid
          ) as notecount
          FROM discount WHERE pricingtermid = p.id AND isdeleted = FALSE
        ) as count)`),
      pointOfOriginList: db.raw(
        'ARRAY_REMOVE(ARRAY_AGG(DISTINCT po.countrycode), NULL)'
      ),
      pointOfSaleList: db.raw(
        'ARRAY_REMOVE(ARRAY_AGG(DISTINCT ps.countrycode), NULL)'
      ),
      airlineList: db.raw(
        'ARRAY_REMOVE(ARRAY_AGG(DISTINCT cr.carriercode), NULL)'
      )
    })
    .leftJoin('contractcontainer as c', 'c.id', 'p.contractcontainerid')
    .leftJoin('rulescontainer as r', 'c.guidref', 'r.guidref')
    .leftJoin('pointoforigin as po', 'r.guidref', 'po.rulescontainerguidref')
    .leftJoin('pointofsale as ps', 'r.guidref', 'ps.rulescontainerguidref')
    .leftJoin('carrierrule as cr', 'r.guidref', 'cr.rulescontainerguidref')
    .leftJoin('usernote as n', 'p.notesid', 'n.id')
    .where('p.isdeleted', false)
    .andWhere('p.id', id)
    .groupBy('p.id', 'c.id', 'n.important', 'n.id');
  return pricingTerm;
};

const updatePricingTermOrder = async (db, contractId) => {
  await db.raw(`SELECT pricingterm_update_sequence(${contractId})`);
};
