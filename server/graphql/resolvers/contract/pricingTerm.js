exports.pricingTerm = {
  Query: {
    pricingTermList: async (_, { contractId }, { db }) =>
      contractId ? await getPricingTermList(db, contractId) : [],
    pricingTerm: async (_, { id }, { db }) => await getPricingTerm(db, id)
  },
  Mutation: {
    createPricingTerm: async (_, { contractId, name, ignore }, { db }) => {
      const { rows } = await db.raw(
        `SELECT pricingterm_create(
          '${name}',
          ${contractId},
          ${ignore}
        )`
      );
      const [{ pricingterm_create: id }] = rows;
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
      await db.raw(
        `SELECT pricingterm_update(
          ${id},
          '${name}',
          ${ignore}
        )`
      );
      return await getPricingTerm(db, id);
    },
    togglePricingTermQC: async (_, { contractId, idList }, { db }) => {
      const queries = idList.map(id =>
        db.raw(`
        SELECT pricingterm_toggleqc(${id})
      `)
      );
      await Promise.all(queries);
      return await getPricingTermList(db, contractId);
    },
    deletePricingTerms: async (_, { idList }, { db }) => {
      const queries = idList.map(id =>
        db.raw(`
        SELECT pricingterm_delete(${id})
      `)
      );
      await Promise.all(queries);
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
      effectiveFrom: db.raw(
        '(select _effectivefrom from pricingterm_effectivedate(p.id))'
      ),
      effectiveTo: db.raw(
        '(select _effectiveto from pricingterm_effectivedate(p.id))'
      ),
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
        '(select * from pricingterm_pointoforigin_getlist(p.id))'
      ),
      pointOfSaleList: db.raw(
        '(select * from pricingterm_pointofsale_getlist(p.id))'
      ),
      airlineList: db.raw('(select * from pricingterm_carrier_getlist(p.id))')
    })
    .leftJoin('usernote as n', 'p.notesid', 'n.id')
    .where('p.isdeleted', false)
    .andWhere('p.contractcontainerid', contractId)
    .groupBy('p.id', 'n.important', 'n.id');

const getPricingTerm = async (db, id) => {
  const [pricingTerm] = await db('pricingterm as p')
    .select({
      id: 'p.id',
      contractOrder: 'p.readorder',
      appliedOrder: 'p.sequence',
      name: 'p.name',
      effectiveFrom: db.raw(
        '(select _effectivefrom from pricingterm_effectivedate(p.id))'
      ),
      effectiveTo: db.raw(
        '(select _effectiveto from pricingterm_effectivedate(p.id))'
      ),
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
        '(select * from pricingterm_pointoforigin_getlist(p.id))'
      ),
      pointOfSaleList: db.raw(
        '(select * from pricingterm_pointofsale_getlist(p.id))'
      ),
      airlineList: db.raw('(select * from pricingterm_carrier_getlist(p.id))')
    })
    .leftJoin('usernote as n', 'p.notesid', 'n.id')
    .where('p.isdeleted', false)
    .andWhere('p.id', id)
    .groupBy('p.id', 'n.important', 'n.id');
  return pricingTerm;
};

const updatePricingTermOrder = async (db, contractId) => {
  await db.raw(`SELECT pricingterm_update_sequence(${contractId})`);
};
