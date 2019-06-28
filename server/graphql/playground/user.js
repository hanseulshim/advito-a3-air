exports.user = {
  queries: {
    name: 'User Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      userList {
        id
        name
        email
      }
      user {
        id
        name
        email
      }
      projectManagerList {
        id
        name
        email
      }
      leadAnalystList {
        id
        name
        email
      }
      dataSpecialistList {
        id
        name
        email
      }
    }`
  }
};
