exports.client = `
type Client {
  id: Int,
  name: String,
}

extend type Query {
  clientList: [Client] @auth
}
`;
