const { ApolloError } = require('apollo-server-lambda');
const uuidv4 = require('uuid/v4');
const { contractList, contractTypeList } = require('../../../data');

exports.contract = {
  Query: {
    contractList: async (_, __, { db }) => await getContracts(db),
    contractTypeList: async (_, __, { db }) => {
      return await db('contractcontainer')
        .select({
          id: 'lov_lookup.id',
          name: 'lov_lookup.name_val'
        })
        .leftJoin(
          'lov_lookup',
          'contractcontainer.contracttype',
          'lov_lookup.id'
        )
        .distinct('lov_lookup.id');
    },
    divisionTypeList: async (_, __, { db }) => {
      return await db('division')
        .select({
          id: 'division.id',
          name: 'division.name'
        })
        .innerJoin(
          'contractcontainer',
          'contractcontainer.clientid',
          'division.clientid'
        )
        .distinct('division.id')
        .where('division.isdeleted', false);
    }
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
      const result = await db('contractcontainer').insert(
        {
          guidref: uuidv4(),
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
        ['id', 'guidref']
      );
      const { id, guidref } = result[0];
      const contract = await getContracts(db, guidref);
      await db('contractdivision').insert({
        contractid: id,
        divisionid: divisionId
      });
      return contract[0];
    },
    copyContract: (_, { id, name }) => {
      const contract = contractList.filter(c => c.id === id)[0];
      if (!contract) {
        throw new ApolloError('Contract not found', 400);
      }
      const maxId = Math.max(...contractList.map(contract => contract.id)) + 1;
      const copyContract = {
        ...contract,
        id: maxId,
        name
      };
      contractList.push(copyContract);
      return copyContract;
    },
    editContract: (
      _,
      {
        id,
        name,
        typeId,
        round,
        effectiveStartDate,
        effectiveEndDate,
        division,
        description
      }
    ) => {
      const contract = contractList.filter(c => c.id === id)[0];
      if (!contract) {
        throw new ApolloError('Contract not found', 400);
      }
      const type = contractTypeList.filter(type => type.id === typeId)[0];
      contract.name = name;
      contract.type = type;
      contract.round = round;
      contract.effectiveStartDate = new Date(effectiveStartDate);
      contract.effectiveEndDate = effectiveEndDate
        ? new Date(effectiveEndDate)
        : new Date(253402232400000);
      contract.division = division;
      contract.description = description;
      return contract;
    },
    deleteContract: (_, { id }) => {
      const contract = contractList.filter(c => c.id === id)[0];
      if (!contract) {
        throw new ApolloError('Contract not found', 400);
      }
      contract.isDeleted = true;
      return id;
    }
  }
};

const getContracts = async (db, guidref) => {
  const dbContractList = await getContractList(db, guidref);
  const pointOfSaleList = await getPointOfSaleList(db, guidref);
  const pointOfOriginList = await getPointOfOriginList(db, guidref);
  const airlineList = await getAirlineList(db, guidref);
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

const getContractList = async (db, guidref = null) =>
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
      division: 'division.name'
    })
    .leftJoin('lov_lookup', 'contractcontainer.contracttype', 'lov_lookup.id')
    .leftJoin(
      'contractdivision',
      'contractcontainer.id',
      'contractdivision.contractid'
    )
    .leftJoin('division', 'contractdivision.divisionid', 'division.id')
    .whereRaw(
      'contractcontainer.isdeleted = false and (?::uuid is null or contractcontainer.guidref = ?)',
      [guidref, guidref]
    );

const getPointOfSaleList = async (db, guidref = null) =>
  await db('contractcontainer')
    .select({
      id: 'contractcontainer.id',
      pointOfSaleList: db.raw(
        'ARRAY_AGG(pointofsale.countrycode) filter (where pointofsale.countrycode is not null) '
      )
    })
    .leftJoin(
      'rulescontainer',
      'contractcontainer.id',
      'rulescontainer.contractcontainerid'
    )
    .leftJoin(
      'pointofsale',
      'rulescontainer.guidref',
      'pointofsale.rulescontainerguidref'
    )
    .groupBy('contractcontainer.id')
    .whereRaw(
      'contractcontainer.isdeleted = false and (?::uuid is null or contractcontainer.guidref = ?)',
      [guidref, guidref]
    );

const getPointOfOriginList = async (db, guidref = null) =>
  await db('contractcontainer')
    .select({
      id: 'contractcontainer.id',
      pointOfOriginList: db.raw(
        'ARRAY_AGG(pointoforigin.countrycode) filter (where pointoforigin.countrycode is not null)'
      )
    })
    .leftJoin(
      'rulescontainer',
      'contractcontainer.id',
      'rulescontainer.contractcontainerid'
    )
    .leftJoin(
      'pointoforigin',
      'rulescontainer.guidref',
      'pointoforigin.rulescontainerguidref'
    )
    .groupBy('contractcontainer.id')
    .whereRaw(
      'contractcontainer.isdeleted = false and (?::uuid is null or contractcontainer.guidref = ?)',
      [guidref, guidref]
    );

const getAirlineList = async (db, guidref = null) =>
  await db('contractcontainer')
    .select({
      id: 'contractcontainer.id',
      airlineList: db.raw(
        'ARRAY_AGG(pointoforigin.countrycode) filter (where pointoforigin.countrycode is not null)'
      )
    })
    .leftJoin(
      'rulescontainer',
      'contractcontainer.id',
      'rulescontainer.contractcontainerid'
    )
    .leftJoin(
      'pointoforigin',
      'rulescontainer.guidref',
      'pointoforigin.rulescontainerguidref'
    )
    .groupBy('contractcontainer.id')
    .whereRaw(
      'contractcontainer.isdeleted = false and (?::uuid is null or contractcontainer.guidref = ?)',
      [guidref, guidref]
    );
