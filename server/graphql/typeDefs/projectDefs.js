exports.projectDefs = `
scalar Date

type Project {
  id: Int,
  clientId: Int,
  clientName: String,
  name: String,
  description: String,
  division: String,
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

type MutationSuccess {
  message: String
}
`;
exports.projectQuery = `
projectList(clientId: Int): [Project]
`;
exports.projectMutation = `
addProject(
  clientId: Int!,
  division: String!,
  projectTypeId: Int!,
  savingsTypeId: Int!,
  effectiveFrom: Date!,
  effectiveTo: Date!,
  description: String,
  projectManagerId: Int!,
  leadAnalystId: Int!,
  dataSpecialistId: Int!,
): MutationSuccess
editProject(
  id: Int!
  division: String!,
  savingsTypeId: Int!,
  effectiveFrom: Date!,
  effectiveTo: Date!,
  description: String,
  projectManagerId: Int!,
  leadAnalystId: Int!,
  dataSpecialistId: Int!,
): MutationSuccess
deleteProject(
  id: Int!
): MutationSuccess
toggleFavoriteProject(
  id: Int!
): MutationSuccess
`;
