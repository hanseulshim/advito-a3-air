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
