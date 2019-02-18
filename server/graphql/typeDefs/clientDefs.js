const { generateQuery, generateTypeList } = require('../helper');

exports.clientDefs = `
${generateTypeList(
  'Client',
  `{
      id: Int,
      name: String,
    }`
)}
`;
exports.clientQuery = `
${generateQuery('getClients', 'Client')}`;
