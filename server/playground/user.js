export default {
  queries: {
    name: 'User Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      userList(clientId: null) {
        id
        name
        email
      }
      user {
        id
        name
        email
      }
      projectManagerList(clientId: null) {
        id
        name
        email
      }
      leadAnalystList(clientId: null) {
        id
        name
        email
      }
      dataSpecialistList(clientId: null) {
        id
        name
        email
      }
    }`
  }
};
