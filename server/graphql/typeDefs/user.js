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
  userList: [User] @auth
  user: User @auth
  projectManagerList: [ProjectManagerUser] @auth
  leadAnalystList: [LeadAnalystUser] @auth
  dataSpecialistList: [DataSpecialistUser] @auth
}
`;
