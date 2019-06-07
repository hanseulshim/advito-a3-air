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
        cabinB
        cabinP
        cabinE
        qsi
        incentiveTypeId
        incentiveTypeName
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
        discountTypeId
        discountTypeName
        discountValue
        journeyTypeId
        journeyTypeName
        directionTypeId
        directionTypeName
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

export const DISCOUNT_LOOKUP = {
  DISCOUNT_TYPE: 3,
  PERCENTAGE: 11,
  JOURNEY_TYPE: 4,
  DIRECTION_TYPE: 5
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
  KPG: 28
};
