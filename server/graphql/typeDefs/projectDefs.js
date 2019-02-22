exports.projectDefs = `
scalar Date

type Project {
  id: Int,
  clientId: Int,
  clientName: String,
  name: String,
  description: String,
  isDeleted: Boolean,
  projectTypeId: Int,
  projectType: String,
  savingsTypeId: Int,
  savingsType: String,
  effectiveFrom: Date,
  effectiveTo: Date,
  projectManagerId: Int,
  projectManagerName: String,
  projectManagerEmail: String,
  leadAnalystId: Int,
  leadAnalystName: String,
  leadAnalystEmail: String,
  dataSpecialistId: Int,
  dataSpecialistName: String,
  dataSpecialistEmail: String,
  progress: String,
  favorite: Boolean,
}

type Success {
  success: Boolean,
  message: String
}
`;
exports.projectQuery = `
projectList(clientId: Int, sessionToken: String!): [Project]
`;
exports.projectMutation = `
addProject(
  sessionToken: String!
  client: String!,
  division: String!,
  projectTypeId: Int!,
  savingsTypeId: Int!,
  effectiveFrom: Date!,
  effectiveTo: Date!,
  description: String,
  projectManagerId: Int!,
  leadAnalystId: Int!,
  dataSpecialistId: Int!,
): Success
editProject(
  sessionToken: String!
  id: Int!
  client: String!,
  division: String!,
  projectTypeId: Int!,
  savingsTypeId: Int!,
  effectiveFrom: Date!,
  effectiveTo: Date!,
  description: String,
  projectManagerId: Int!,
  leadAnalystId: Int!,
  dataSpecialistId: Int!,
): Success
deleteProject(
  sessionToken: String!
  id: Int!
): Success
toggleFavoriteProject(
  sessionToken: String!
  id: Int!
): Success
`;
