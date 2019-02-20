exports.projectDefs = `
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
  effectiveFrom: String,
  effectiveTo: String,
  projectManagerId: Int,
  projectManagerName: String,
  projectManagerEmail: String,
  leadAnalystId: Int,
  leadAnalystName: String,
  leadAnalystEmail: String,
  dataSpecialistId: Int,
  dataSpecialistName: String,
  dataSpecialistEmail: String,
  favorite: Boolean,
}
`;
exports.projectQuery = `
projectList(clientId: Int!, sessionToken: String!): [Project]
`;
