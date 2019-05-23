const CONTRACT_TYPE = 2;
//TODO: REPLACE HARD CODED CLIENT ID WITH REAL ONE WHEN CLIENT IS HOOKED UP
const CLIENT_ID = 1;

exports.contract = {
  Query: {
    contractList: async (_, __, { db }) => await getContracts(db),
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
      const [contract] = await getContracts(db, id);
      return contract;
    },
    copyContract: async (_, { id, name }, { db }) => {
      const { rows } = await db.raw(
        `SELECT contract_createcopy(${id}, '${name}')`
      );
      const [copyContract] = rows;
      const [contract] = await getContracts(
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
      const [contract] = await getContracts(db, id);
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

const getContracts = async (db, id = null) => {
  const dbContractList = await getContractList(db, id);
  const pointOfSaleList = await getPointOfSaleList(db, id);
  const pointOfOriginList = await getPointOfOriginList(db, id);
  const airlineList = await getAirlineList(db, id);
  return dbContractList.map(contract => {
    const pointOfSale = pointOfSaleList.filter(p => p.id === contract.id)[0]
      .pointOfSaleList;
    const pointOfOrigin = pointOfOriginList.filter(p => p.id === contract.id)[0]
      .pointOfOriginList;
    const airline = airlineList.filter(p => p.id === contract.id)[0]
      .airlineList;
    return {
      ...contract,
      pointOfSaleList: pointOfSale ? pointOfSale : [],
      pointOfOriginList: pointOfOrigin ? pointOfOrigin : [],
      airlineList: airline ? airline : []
    };
  });
};

const getContractList = async (db, id) =>
  await db('contractcontainer')
    .select({
      id: 'contractcontainer.id',
      name: 'contractcontainer.name',
      typeId: 'lov_lookup.id',
      typeName: 'lov_lookup.name_val',
      description: 'contractcontainer.description',
      round: 'contractcontainer.round',
      effectiveFrom: 'contractcontainer.effectivefrom',
      effectiveTo: 'contractcontainer.effectiveto',
      qc: 'contractcontainer.qc',
      pricingTermCount: 'contractcontainer.count_priterms',
      targetTermCount: 'contractcontainer.count_targterms',
      divisionId: 'division.id'
    })
    .leftJoin('lov_lookup', 'contractcontainer.contracttype', 'lov_lookup.id')
    .leftJoin(
      'contractdivision',
      'contractcontainer.id',
      'contractdivision.contractid'
    )
    .leftJoin('division', 'contractdivision.divisionid', 'division.id')
    .whereRaw(
      'contractcontainer.isdeleted = false and (?::bigint is null or contractcontainer.id = ?)',
      [id, id]
    );

const getPointOfSaleList = async (db, id) =>
  await db('contractcontainer')
    .select({
      id: 'contractcontainer.id',
      pointOfSaleList: db.raw(
        'ARRAY_AGG(pointofsale.countrycode) filter (where pointofsale.countrycode is not null) '
      )
    })
    .leftJoin(
      'rulescontainer',
      'contractcontainer.guidref',
      'rulescontainer.guidref'
    )
    .leftJoin(
      'pointofsale',
      'rulescontainer.guidref',
      'pointofsale.rulescontainerguidref'
    )
    .groupBy('contractcontainer.id')
    .whereRaw(
      'contractcontainer.isdeleted = false and (?::bigint is null or contractcontainer.id = ?)',
      [id, id]
    );

const getPointOfOriginList = async (db, id) =>
  await db('contractcontainer')
    .select({
      id: 'contractcontainer.id',
      pointOfOriginList: db.raw(
        'ARRAY_AGG(pointoforigin.countrycode) filter (where pointoforigin.countrycode is not null)'
      )
    })
    .leftJoin(
      'rulescontainer',
      'contractcontainer.guidref',
      'rulescontainer.guidref'
    )
    .leftJoin(
      'pointoforigin',
      'rulescontainer.guidref',
      'pointoforigin.rulescontainerguidref'
    )
    .groupBy('contractcontainer.id')
    .whereRaw(
      'contractcontainer.isdeleted = false and (?::bigint is null or contractcontainer.id = ?)',
      [id, id]
    );

const getAirlineList = async (db, id) =>
  await db('contractcontainer')
    .select({
      id: 'contractcontainer.id',
      airlineList: db.raw(
        'ARRAY_AGG(carrierrule.carriercode) filter (where carrierrule.carriercode is not null)'
      )
    })
    .leftJoin(
      'rulescontainer',
      'contractcontainer.guidref',
      'rulescontainer.guidref'
    )
    .leftJoin(
      'carrierrule',
      'rulescontainer.guidref',
      'carrierrule.rulescontainerguidref'
    )
    .groupBy('contractcontainer.id')
    .whereRaw(
      'contractcontainer.isdeleted = false and (?::bigint is null or contractcontainer.id = ?)',
      [id, id]
    );

exports.updatePricingTermCount = async (db, contractId) => {
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
