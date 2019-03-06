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
  reportFrom: Date,
  reportTo: Date,
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

type ProjectInfo {
  projectTypeList: [ProjectType]
  savingsTypeList: [ProjectType]
  projectManagerList: [ProjectUser]
  leadAnalystList: [ProjectUser]
  dataSpecialistList: [ProjectUser]
}

type ProjectType {
  id: Int,
  name: String
}

type ProjectUser {
  id: Int,
  name: String,
  email: String
}
`;
exports.projectQuery = `
projectList(clientId: Int): [Project] @auth
projectInfo: ProjectInfo @auth
`;
exports.projectMutation = `
addProject(
  clientId: Int!,
  projectTypeId: Int!,
  savingsTypeId: Int!,
  effectiveFrom: Date!,
  effectiveTo: Date!,
  reportFrom: Date!,
  reportTo: Date!,
  description: String,
  projectManagerId: Int!,
  leadAnalystId: Int!,
  dataSpecialistId: Int!,
): Project @auth
editProject(
  id: Int!
  savingsTypeId: Int!,
  effectiveFrom: Date!,
  effectiveTo: Date!,
  reportFrom: Date!,
  reportTo: Date!,
  description: String,
  projectManagerId: Int!,
  leadAnalystId: Int!,
  dataSpecialistId: Int!,
): Project @auth
deleteProject(
  id: Int!
): Int @auth
toggleFavoriteProject(
  id: Int!
): Int @auth
`;
