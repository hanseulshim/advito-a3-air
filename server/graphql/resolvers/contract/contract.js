const CONTRACT_TYPE = 2;
//TODO: REPLACE HARD CODED CLIENT ID WITH REAL ONE WHEN CLIENT IS HOOKED UP
const CLIENT_ID = 1;

exports.contract = {
  Query: {
    contractList: async (_, { id }, { db }) => await getContractList(db, id),
    contractTypeList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', CONTRACT_TYPE),
    divisionTypeList: async (_, __, { db }) =>
      await db('division')
        .select({
          id: 'division.id',
          name: 'division.name'
        })
        .distinct('division.id')
        .where('division.isdeleted', false)
        .andWhere('division.clientid', CLIENT_ID)
  },
  Mutation: {
    createContract: async (
      _,
      {
        name,
        typeId,
        round,
        effectiveFrom,
        effectiveTo,
        divisionId,
        description
      },
      { db }
    ) => {
      const [id] = await db('contractcontainer').insert(
        {
          name,
          contracttype: typeId,
          round,
          effectivefrom: new Date(effectiveFrom),
          effectiveto: effectiveTo
            ? new Date(effectiveTo)
            : new Date(253402232400000),
          description,
          qc: 0
        },
        'id'
      );
      if (divisionId) {
        await db('contractdivision').insert({
          contractid: id,
          divisionid: divisionId
        });
      }
      const [contract] = await getContractList(db, id);
      return contract;
    },
    copyContract: async (_, { id, name }, { db }) => {
      const { rows } = await db.raw(
        `SELECT contract_createcopy(${id}, '${name}')`
      );
      const [copyContract] = rows;
      const [contract] = await getContractList(
        db,
        copyContract.contract_createcopy
      );
      return contract;
    },
    editContract: async (
      _,
      {
        id,
        name,
        typeId,
        round,
        effectiveFrom,
        effectiveTo,
        divisionId,
        description
      },
      { db }
    ) => {
      await db('contractcontainer')
        .where('id', id)
        .update({
          contracttype: typeId,
          name,
          round,
          effectivefrom: new Date(effectiveFrom),
          effectiveto: effectiveTo
            ? new Date(effectiveTo)
            : new Date(253402232400000),
          description
        });
      if (divisionId) {
        await db('contractdivision')
          .where('contractid', id)
          .update({ divisionid: divisionId });
      }
      const [contract] = await getContractList(db, id);
      return contract;
    },
    deleteContract: async (_, { id }, { db }) =>
      parseInt(
        await db('contractcontainer')
          .where('id', id)
          .update(
            {
              isdeleted: true
            },
            'id'
          )
      )
  }
};

const getContractList = async (db, id = null) =>
  await db('contractcontainer as c')
    .select({
      id: 'c.id',
      name: 'c.name',
      typeId: 'l.id',
      typeName: 'l.name_val',
      description: 'c.description',
      round: 'c.round',
      effectiveFrom: 'c.effectivefrom',
      effectiveTo: 'c.effectiveto',
      qc: 'c.qc',
      pricingTermCount: 'c.count_priterms',
      targetTermCount: 'c.count_targterms',
      divisionId: 'd.id',
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
    .leftJoin('lov_lookup as l', 'c.contracttype', 'l.id')
    .leftJoin('contractdivision as cd', 'c.id', 'cd.contractid')
    .leftJoin('division as d', 'cd.divisionid', 'd.id')
    .leftJoin('rulescontainer as r', 'c.guidref', 'r.guidref')
    .leftJoin('pointoforigin as po', 'r.guidref', 'po.rulescontainerguidref')
    .leftJoin('pointofsale as ps', 'r.guidref', 'ps.rulescontainerguidref')
    .leftJoin('carrierrule as cr', 'r.guidref', 'cr.rulescontainerguidref')
    .whereRaw('c.isdeleted = false and (?::bigint is null or c.id = ?)', [
      id,
      id
    ])
    .groupBy('c.id', 'l.id', 'd.id');
