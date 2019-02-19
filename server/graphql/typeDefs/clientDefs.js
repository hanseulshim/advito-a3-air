exports.clientDefs = `
type Client {
  id: Int,
  name: String,
}
`;

exports.clientQuery = `
clientList(clientId: Int!, sessionToken: String!): [Client]
`;
