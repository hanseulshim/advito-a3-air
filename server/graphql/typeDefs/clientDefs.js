exports.clientDefs = `
type Client {
  id: Int,
  name: String,
}
`;

exports.clientQuery = `
getClients(clientId: Int!, sessionToken: String!): [Client]
`;
