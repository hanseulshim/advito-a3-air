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
    division: null,
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
    division: null,
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
    division: null,
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

exports.pricingTermList = [
  {
    id: 1,
    contractOrder: 1,
    appliedOrder: 10,
    name: 'AR Pos',
    effectiveStartDate: '03/15/2018',
    effectiveEndDate: '12/31/2019',
    qc: 1,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    ignore: false,
    note: null,
    isDeleted: false,
    discountList: [
      {
        id: 1,
        contractOrder: 1,
        appliedOrder: 3,
        name: 'Temp',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0.02,
        journeyType: 'Return',
        directionType: 'Directional',
        normalizationList: 8,
        note: null,
        isDeleted: false
      },
      {
        id: 2,
        contractOrder: 2,
        appliedOrder: 2,
        name: 'Ronstring',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0.77,
        journeyType: 'Return',
        directionType: 'Bidirectional',
        normalizationList: 1,
        note: null,
        isDeleted: false
      },
      {
        id: 3,
        contractOrder: 3,
        appliedOrder: 1,
        name: 'Pannier',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0.16,
        journeyType: 'Return',
        directionType: 'Directional',
        normalizationList: 0,
        note: 'note',
        isDeleted: false
      }
    ]
  },
  {
    id: 2,
    contractOrder: 2,
    appliedOrder: 9,
    name: 'DXB - RGEU',
    effectiveStartDate: '03/15/2018',
    effectiveEndDate: '12/31/2019',
    qc: 1,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    ignore: false,
    note: null,
    isDeleted: false,
    discountList: [
      {
        id: 4,
        contractOrder: 1,
        appliedOrder: 3,
        name: 'Bitwolf',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0.41,
        journeyType: 'OW/RT',
        directionType: 'Directional',
        normalizationList: 8,
        note: 'important',
        isDeleted: false
      },
      {
        id: 5,
        contractOrder: 2,
        appliedOrder: 2,
        name: 'Fintone',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Percentage',
        discountValue: 0.97,
        journeyType: 'Oneway',
        directionType: 'Bidirectional',
        normalizationList: 5,
        note: null,
        isDeleted: false
      },
      {
        id: 6,
        contractOrder: 3,
        appliedOrder: 1,
        name: 'Prodder',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0.56,
        journeyType: 'OW/RT',
        directionType: 'Directional',
        normalizationList: 10,
        note: 'note',
        isDeleted: false
      }
    ]
  },
  {
    id: 3,
    contractOrder: 3,
    appliedOrder: 8,
    name: 'NA POS - AS Unilateral',
    effectiveStartDate: '03/15/2018',
    effectiveEndDate: '12/31/2019',
    qc: 1,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    ignore: false,
    note: null,
    isDeleted: false,
    discountList: [
      {
        id: 7,
        contractOrder: 1,
        appliedOrder: 3,
        name: 'Voyatouch',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Subtraction',
        discountValue: 0.04,
        journeyType: 'Return',
        directionType: 'Directional',
        normalizationList: 0,
        note: null,
        isDeleted: false
      },
      {
        id: 8,
        contractOrder: 2,
        appliedOrder: 2,
        name: 'Sonair',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Subtraction',
        discountValue: 0.44,
        journeyType: 'Return',
        directionType: 'Bidirectional',
        normalizationList: 1,
        note: 'note',
        isDeleted: false
      },
      {
        id: 9,
        contractOrder: 3,
        appliedOrder: 1,
        name: 'Sub-Ex',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0.11,
        journeyType: 'OW/RT',
        directionType: 'Directional',
        normalizationList: 10,
        note: 'note',
        isDeleted: false
      }
    ]
  },
  {
    id: 4,
    contractOrder: 4,
    appliedOrder: 7,
    name: 'DXB - GVA',
    effectiveStartDate: '03/15/2018',
    effectiveEndDate: '03/31/2019',
    qc: 1,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    ignore: false,
    note: 'note',
    isDeleted: false,
    discountList: [
      {
        id: 10,
        contractOrder: 1,
        appliedOrder: 3,
        name: 'Kanlam',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Percentage',
        discountValue: 0.28,
        journeyType: 'Return',
        directionType: 'Bidirectional',
        normalizationList: 1,
        note: 'note',
        isDeleted: false
      },
      {
        id: 11,
        contractOrder: 2,
        appliedOrder: 2,
        name: 'Ronstring',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Percentage',
        discountValue: 0.17,
        journeyType: 'Return',
        directionType: 'Directional',
        normalizationList: 7,
        note: 'important',
        isDeleted: false
      },
      {
        id: 12,
        contractOrder: 3,
        appliedOrder: 1,
        name: 'Wrapsafe',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0.68,
        journeyType: 'Return',
        directionType: 'Bidirectional',
        normalizationList: 9,
        note: 'important',
        isDeleted: false
      }
    ]
  },
  {
    id: 5,
    contractOrder: 5,
    appliedOrder: 6,
    name: 'EU PoS',
    effectiveStartDate: '03/15/2018',
    effectiveEndDate: '03/31/2019',
    qc: 1,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    ignore: false,
    note: 'note',
    isDeleted: false,
    discountList: [
      {
        id: 13,
        contractOrder: 1,
        appliedOrder: 3,
        name: 'Matsoft',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Subtraction',
        discountValue: 0.75,
        journeyType: 'Oneway',
        directionType: 'Directional',
        normalizationList: 6,
        note: 'important',
        isDeleted: false
      },
      {
        id: 14,
        contractOrder: 2,
        appliedOrder: 2,
        name: 'Bitchip',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0.93,
        journeyType: 'OW/RT',
        directionType: 'Directional',
        normalizationList: 2,
        note: 'important',
        isDeleted: false
      },
      {
        id: 15,
        contractOrder: 3,
        appliedOrder: 1,
        name: 'Tres-Zap',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Subtraction',
        discountValue: 0.2,
        journeyType: 'Oneway',
        directionType: 'Directional',
        normalizationList: 2,
        note: null,
        isDeleted: false
      }
    ]
  },
  {
    id: 6,
    contractOrder: 6,
    appliedOrder: 5,
    name: 'NA POS - AS Unilateral',
    effectiveStartDate: '03/15/2018',
    effectiveEndDate: '12/31/2019',
    qc: 1,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    ignore: false,
    note: 'note',
    isDeleted: false,
    discountList: [
      {
        id: 16,
        contractOrder: 1,
        appliedOrder: 3,
        name: 'Biodex',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Percentage',
        discountValue: 0.16,
        journeyType: 'Oneway',
        directionType: 'Bidirectional',
        normalizationList: 7,
        note: null,
        isDeleted: false
      },
      {
        id: 17,
        contractOrder: 2,
        appliedOrder: 2,
        name: 'Domainer',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Percentage',
        discountValue: 0.52,
        journeyType: 'OW/RT',
        directionType: 'Bidirectional',
        normalizationList: 6,
        note: 'important',
        isDeleted: false
      },
      {
        id: 18,
        contractOrder: 3,
        appliedOrder: 1,
        name: 'Home Ing',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Percentage',
        discountValue: 0.26,
        journeyType: 'Oneway',
        directionType: 'Directional',
        normalizationList: 3,
        note: 'important',
        isDeleted: false
      }
    ]
  },
  {
    id: 7,
    contractOrder: 7,
    appliedOrder: 4,
    name: 'NA POS - JFK t/f LAX/SFO',
    effectiveStartDate: '03/15/2018',
    effectiveEndDate: '12/31/2019',
    qc: 0.7,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    ignore: false,
    note: null,
    isDeleted: false,
    discountList: [
      {
        id: 19,
        contractOrder: 1,
        appliedOrder: 3,
        name: 'Cookley',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Subtraction',
        discountValue: 0.6,
        journeyType: 'Oneway',
        directionType: 'Directional',
        normalizationList: 3,
        note: null,
        isDeleted: false
      },
      {
        id: 20,
        contractOrder: 2,
        appliedOrder: 2,
        name: 'Overhold',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Percentage',
        discountValue: 0.77,
        journeyType: 'Oneway',
        directionType: 'Bidirectional',
        normalizationList: 10,
        note: null,
        isDeleted: false
      },
      {
        id: 21,
        contractOrder: 3,
        appliedOrder: 1,
        name: 'It',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Subtraction',
        discountValue: 0.77,
        journeyType: 'Return',
        directionType: 'Bidirectional',
        normalizationList: 10,
        note: null,
        isDeleted: false
      }
    ]
  },
  {
    id: 8,
    contractOrder: 8,
    appliedOrder: 3,
    name: 'DXB - PAR',
    effectiveStartDate: '03/15/2018',
    effectiveEndDate: '12/31/2019',
    qc: 1,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    ignore: false,
    note: 'important',
    isDeleted: false,
    discountList: [
      {
        id: 22,
        contractOrder: 1,
        appliedOrder: 3,
        name: 'Bamity',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Percentage',
        discountValue: 0.84,
        journeyType: 'Return',
        directionType: 'Bidirectional',
        normalizationList: 5,
        note: null,
        isDeleted: false
      },
      {
        id: 23,
        contractOrder: 2,
        appliedOrder: 2,
        name: 'Prodder',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0,
        journeyType: 'Return',
        directionType: 'Directional',
        normalizationList: 10,
        note: null,
        isDeleted: false
      },
      {
        id: 24,
        contractOrder: 3,
        appliedOrder: 1,
        name: 'Zamit',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Percentage',
        discountValue: 0.01,
        journeyType: 'Return',
        directionType: 'Directional',
        normalizationList: 2,
        note: null,
        isDeleted: false
      }
    ]
  },
  {
    id: 9,
    contractOrder: 9,
    appliedOrder: 2,
    name: 'DXB - PAR',
    effectiveStartDate: '03/15/2018',
    effectiveEndDate: '12/31/2019',
    qc: 1,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    ignore: false,
    note: 'note',
    isDeleted: false,
    discountList: [
      {
        id: 25,
        contractOrder: 1,
        appliedOrder: 3,
        name: 'Mat Lam Tam',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0.92,
        journeyType: 'Oneway',
        directionType: 'Bidirectional',
        normalizationList: 2,
        note: null,
        isDeleted: false
      },
      {
        id: 26,
        contractOrder: 2,
        appliedOrder: 2,
        name: 'Vagram',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Subtraction',
        discountValue: 0.56,
        journeyType: 'Oneway',
        directionType: 'Bidirectional',
        normalizationList: 8,
        note: 'important',
        isDeleted: false
      },
      {
        id: 27,
        contractOrder: 3,
        appliedOrder: 1,
        name: 'Veribet',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Fixed',
        discountValue: 0.17,
        journeyType: 'OW/RT',
        directionType: 'Directional',
        normalizationList: 9,
        note: null,
        isDeleted: false
      }
    ]
  },
  {
    id: 10,
    contractOrder: 10,
    appliedOrder: 1,
    name: 'DXB - PAR',
    effectiveStartDate: '03/15/2018',
    effectiveEndDate: '12/31/2019',
    qc: 1,
    pointOfSaleList: ['US', 'CA', 'CN'],
    pointOfOriginList: ['US', 'CA', 'CN', 'EU'],
    airlineList: ['DL', 'AA', 'AF', 'LH'],
    ignore: false,
    note: 'note',
    isDeleted: false,
    discountList: [
      {
        id: 28,
        contractOrder: 1,
        appliedOrder: 3,
        name: 'Konklab',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Subtraction',
        discountValue: 0.7,
        journeyType: 'Return',
        directionType: 'Bidirectional',
        normalizationList: 2,
        note: null,
        isDeleted: false
      },
      {
        id: 29,
        contractOrder: 2,
        appliedOrder: 2,
        name: 'Hatity',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Subtraction',
        discountValue: 0.77,
        journeyType: 'OW/RT',
        directionType: 'Directional',
        normalizationList: 2,
        note: null,
        isDeleted: false
      },
      {
        id: 30,
        contractOrder: 3,
        appliedOrder: 1,
        name: 'Cookley',
        effectiveStartDate: '03/15/2019',
        effectiveEndDate: '12/31/2019',
        discountType: 'Percentage',
        discountValue: 0.43,
        journeyType: 'OW/RT',
        directionType: 'Directional',
        normalizationList: 2,
        note: 'note',
        isDeleted: false
      }
    ]
  }
];

exports.discountTypeList = [
  {
    id: 1,
    name: 'Fixed'
  },
  {
    id: 2,
    name: 'Percentage'
  },
  {
    id: 3,
    name: 'Subtraction'
  }
];
exports.journeyTypeList = [
  {
    id: 1,
    name: 'Oneway'
  },
  {
    id: 2,
    name: 'Return'
  },
  {
    id: 3,
    name: 'OW/RT'
  }
];
exports.directionTypeList = [
  {
    id: 1,
    name: 'Directional'
  },
  {
    id: 2,
    name: 'Bidirectional'
  }
];