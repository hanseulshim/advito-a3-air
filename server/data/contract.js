exports.contractList = [
  {
    id: 1,
    name: 'Contract_name',
    type: {
      id: 1,
      name: 'Contract'
    },
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
    name: 'Contract_Name_goes_here_version1',
    type: {
      id: 3,
      name: 'Amendment'
    },
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
    name: 'Contract_Name_goes_here_version5',
    type: {
      id: 2,
      name: 'Proposal'
    },
    description: 'Lorem ipsum dolor sit amet, con adip elit...',
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
    note: {
      important: false,
      noteList: [
        {
          id: 1,
          author: {
            id: 3,
            name: 'Scott Cashon',
            email: 'scott.cashon@boostlabs.com'
          },
          date: new Date('08-01-2018'),
          message: 'First message',
          assignee: {
            id: 2,
            name: 'Kevin Ingalls',
            email: 'kevin.ingalls@boostlabs.com'
          }
        },
        {
          id: 2,
          author: {
            id: 3,
            name: 'Scott Cashon',
            email: 'scott.cashon@boostlabs.com'
          },
          date: new Date('08-02-2018'),
          message: 'Second message',
          assignee: {
            id: 2,
            name: 'Kevin Ingalls',
            email: 'kevin.ingalls@boostlabs.com'
          }
        },
        {
          id: 3,
          author: {
            id: 3,
            name: 'Scott Cashon',
            email: 'scott.cashon@boostlabs.com'
          },
          date: new Date('08-03-2018'),
          message: 'Third message',
          assignee: {
            id: 2,
            name: 'Kevin Ingalls',
            email: 'kevin.ingalls@boostlabs.com'
          }
        },
        {
          id: 4,
          author: {
            id: 2,
            name: 'Kevin Ingalls',
            email: 'kevin.ingalls@boostlabs.com'
          },
          date: new Date('08-04-2018'),
          message: 'Fourth message',
          assignee: {
            id: 2,
            name: 'Kevin Ingalls',
            email: 'kevin.ingalls@boostlabs.com'
          }
        },
        {
          id: 5,
          author: {
            id: 3,
            name: 'Scott Cashon',
            email: 'scott.cashon@boostlabs.com'
          },
          date: new Date('08-03-2018'),
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          assignee: {
            id: 2,
            name: 'Kevin Ingalls',
            email: 'kevin.ingalls@boostlabs.com'
          }
        }
      ]
    },
    isDeleted: false,
    discountTotal: 3
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
    discountTotal: 3
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
    discountTotal: 3
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
    note: null,
    isDeleted: false,
    discountTotal: 3
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
    note: null,
    isDeleted: false,
    discountTotal: 3
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
    note: null,
    isDeleted: false,
    discountTotal: 3
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
    note: {
      important: true,
      noteList: [
        {
          id: 6,
          author: {
            id: 3,
            name: 'Scott Cashon',
            email: 'scott.cashon@boostlabs.com'
          },
          date: new Date('08-03-2018'),
          message: 'This is a message that is assigned to Kevin',
          assignee: {
            id: 2,
            name: 'Kevin Ingalls',
            email: 'kevin.ingalls@boostlabs.com'
          }
        }
      ]
    },
    isDeleted: false,
    discountTotal: 3
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
    note: null,
    isDeleted: false,
    discountTotal: 3
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
    note: null,
    isDeleted: false,
    discountTotal: 3
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
    note: null,
    isDeleted: false,
    discountTotal: 3
  }
];

exports.discountList = [
  {
    id: 1,
    pricingTermId: 1,
    contractOrder: 1,
    appliedOrder: 3,
    name: 'Temp',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0.02,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 8,
    note: null,
    isDeleted: false
  },
  {
    id: 2,
    pricingTermId: 1,
    contractOrder: 2,
    appliedOrder: 2,
    name: 'Ronstring',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0.77,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 1,
    note: null,
    isDeleted: false
  },
  {
    id: 3,
    pricingTermId: 1,
    contractOrder: 3,
    appliedOrder: 1,
    name: 'Pannier',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0.16,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 0,
    note: null,
    isDeleted: false
  },
  {
    id: 4,
    pricingTermId: 2,
    contractOrder: 1,
    appliedOrder: 3,
    name: 'Bitwolf',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0.41,
    journeyType: {
      id: 3,
      name: 'OW/RT'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 8,
    note: null,
    isDeleted: false
  },
  {
    id: 5,
    pricingTermId: 2,
    contractOrder: 2,
    appliedOrder: 2,
    name: 'Fintone',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 2,
      name: 'Percentage'
    },
    discountValue: 0.97,
    journeyType: {
      id: 1,
      name: 'Oneway'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 5,
    note: null,
    isDeleted: false
  },
  {
    id: 6,
    pricingTermId: 2,
    contractOrder: 3,
    appliedOrder: 1,
    name: 'Prodder',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0.56,
    journeyType: {
      id: 3,
      name: 'OW/RT'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 10,
    note: null,
    isDeleted: false
  },
  {
    id: 7,
    pricingTermId: 3,
    contractOrder: 1,
    appliedOrder: 3,
    name: 'Voyatouch',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 3,
      name: 'Subtraction'
    },
    discountValue: 0.04,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 0,
    note: null,
    isDeleted: false
  },
  {
    id: 8,
    pricingTermId: 3,
    contractOrder: 2,
    appliedOrder: 2,
    name: 'Sonair',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 3,
      name: 'Subtraction'
    },
    discountValue: 0.44,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 1,
    note: null,
    isDeleted: false
  },
  {
    id: 9,
    pricingTermId: 3,
    contractOrder: 3,
    appliedOrder: 1,
    name: 'Sub-Ex',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0.11,
    journeyType: {
      id: 3,
      name: 'OW/RT'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 10,
    note: null,
    isDeleted: false
  },
  {
    id: 10,
    pricingTermId: 4,
    contractOrder: 1,
    appliedOrder: 3,
    name: 'Kanlam',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 2,
      name: 'Percentage'
    },
    discountValue: 0.28,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 1,
    note: null,
    isDeleted: false
  },
  {
    id: 11,
    pricingTermId: 4,
    contractOrder: 2,
    appliedOrder: 2,
    name: 'Ronstring',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 2,
      name: 'Percentage'
    },
    discountValue: 0.17,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 7,
    note: null,
    isDeleted: false
  },
  {
    id: 12,
    pricingTermId: 4,
    contractOrder: 3,
    appliedOrder: 1,
    name: 'Wrapsafe',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0.68,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 9,
    note: null,
    isDeleted: false
  },
  {
    id: 13,
    pricingTermId: 5,
    contractOrder: 1,
    appliedOrder: 3,
    name: 'Matsoft',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 3,
      name: 'Subtraction'
    },
    discountValue: 0.75,
    journeyType: {
      id: 1,
      name: 'Oneway'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 6,
    note: null,
    isDeleted: false
  },
  {
    id: 14,
    pricingTermId: 5,
    contractOrder: 2,
    appliedOrder: 2,
    name: 'Bitchip',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0.93,
    journeyType: {
      id: 3,
      name: 'OW/RT'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 2,
    note: null,
    isDeleted: false
  },
  {
    id: 15,
    pricingTermId: 5,
    contractOrder: 3,
    appliedOrder: 1,
    name: 'Tres-Zap',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 3,
      name: 'Subtraction'
    },
    discountValue: 0.2,
    journeyType: {
      id: 1,
      name: 'Oneway'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 2,
    note: null,
    isDeleted: false
  },
  {
    id: 16,
    pricingTermId: 6,
    contractOrder: 1,
    appliedOrder: 3,
    name: 'Biodex',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 2,
      name: 'Percentage'
    },
    discountValue: 0.16,
    journeyType: {
      id: 1,
      name: 'Oneway'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 7,
    note: null,
    isDeleted: false
  },
  {
    id: 17,
    pricingTermId: 6,
    contractOrder: 2,
    appliedOrder: 2,
    name: 'Domainer',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 2,
      name: 'Percentage'
    },
    discountValue: 0.52,
    journeyType: {
      id: 3,
      name: 'OW/RT'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 6,
    note: null,
    isDeleted: false
  },
  {
    id: 18,
    pricingTermId: 6,
    contractOrder: 3,
    appliedOrder: 1,
    name: 'Home Ing',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 2,
      name: 'Percentage'
    },
    discountValue: 0.26,
    journeyType: {
      id: 1,
      name: 'Oneway'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 3,
    note: null,
    isDeleted: false
  },
  {
    id: 19,
    pricingTermId: 7,
    contractOrder: 1,
    appliedOrder: 3,
    name: 'Cookley',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 3,
      name: 'Subtraction'
    },
    discountValue: 0.6,
    journeyType: {
      id: 1,
      name: 'Oneway'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 3,
    note: null,
    isDeleted: false
  },
  {
    id: 20,
    pricingTermId: 7,
    contractOrder: 2,
    appliedOrder: 2,
    name: 'Overhold',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 2,
      name: 'Percentage'
    },
    discountValue: 0.77,
    journeyType: {
      id: 1,
      name: 'Oneway'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 10,
    note: null,
    isDeleted: false
  },
  {
    id: 21,
    pricingTermId: 7,
    contractOrder: 3,
    appliedOrder: 1,
    name: 'It',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 3,
      name: 'Subtraction'
    },
    discountValue: 0.77,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 10,
    note: null,
    isDeleted: false
  },
  {
    id: 22,
    pricingTermId: 8,
    contractOrder: 1,
    appliedOrder: 3,
    name: 'Bamity',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 2,
      name: 'Percentage'
    },
    discountValue: 0.84,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 5,
    note: {
      important: true,
      noteList: [
        {
          id: 7,
          author: {
            id: 3,
            name: 'Scott Cashon',
            email: 'scott.cashon@boostlabs.com'
          },
          date: new Date('08-03-2018'),
          message: 'This is a message that is assigned to Kevin',
          assignee: {
            id: 2,
            name: 'Kevin Ingalls',
            email: 'kevin.ingalls@boostlabs.com'
          }
        },
        {
          id: 8,
          author: {
            id: 2,
            name: 'Kevin Ingalls',
            email: 'kevin.ingalls@boostlabs.com'
          },
          date: new Date('08-03-2018'),
          message: 'This is a message that is assigned to Kevin',
          assignee: {
            id: 2,
            name: 'Kevin Ingalls',
            email: 'kevin.ingalls@boostlabs.com'
          }
        }
      ]
    },
    isDeleted: false
  },
  {
    id: 23,
    pricingTermId: 8,
    contractOrder: 2,
    appliedOrder: 2,
    name: 'Prodder',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 10,
    note: null,
    isDeleted: false
  },
  {
    id: 24,
    pricingTermId: 8,
    contractOrder: 3,
    appliedOrder: 1,
    name: 'Zamit',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 2,
      name: 'Percentage'
    },
    discountValue: 0.01,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 2,
    note: null,
    isDeleted: false
  },
  {
    id: 25,
    pricingTermId: 9,
    contractOrder: 1,
    appliedOrder: 3,
    name: 'Mat Lam Tam',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0.92,
    journeyType: {
      id: 1,
      name: 'Oneway'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 2,
    note: null,
    isDeleted: false
  },
  {
    id: 26,
    pricingTermId: 9,
    contractOrder: 2,
    appliedOrder: 2,
    name: 'Vagram',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 3,
      name: 'Subtraction'
    },
    discountValue: 0.56,
    journeyType: {
      id: 1,
      name: 'Oneway'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 8,
    note: null,
    isDeleted: false
  },
  {
    id: 27,
    pricingTermId: 9,
    contractOrder: 3,
    appliedOrder: 1,
    name: 'Veribet',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 1,
      name: 'Fixed'
    },
    discountValue: 0.17,
    journeyType: {
      id: 3,
      name: 'OW/RT'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 9,
    note: null,
    isDeleted: false
  },
  {
    id: 28,
    pricingTermId: 10,
    contractOrder: 1,
    appliedOrder: 3,
    name: 'Konklab',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 3,
      name: 'Subtraction'
    },
    discountValue: 0.7,
    journeyType: {
      id: 2,
      name: 'Return'
    },
    directionType: {
      id: 2,
      name: 'Bidirectional'
    },
    normalizationList: 2,
    note: null,
    isDeleted: false
  },
  {
    id: 29,
    pricingTermId: 10,
    contractOrder: 2,
    appliedOrder: 2,
    name: 'Hatity',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 3,
      name: 'Subtraction'
    },
    discountValue: 0.77,
    journeyType: {
      id: 3,
      name: 'OW/RT'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 2,
    note: null,
    isDeleted: false
  },
  {
    id: 30,
    pricingTermId: 10,
    contractOrder: 3,
    appliedOrder: 1,
    name: 'Cookley',
    effectiveStartDate: '03/15/2019',
    effectiveEndDate: '12/31/2019',
    discountType: {
      id: 2,
      name: 'Percentage'
    },
    discountValue: 0.43,
    journeyType: {
      id: 3,
      name: 'OW/RT'
    },
    directionType: {
      id: 1,
      name: 'Directional'
    },
    normalizationList: 2,
    note: null,
    isDeleted: false
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
