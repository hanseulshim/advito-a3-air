export default {
  client: {
    id: null,
    name: null,
    __typename: 'Client'
  },
  projectStatusList: [
    {
      id: 1,
      status: null,
      __typename: 'ProjectStatus'
    },
    {
      id: 2,
      status: null,
      __typename: 'ProjectStatus'
    },
    {
      id: 3,
      status: null,
      __typename: 'ProjectStatus'
    },
    {
      id: 4,
      status: null,
      __typename: 'ProjectStatus'
    },
    {
      id: 5,
      status: null,
      __typename: 'ProjectStatus'
    }
  ],
  project: {
    id: null,
    clientId: null,
    clientName: null,
    name: null,
    description: null,
    division: null,
    isDeleted: null,
    projectTypeId: null,
    projectTypeName: null,
    savingsTypeId: null,
    savingsTypeName: null,
    effectiveFrom: null,
    effectiveTo: null,
    reportFrom: null,
    reportTo: null,
    projectManagerId: null,
    projectManagerName: null,
    projectManagerEmail: null,
    leadAnalystId: null,
    leadAnalystName: null,
    leadAnalystEmail: null,
    dataSpecialistId: null,
    dataSpecialistName: null,
    dataSpecialistEmail: null,
    currencyId: null,
    currencyName: null,
    distanceUnitId: null,
    distanceUnitName: null,
    progress: null,
    favorite: null,
    __typename: 'Project'
  },
  selectedContract: {
    id: null,
    name: null,
    typeId: null,
    typeName: null,
    description: null,
    round: null,
    effectiveFrom: null,
    effectiveTo: null,
    qc: null,
    pricingTermCount: null,
    targetTermCount: null,
    pointOfSaleList: [],
    pointOfOriginList: [],
    airlineList: null,
    divisionId: null,
    __typename: 'Contract'
  }
};
