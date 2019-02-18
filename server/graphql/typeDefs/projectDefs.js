const { generateQuery, generateTypeList } = require('../helper');

exports.projectDefs = `
${generateTypeList(
  'Project',
  `{
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
      projectManager: String,
      leadAnalystId: Int,
      leadAnalyst: String,
      dataSpecialistId: Int,
      dataSpecialistString: String,
      favorite: Boolean,
    }`
)}
`;
exports.projectQuery = `
${generateQuery('getProjects', 'Project')}`;
