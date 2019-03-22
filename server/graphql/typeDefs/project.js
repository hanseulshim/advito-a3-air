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
  savingsTypeList: [SavingsType]
  projectManagerList: [ProjectManagerUser]
  leadAnalystList: [LeadAnalystUser]
  dataSpecialistList: [DataSpecialistUser]
}

type ProjectType {
  id: Int,
  name: String
}

type SavingsType {
  id: Int,
  name: String
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
  projectList(clientId: Int): [Project] @auth
  projectInfo: ProjectInfo @auth
}

extend type Mutation {
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
  ): Project @auth
}
`;
