export const client = {
  name: 'Client Queries',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'MY^PR3TTYP0NY' },
  query: `
  {
    clientList {
      id
      name
    }
  }`
};
