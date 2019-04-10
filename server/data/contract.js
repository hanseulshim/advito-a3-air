exports.contractList = [
  {
    id: 1,
    name: 'Contract_name',
    type: 'Contract',
    description: 'Text here',
    round: null,
    effectiveStartDate: '01/25/2019',
    effectiveEndDate: '01/25/2020',
    qc: 0.5,
    pricingTermTotal: 10,
    targetTermTotal: 31,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    isDeleted: false
  },
  {
    id: 2,
    name: 'Contract_Name_goes_here_version1.pdf',
    type: 'Amendment',
    description: 'Lorem ipsum dolor sit amet, con adip elit...',
    round: null,
    effectiveStartDate: '03/03/2019',
    effectiveEndDate: '03/03/2020',
    qc: 1.0,
    pricingTermTotal: 102,
    targetTermTotal: 21,
    pointOfSaleList: ['US', 'EU', 'RU', 'JP'],
    pointOfOriginList: ['US'],
    airlineList: ['AA'],
    isDeleted: false
  },
  {
    id: 3,
    name: 'Contract_Name_goes_here_version5.pdf',
    type: 'Proposal',
    description: 'text here, might get cut off if long...',
    round: 2,
    effectiveStartDate: '03/28/2019',
    effectiveEndDate: '03/28/2020',
    qc: 1.0,
    pricingTermTotal: 2,
    targetTermTotal: 21,
    pointOfSaleList: ['US', 'EU', 'UK'],
    pointOfOriginList: ['US', 'CA', 'BR', 'KR', 'AU'],
    airlineList: ['AF'],
    isDeleted: false
  }
];

exports.contractTypeList = [
  {
    id: 1,
    name: 'Contract'
  },
  {
    id: 2,
    name: 'Proposal'
  },
  {
    id: 3,
    name: 'Amendment'
  }
];
