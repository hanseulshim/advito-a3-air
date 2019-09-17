export const CONTRACT = `id
        name
        typeId
        typeName
        description
        round
        effectiveFrom
        effectiveTo
        qc
        pricingTermCount
        targetTermCount
        pointOfSaleList
        pointOfOriginList
        airlineList
        divisionId`;

export const PRICING_TERM = `id
        contractOrder
        appliedOrder
        name
        effectiveFrom
        effectiveTo
        qc
        pointOfSaleList
        pointOfOriginList
        airlineList
        noteImportant
        noteContent
        discountNoteCount
        ignore
        discountCount`;

export const TARGET_TERM = `id
        name
        order
        effectiveFrom
        effectiveTo
        timeframe
        qc
        targetTypeId
        targetTypeName
        cabinF
        cabinC
        cabinP
        cabinY
        qsi
        incentiveTypeId
        incentiveTypeName
        softTarget
        internalTarget
        targetAmount
        levelCount
        ruleCount
        currencyId
        noteImportant
        noteContent
        dpmPrice
        dpmStartDate
        baselineDateFrom
        baselineDateTo
        goalDateFrom
        goalDateTo
        airlineGroupFrom
        airlineGroupTo
        fareCategoryFrom
        fareCategoryTo
  `;

export const TARGET_LEVEL = `id
        targetTermId
        targetAmount
        scoringTarget
        incentiveDescription
`;

export const DISCOUNT = `id
        pricingTermId
        contractOrder
        appliedOrder
        name
        effectiveFrom
        effectiveTo
        discountTypeId
        discountTypeName
        discountValue
        journeyTypeId
        journeyTypeName
        directionTypeId
        directionTypeName
        ruleCount
        normalizationCount
        noteImportant
        noteContent`;

export const NORMALIZATION = `id
        usageFrom
        usageTo
        effectiveFrom
        effectiveTo
        created
        createdby
        marketCount`;

export const NORMALIZATION_MARKET = `id
        marketA
        marketB
        farePaid
        usageOverride
        farePullDate
        notes
        fareList {
          id
          fareType
          fareBasis
          amount
          currencyCode
          directionType
          advancePurchase
          minstay
        }`;

export const NOTE = `id
        text
        lastUpdate
        assigneeId
        assigneeName
        assignedToId
        assignedToName`;

export const CONTRACT_LOOKUP = {
  CONTRACT: 7,
  PROPOSAL: 8,
  AMENDMENT: 9,
  TYPE: 2
};

export const DISCOUNT_LOOKUP = {
  DISCOUNT_TYPE: 3,
  PERCENTAGE: 11,
  JOURNEY_TYPE: 4,
  DIRECTION_TYPE: 5,
  RULE_TYPE: 1
};

export const TARGET_TERM_LOOKUP = {
  TARGET_TYPE: 6,
  INCENTIVE_TYPE: 7,
  SEGMENT_SHARE: 20,
  REVENUE_SHARE: 21,
  SEGMENT: 22,
  REVENUE: 23,
  SHARE_GAP: 24,
  NONE: 25,
  BACK_END: 26,
  OTHER: 27,
  KPG: 28,
  RULE_TYPE: 2
};

export const PRICING_TERM_LOOKUP = {
  RULE_TYPE: 3
};

export const RULE_LOOKUP = {
  TICKET_DATE: 1,
  TRAVEL_DATE: 2,
  POINT_OF_SALE: 3,
  POINT_OF_ORIGIN: 4,
  MARKET: 5,
  FARE_BASIS: 6,
  BOOKING_CLASS: 8,
  AIRLINE: 10,
  TICKET_DESIGNATOR: 13,
  TOUR_CODE: 14,
  ADVANCED_TICKETING: 15,
  MIN_STAY: 16,
  MAX_STAY: 17,
  DAY_OF_WEEK: 18,
  STOPS: 19,
  CONNECTION_POINT: 20,
  FLIGHT_NUMBER: 21,
  BLACKOUT: 22,
  DISTANCE: 23,
  CABIN: 24,
  FARE_CATEGORY: 25,
  DAY_UNIT: 11,
  DAY_OF_WEEK_UNIT: 13,
  HOURS: 69,
  DAYS: 70,
  MONTHS: 71,
  FARE_BASIS_TYPE: 14,
  MATCHES: 83,
  STARTS_WITH: 84,
  ENDS_WITH: 85,
  CONTAINS_ANY: 86,
  CONTAINS_ALL: 87
};
