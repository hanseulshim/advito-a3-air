export const user = `
type User {
  id: Int
  name: String
  email: String
}

type ProjectManagerUser {
  id: Int,
  name: String,
  email: String
}

type LeadAnalystUser {
  id: Int,
  name: String,
  email: String
}

type DataSpecialistUser {
  id: Int,
  name: String,
  email: String
}

type Login {
  id: Int
  displayName: String
  clientId: Int
  profilePicturePath: String
  sessionToken: String
  roleIds: [Int]
}

extend type Query {
  userList(clientId: Int): [User] @auth
  user: User @auth
  projectManagerList(clientId: Int): [ProjectManagerUser] @auth
  leadAnalystList(clientId: Int): [LeadAnalystUser] @auth
  dataSpecialistList(clientId: Int): [DataSpecialistUser] @auth
}

extend type Mutation {
  login(username: String!, password: String!): Login
  logout(sessionToken: String!): Boolean
  sendResetPasswordEmail(appId: Int!, email: String!): String
  resetPassword(token: String!, password: String!, confirmPassword: String!): Boolean
}
`;
