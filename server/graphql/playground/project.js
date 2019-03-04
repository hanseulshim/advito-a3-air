exports.projectQueries = {
  name: 'Project Queries',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'advitoValidToken' },
  query: `
  {
    projectList(clientId: 1) {
      id
      clientId
      clientName
      name
      description
      isDeleted
      projectTypeId
      projectType
      savingsTypeId
      savingsType
      effectiveFrom
      effectiveTo
      reportFrom
      reportTo
      projectManagerId
      projectManagerName
      projectManagerEmail
      leadAnalystId
      leadAnalystName
      leadAnalystEmail
      dataSpecialistId
      dataSpecialistName
      dataSpecialistEmail
      progress
      favorite
    }
  }
  `
};
exports.projectMutations = {
  name: 'Project Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'advitoValidToken' },
  query: `
  mutation {
    addProject(
      clientId: 1
      division: "Test"
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
      message
    }
    deleteProject(id: 1) {
      message
    }
    toggleFavoriteProject(id: 50) {
      message
    },
    editProject(
      id:50,
      division: "Test"
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
      message
    }
  }
  `
};
