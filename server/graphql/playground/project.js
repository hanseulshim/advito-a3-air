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
      id
      clientId
      clientName
      name
      division
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
    deleteProject(id: 1)
    toggleFavoriteProject(id: 50)
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
    ) {
      id
      clientId
      clientName
      name
      description
      division
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
