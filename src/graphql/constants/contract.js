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
        ignore
        discountCount`;

export const TARGET_TERM = `id
      name
      effectiveStartDate
      effectiveEndDate
      timeframe
      qc
      targetType {
        id
        name
      }
      cabinF
      cabinB
      cabinP
      cabinE
      qsi
      incentiveType {
        id
        name
      }
      softTarget
      internalTarget
      order
      targetAmount
      levelTotal
      ruleTotal
      note {
        ${NOTE}
      }
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
