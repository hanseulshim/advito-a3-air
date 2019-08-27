const { PROJECT } = require('../constants');

exports.project = {
  queries: {
    name: 'Project Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      projectList(clientId: null, userId: null) {
        ${PROJECT}
      }
      projectTypeList {
        id
        name
      }
      savingsTypeList {
        id
        name
      }
    }
    `
  },
  mutations: {
    name: 'Project Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    mutation {
      addProject(
        clientId: 1
        clientName: "Test"
        projectTypeId: 1
        projectTypeName: "Test project"
        savingsTypeId: 3
        effectiveFrom: 1483246800001
        effectiveTo: 1483246800001
        reportFrom: 1483246800001
        reportTo: 1483246800001
        description: "my description"
        projectManagerId: 4
        leadAnalystId: 2
        dataSpecialistId: 3
        currencyId: 1
        distanceUnitId: 2
      ) {
        ${PROJECT}
      }
      deleteProject(id: 1)
      toggleFavoriteProject(id: 50) {
        id
        favorite
      }
      editProject(
        id:50,
        savingsTypeId: 3
        effectiveFrom: 1483246800001
        effectiveTo: 1483246800001
        reportFrom: 1483246800001
        reportTo: 1483246800001
        description: "my description"
        projectManagerId: 4
        leadAnalystId: 2
        dataSpecialistId: 3
        currencyId: 3,
        distanceUnitId: 2
      ) {
        ${PROJECT}
      }
    }
    `
  }
};
