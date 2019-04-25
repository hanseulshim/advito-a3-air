exports.user = {
  queries: {
    name: 'User Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
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
    }`
  }
};
