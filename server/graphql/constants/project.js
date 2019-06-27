const PROJECT = `id
        clientId
        clientName
        name
        description
        isDeleted
        projectTypeId
        projectTypeName
        savingsTypeId
        savingsTypeName
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
        currencyId
        currencyName
        distanceUnitId
        distanceUnitName
        progress
        favorite`;

const PROJECT_LOOKUP = {
  PROJECT_TYPE: 1,
  SAVINGS_TYPE: 9
};

module.exports = {
  PROJECT,
  PROJECT_LOOKUP
};
