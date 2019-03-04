exports.client = {
  name: 'Client Queries',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'advitoValidToken' },
  query: `
  {
    clientList {
      id
      name
    }
  }`
};
