const { PROJECT } = require('../constants');

exports.project = {
  queries: {
    name: 'Project Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'MY^PR3TTYP0NY' },
    query: `
    {
      projectList(clientId: 1) {
        ${PROJECT}
      }
      projectInfo {
        projectTypeList {
          id
          name
        }
        savingsTypeList {
          id
          name
        }
        projectManagerList {
          id
          name
          email
        }
        leadAnalystList {
          id
          name
          email
        }
        dataSpecialistList {
          id
          name
          email
        }
        currencyList {
          id
          name
        }
        distanceUnitList {
          id
          name
        }
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
        projectTypeId: 1
        savingsTypeId: 3
        effectiveFrom: "01 Jan 2018"
        effectiveTo: "31 Dec 2018"
        reportFrom: "01 Jan 2018"
        reportTo: "31 Dec 2018"
        description: "my description"
        projectManagerId: 4
        leadAnalystId: 2
        dataSpecialistId: 3
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
        effectiveFrom: "01 Jan 2018"
        effectiveTo: "31 Dec 2018"
        reportFrom: "01 Jan 2018"
        reportTo: "31 Dec 2018"
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
