exports.project = `
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
  projectTypeName: String,
  savingsTypeId: Int,
  savingsTypeName: String,
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
 currencyId: Int,
 currencyName: String,
 distanceUnitId: Int,
 distanceUnitName: String,
  progress: String,
  favorite: Boolean,
}

type ProjectType {
  id: Int,
  name: String
}

type SavingsType {
  id: Int,
  name: String
}

extend type Query {
  projectList(clientId: Int): [Project] @auth
  projectTypeList: [ProjectType]
  savingsTypeList: [SavingsType]
}

extend type Mutation {
  addProject(
    clientId: Int!,
    clientName: String!,
    projectTypeId: Int!,
    projectTypeName: String!,
    savingsTypeId: Int!,
    effectiveFrom: Date!,
    effectiveTo: Date!,
    reportFrom: Date!,
    reportTo: Date!,
    description: String,
    projectManagerId: Int!,
    leadAnalystId: Int!,
    dataSpecialistId: Int!,
    currencyId: Int!,
    distanceUnitId: Int!,
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
    currencyId: Int!,
    distanceUnitId: Int!
  ): Project @auth
  deleteProject(
    id: Int!
  ): Int @auth
  toggleFavoriteProject(
    id: Int!
  ): Project @auth
}
`;
