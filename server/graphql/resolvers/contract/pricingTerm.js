const { ApolloError } = require('apollo-server-lambda');
const { pricingTermList, userList, discountList } = require('../../../data');
const { updatePricingTermCount } = require('./contract');

exports.pricingTerm = {
  Query: {
    pricingTermList: async (_, { contractId }, { db }) =>
      contractId ? await getPricingTerms(db, contractId) : []
  },
  Mutation: {
    createPricingTerm: async (_, { contractId, name, ignore }, { db }) => {
      const [{ maxAppliedOrder }] = await db('pricingterm')
        .max({ maxAppliedOrder: 'sequence' })
        .where('contractcontainerid', contractId);
      const [{ maxContractOrder }] = await db('pricingterm')
        .max({ maxContractOrder: 'readorder' })
        .where('contractcontainerid', contractId);
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
      const [pricingTerm] = await getPricingTerms(db, contractId, id);
      return pricingTerm;
    },
    copyPricingTerm: (_, { id, name, ignore }) => {
      const pricingTerm = pricingTermList.filter(term => term.id === id)[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      const maxId = Math.max(...pricingTermList.map(term => term.id)) + 1;
      const maxContractOrder =
        Math.max(...pricingTermList.map(term => term.id)) + 1;
      const maxAppliedOrder =
        Math.max(...pricingTermList.map(term => term.id)) + 1;
      const filterDiscountList = discountList.filter(
        d => d.pricingTermId === id
      );
      filterDiscountList.forEach(discount => {
        const maxId = Math.max(...discountList.map(d => d.id)) + 1;
        const copyDiscount = {
          ...discount,
          id: maxId,
          pricingTermId: id
        };
        discountList.push(copyDiscount);
      });
      const copyPricingTerm = {
        ...pricingTerm,
        id: maxId,
        contractOrder: maxContractOrder,
        appliedOrder: maxAppliedOrder,
        discountTotal: filterDiscountList.length,
        name,
        ignore
      };
      pricingTermList.push(copyPricingTerm);
      return copyPricingTerm;
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
      const [pricingTerm] = await getPricingTerms(db, parseInt(contractId), id);
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
      const [pricingTerm] = await getPricingTerms(db, parseInt(contractId), id);
      return pricingTerm;
    },
    deletePricingTerms: async (_, { contractId, idList }, { db }) => {
      await db('pricingterm')
        .update({ isdeleted: true })
        .whereIn('id', idList);
      await updatePricingTermCount(db, contractId);
      return idList;
    },
    saveNote: (_, { id, important, message, assigneeId, noteId }, { user }) => {
      const pricingTerm = pricingTermList.filter(term => term.id === id)[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      const assignee = userList.filter(user => user.id === assigneeId)[0];
      const note =
        pricingTerm.note === null
          ? {
              important: false,
              noteList: []
            }
          : pricingTerm.note;
      note.important = important;
      if (message) {
        if (noteId) {
          const noteContent = note.noteList.filter(n => n.id === noteId)[0];
          noteContent.message = message;
          noteContent.date = new Date();
          noteContent.assignee = assignee;
        } else {
          const content = {
            id: new Date().getUTCMilliseconds(),
            author: user,
            date: new Date(),
            assignee,
            message
          };
          note.noteList.push(content);
        }
      }
      pricingTerm.note = note;
      return note;
    },
    deleteNote: (_, { id, noteId }) => {
      const pricingTerm = pricingTermList.filter(term => term.id === id)[0];
      if (!pricingTerm) {
        throw new ApolloError('Pricing Term not found', 400);
      }
      const noteIndex = pricingTerm.note.noteList.findIndex(
        n => n.id === noteId
      );
      pricingTerm.note.noteList.splice(noteIndex, 1);
      return pricingTerm.note;
    },
    updateAppliedOrder: (_, { updatePricingTermList }) => {
      updatePricingTermList.forEach(term => {
        const pricingTerm = pricingTermList.filter(t => t.id === term.id)[0];
        pricingTerm.appliedOrder = term.appliedOrder;
      });
      return pricingTermList;
    }
  }
};

const getPricingTerms = async (db, contractId = null, id = null) => {
  const dbPricingTermList = await getPricingTermList(db, contractId, id);
  const pointOfSaleList = await getPointOfSaleList(db, contractId, id);
  const pointOfOriginList = await getPointOfOriginList(db, contractId, id);
  const airlineList = await getAirlineList(db, contractId, id);
  const noteStatusList = await getNoteStatus(db, contractId, id);
  return dbPricingTermList.map(pricingTerm => {
    const pointOfSale = pointOfSaleList.filter(p => p.id === pricingTerm.id)[0]
      .pointOfSaleList;
    const pointOfOrigin = pointOfOriginList.filter(
      p => p.id === pricingTerm.id
    )[0].pointOfOriginList;
    const airline = airlineList.filter(p => p.id === pricingTerm.id)[0]
      .airlineList;
    const note = noteStatusList.filter(n => n.parentId === pricingTerm.id)[0];
    return {
      ...pricingTerm,
      pointOfSaleList: pointOfSale ? pointOfSale : [],
      pointOfOriginList: pointOfOrigin ? pointOfOrigin : [],
      airlineList: airline ? airline : [],
      noteImportant: note ? note.important : false,
      noteContent: note ? note.noteContent : false
    };
  });
};

const getPricingTermList = async (db, contractId, id) =>
  await db('pricingterm')
    .select({
      id: 'pricingterm.id',
      contractOrder: 'pricingterm.readorder',
      appliedOrder: 'pricingterm.sequence',
      name: 'pricingterm.name',
      effectiveFrom: 'contractcontainer.effectivefrom',
      effectiveTo: 'contractcontainer.effectiveto',
      qc: 'pricingterm.qc',
      discountTotal: 'pricingterm.count_discounts',
      ignore: 'pricingterm.ignore'
    })
    .leftJoin('contractcontainer', 'contractcontainer.id', contractId)
    .whereRaw(
      'pricingterm.isdeleted = false and (?::bigint is null or pricingterm.contractcontainerid = ?) and (?::bigint is null or pricingterm.id = ?)',
      [contractId, contractId, id, id]
    );

const getPointOfOriginList = async (db, contractId, id) =>
  await db('pricingterm')
    .select({
      id: 'pricingterm.id',
      pointOfOriginList: db.raw(
        'ARRAY_AGG(pointoforigin.countrycode) filter (where pointoforigin.countrycode is not null)'
      )
    })
    .leftJoin(
      'rulescontainer',
      'pricingterm.rulescontainerguidref',
      'rulescontainer.guidref'
    )
    .leftJoin(
      'pointoforigin',
      'rulescontainer.guidref',
      'pointoforigin.rulescontainerguidref'
    )
    .groupBy('pricingterm.id')
    .whereRaw(
      'pricingterm.isdeleted = false and (?::bigint is null or pricingterm.contractcontainerid = ?) and (?::bigint is null or pricingterm.id = ?)',
      [contractId, contractId, id, id]
    );

const getPointOfSaleList = async (db, contractId, id) =>
  await db('pricingterm')
    .select({
      id: 'pricingterm.id',
      pointOfSaleList: db.raw(
        'ARRAY_AGG(pointofsale.countrycode) filter (where pointofsale.countrycode is not null)'
      )
    })
    .leftJoin(
      'rulescontainer',
      'pricingterm.rulescontainerguidref',
      'rulescontainer.guidref'
    )
    .leftJoin(
      'pointofsale',
      'rulescontainer.guidref',
      'pointofsale.rulescontainerguidref'
    )
    .groupBy('pricingterm.id')
    .whereRaw(
      'pricingterm.isdeleted = false and (?::bigint is null or pricingterm.contractcontainerid = ?) and (?::bigint is null or pricingterm.id = ?)',
      [contractId, contractId, id, id]
    );

const getAirlineList = async (db, contractId, id) =>
  await db('pricingterm')
    .select({
      id: 'pricingterm.id',
      airlineList: db.raw(
        'ARRAY_AGG(carrierrule.carriercode) filter (where carrierrule.carriercode is not null)'
      )
    })
    .leftJoin(
      'rulescontainer',
      'pricingterm.rulescontainerguidref',
      'rulescontainer.guidref'
    )
    .leftJoin(
      'carrierrule',
      'rulescontainer.guidref',
      'carrierrule.rulescontainerguidref'
    )
    .groupBy('pricingterm.id')
    .whereRaw(
      'pricingterm.isdeleted = false and (?::bigint is null or pricingterm.contractcontainerid = ?) and (?::bigint is null or pricingterm.id = ?)',
      [contractId, contractId, id, id]
    );

const getNoteStatus = async (db, contractId, id) => {
  const note = await db('pricingterm')
    .select({
      id: 'usernote.id',
      parentId: 'usernote.parentid',
      important: 'usernote.important'
    })
    .leftJoin('usernote', 'usernote.id', 'pricingterm.notesid')
    .whereRaw(
      'pricingterm.isdeleted = false and (?::bigint is null or pricingterm.contractcontainerid = ?) and (?::bigint is null or pricingterm.id = ?)',
      [contractId, contractId, id, id]
    );

  return await Promise.all(
    note.map(async parentNote => {
      const [{ count }] = parentNote.id
        ? await db('usernote')
            .count('id')
            .where('parentnoteid', parentNote.id)
        : [{ count: null }];
      parentNote.noteContent = count ? !!parseInt(count) : null;
      return parentNote;
    })
  );
};

const getNote = async (db, contractId, id) => {
  const note = await db('pricingterm')
    .select({
      id: 'usernote.id',
      important: 'usernote.important',
      parentId: 'usernote.parentid',
      parentTable: 'usernote.parenttable'
    })
    .leftJoin('usernote', 'usernote.id', 'pricingterm.notesid')
    .whereRaw(
      'pricingterm.isdeleted = false and (?::bigint is null or pricingterm.contractcontainerid = ?) and (?::bigint is null or pricingterm.id = ?)',
      [contractId, contractId, id, id]
    );
  return await Promise.all(
    note.map(async parentNote => {
      const noteList = parentNote.id
        ? await db('usernote')
            .select({
              id: 'id',
              text: 'text',
              lastUpdate: 'lastupdate',
              assigneeId: 'assignee',
              assignedToId: 'assignedto'
            })
            .where('parentnoteid', parentNote.id)
        : null;
      if (noteList) {
        noteList.forEach(async content => {
          const [assignee] = await db
            .select({
              firstName: 'name_first',
              lastName: 'name_last'
            })
            .from('blops.advito_user')
            .where('id', content.assigneeId);
          const [assignedTo] = await db
            .select('*')
            .from('blops.advito_user')
            .where('id', content.assignedToId);
          content.assigneeName = `${assignee.firstName} ${assignee.lastName}`;
          content.assignedToName = `${assignedTo.firstName} ${
            assignedTo.lastName
          }`;
        });
        parentNote.noteList = noteList;
      }
      return parentNote;
    })
  );
};
