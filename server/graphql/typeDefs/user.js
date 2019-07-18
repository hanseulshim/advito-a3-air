exports.user = `
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

extend type Query {
  userList(clientId: Int): [User] @auth
  user: User @auth
  projectManagerList(clientId: Int): [ProjectManagerUser] @auth
  leadAnalystList(clientId: Int): [LeadAnalystUser] @auth
  dataSpecialistList(clientId: Int): [DataSpecialistUser] @auth
}
`;
