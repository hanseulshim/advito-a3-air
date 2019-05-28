const uuidv4 = require('uuid/v4');

exports.note = {
  Query: {
    noteList: async (_, { parentId }, { db }) =>
      parentId ? await getNoteList(db, parentId) : []
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
              important: false,
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
      await db(parentTable)
        .update({
          notesid: parentNoteId
        })
        .where('id', parentId);
      const [note] = await getNoteList(db, parentId, id);
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
      const [note] = await getNoteList(db, parentId, noteId);
      return note;
    },
    deleteNote: async (_, { noteId }, { db }) => {
      await db('usernote')
        .where('id', noteId)
        .del();
      return noteId;
    }
  }
};

const getNoteList = async (db, parentId, id = null) =>
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
      'parentnoteid = (SELECT id from usernote where parentid = ?) and (?::uuid is null or u.id = ?)',
      [parentId, id, id]
    )
    .orderBy('lastUpdate', 'desc');

const updateNoteStatus = async (db, user, parentId, parentTable, important) => {
  const [parentNote] = await db('usernote')
    .select('*')
    .where('parentid', parentId);
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
  return parentNoteId;
};
