export const client = `
type Client {
  id: Int
  name: String
  gcn: String
}

extend type Query {
  clientList: [Client] @auth
}
`;
