const uuidv4 = require('uuid/v4');

exports.note = {
  Query: {
    noteList: async (_, { parentId, parentTable }, { db }) =>
      parentId ? await getNoteList(db, parentId, parentTable) : []
  },
  Mutation: {
    addNote: async (
      _,
      { parentId, parentTable, important, text, assignedToId },
      { db, user }
    ) => {
      const parentNoteId = await updateNoteStatus(
        db,
        user,
        parentId,
        parentTable,
        important
      );
      const [id] = text
        ? await db('usernote').insert(
            {
              id: uuidv4(),
              text,
              important,
              lastupdate: new Date(),
              lastupdatedby: user.id,
              assignee: user.id,
              assignedto: assignedToId,
              parentnoteid: parentNoteId
            },
            'id'
          )
        : [null];
      if (!id) return null;
      if (parentTable === 'discount') {
        await updateNoteCount(db, parentId);
      }
      const [note] = await getNote(db, id);
      return note;
    },
    editNote: async (
      _,
      { parentId, parentTable, important, text, assignedToId, noteId },
      { db, user }
    ) => {
      await updateNoteStatus(db, user, parentId, parentTable, important);
      await db('usernote')
        .update({
          text,
          assignedto: assignedToId
        })
        .where('id', noteId);
      const [note] = await getNote(db, noteId);
      return note;
    },
    deleteNote: async (
      _,
      { parentId, parentTable, resetImportant, noteId, important },
      { db, user }
    ) => {
      const [note] = await db('usernote as n')
        .select({
          parentId: 'n1.parentid',
          parentTable: 'n1.parenttable'
        })
        .leftJoin('usernote as n1', 'n.parentnoteid', 'n1.id')
        .where('n.id', noteId);
      await db('usernote')
        .where('id', noteId)
        .del();
      if (note.parentTable === 'discount') {
        await updateNoteCount(db, parseInt(note.parentId));
      }
      if (resetImportant) {
        await updateNoteStatus(db, user, parentId, parentTable, important);
      }
      return noteId;
    }
  }
};

const getNoteList = async (db, parentId, parentTable) =>
  await db('usernote as u')
    .select({
      id: 'u.id',
      text: 'u.text',
      lastUpdate: 'u.lastupdate',
      assigneeId: 'u.assignee',
      assigneeName: db.raw("CONCAT(b1.name_first, ' ', b1.name_last)"),
      assignedToId: 'u.assignedto',
      assignedToName: db.raw("CONCAT(b2.name_first, ' ', b2.name_last)")
    })
    .innerJoin('blops.advito_user as b1', 'u.assignee', 'b1.id')
    .innerJoin('blops.advito_user as b2', 'u.assignedto', 'b2.id')
    .whereRaw(
      'parentnoteid = (SELECT id from usernote where parentid = ? and parenttable = ?)',
      [parentId, parentTable]
    )
    .orderBy('lastUpdate', 'desc');

const getNote = async (db, id) =>
  await db('usernote as u')
    .select({
      id: 'u.id',
      text: 'u.text',
      lastUpdate: 'u.lastupdate',
      assigneeId: 'u.assignee',
      assigneeName: db.raw("CONCAT(b1.name_first, ' ', b1.name_last)"),
      assignedToId: 'u.assignedto',
      assignedToName: db.raw("CONCAT(b2.name_first, ' ', b2.name_last)")
    })
    .innerJoin('blops.advito_user as b1', 'u.assignee', 'b1.id')
    .innerJoin('blops.advito_user as b2', 'u.assignedto', 'b2.id')
    .where('u.id', id);

const updateNoteStatus = async (db, user, parentId, parentTable, important) => {
  const [parentNote] = await db('usernote')
    .select('*')
    .where('parentid', parentId)
    .andWhere('parenttable', parentTable);
  const [parentNoteId] = parentNote
    ? await db('usernote')
        .update({ important }, 'id')
        .where('parentid', parentId)
    : await db('usernote').insert(
        {
          id: uuidv4(),
          text: '',
          important,
          lastupdate: new Date(),
          lastupdatedby: user.id,
          parentid: parentId,
          parenttable: parentTable
        },
        'id'
      );
  if (!parentNote) {
    await db(parentTable)
      .update({
        notesid: parentNoteId
      })
      .where('id', parentId);
  }
  return parentNoteId;
};

const updateNoteCount = async (db, discountId) => {
  const [discount] = await db('discount')
    .select({ pricingTermId: 'pricingtermid' })
    .where('id', discountId);
  const noteCountList = await db('discount as d')
    .select({
      count: db.raw(
        '(SELECT COUNT(*) FROM usernote n1 WHERE n1.parentnoteid = n.id)'
      )
    })
    .leftJoin('usernote as n', 'd.notesid', 'n.id')
    .where('d.isdeleted', false)
    .where('d.pricingtermid', discount.pricingTermId);
  const count_discountnotes = noteCountList.filter(c => parseInt(c.count))
    .length;
  await db('pricingterm')
    .update({ count_discountnotes })
    .where('id', discount.pricingTermId);
};

exports.updateNoteCount = updateNoteCount;
