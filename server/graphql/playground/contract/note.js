const { NOTE } = require('../../constants');

exports.note = {
  queries: {
    name: 'Note Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      noteList(parentId: 49, parentTable: "pricingterm") {
        ${NOTE}
      }
    }`
  },
  mutations: {
    name: 'Note Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      saveNote(
        parentId: 52,
        parentTable: "pricingterm",
        important: true,
        text: "",
        assignedToId: 882,
        noteId: ""
      ) {
        ${NOTE}
      }
      deleteNote(id: 1, noteId: 1) {
        ${NOTE}
      }
    }
    `
  }
};
