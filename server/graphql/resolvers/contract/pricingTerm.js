exports.pricingTerm = {
  Query: {
    pricingTermList: async (_, { contractId, id }, { db }) =>
      contractId ? await getPricingTermList(db, contractId, id) : []
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
          count_discounts: 0,
          ignore
        },
        'id'
      );
      await updatePricingTermCount(db, contractId);
      const [pricingTerm] = await getPricingTermList(db, contractId, id);
      return pricingTerm;
    },
    copyPricingTerm: async (_, { id, name }, { db }) => {
      const { rows } = await db.raw(
        `SELECT pricingterm_createcopy(${id}, '${name}')`
      );
      const [copyPricingTerm] = rows;
      const [pricingTerm] = await getPricingTermList(
        db,
        copyPricingTerm.pricingterm_createcopy
      );
      return pricingTerm;
    },
    editPricingTerm: async (_, { id, name, ignore }, { db }) => {
      const [contractId] = await db('pricingterm')
        .where('id', id)
        .update(
          {
            name,
            ignore
          },
          'contractcontainerid'
        );
      const [pricingTerm] = await getPricingTermList(
        db,
        parseInt(contractId),
        id
      );
      return pricingTerm;
    },
    togglePricingTermQC: async (_, { id }, { db }) => {
      const [contractId] = await db('pricingterm')
        .update(
          {
            qc: db.raw('NOT qc')
          },
          'contractcontainerid'
        )
        .where('id', id);
      const [pricingTerm] = await getPricingTermList(
        db,
        parseInt(contractId),
        id
      );
      return pricingTerm;
    },
    deletePricingTerms: async (_, { contractId, idList }, { db }) => {
      await db('pricingterm')
        .update({ isdeleted: true })
        .whereIn('id', idList);
      await updatePricingTermCount(db, contractId);
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

const getPricingTermList = async (db, contractId, id = null) =>
  await db('pricingterm as p')
    .select({
      id: 'p.id',
      contractOrder: 'p.readorder',
      appliedOrder: 'p.sequence',
      name: 'p.name',
      effectiveFrom: 'c.effectivefrom',
      effectiveTo: 'c.effectiveto',
      qc: 'p.qc',
      discountTotal: 'p.count_discounts',
      ignore: 'p.ignore',
      noteImportant: db.raw('COALESCE(n.important, FALSE)'),
      noteContent: db.raw(
        'CASE WHEN (SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = n.id) = 0 THEN FALSE else TRUE END'
      ),
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
    .whereRaw(
      'p.isdeleted = false and p.contractcontainerid = ? and (?::bigint is null or p.id = ?)',
      [contractId, id, id]
    )
    .groupBy('p.id', 'c.id', 'n.important', 'n.id');

const updatePricingTermCount = async (db, contractId) => {
  const [{ count }] = await db('pricingterm')
    .count('*')
    .where('contractcontainerid', contractId)
    .andWhere('isdeleted', false);
  await db('contractcontainer')
    .update({
      count_priterms: count
    })
    .where('id', contractId);
};
