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
        currencyId
        softTarget
        internalTarget
        targetAmount
        levelCount
        ruleCount
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

export const TIME_UNIT_LOOKUP = {
  HOURS: 1,
  DAYS: 2,
  MONTHS: 3
};

export const DISCOUNT_LOOKUP = {
  DISCOUNT_TYPE: 3,
  PERCENTAGE: 11,
  JOURNEY_TYPE: 4,
  DIRECTION_TYPE: 5,
  BULK_ACTION: 2,
  BULK_ACTION_DELETE: 13,
  RULE_TYPE: 1
};

export const PRICING_TERM_LOOKUP = {
  BULK_ACTION: 1,
  BULK_ACTION_DELETE: 7,
  BULK_ACTION_QC: 8,
  REQUIRED_BOOKING_CLASS_TYPE: 1,
  PUBLISHED_BOOKING_CLASS_TYPE: 2,
  MARKETING_AIRLINE_RULETYPE: 1,
  VALIDATING_AIRLINE_RULETYPE: 2,
  OPERATING_AIRLINE_RULETYPE: 3,
  SEGMENT_TYPE: 2,
  DISTANCE_UNIT_MILES: 1,
  DISTANCE_UNIT_KILOMETERS: 2,
  PUBLISHED_FARE_BASIS_TYPE: 2,
  CORPORATE_FARE_BASIS_TYPE: 2
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
  BULK_ACTION: 3,
  BULK_ACTION_DELETE: 19,
  BULK_ACTION_QC: 20,
  RULE_TYPE: 2
};
