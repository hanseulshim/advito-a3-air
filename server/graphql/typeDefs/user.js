exports.user = `
type User {
  id: Int
  name: String
  email: String
}

extend type Query {
  userList: [User] @auth
  user: User @auth
}
`;
