const CONTRACT = `id
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

const PRICING_TERM = `id
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

const TARGET_TERM = `id
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
      order
      internalTarget
      targetAmount
      levelTotal
      ruleTotal
      note {
        important
        noteList {
          id
          author {
            id
            name
          }
          date
          assignee {
            id
            name
          }
          message
        }
      }
  `;

const TARGET_LEVEL = `id
        targetTermId
        targetAmount
        scoringTarget
        incentiveDescription
`;

const DISCOUNT = `id
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

const NOTE = `id
        text
        lastUpdate
        assigneeId
        assigneeName
        assignedToId
        assignedToName`;

const CONTRACT_LOOKUP = {
  CONTRACT: 7,
  PROPOSAL: 8,
  AMENDMENT: 9,
  TYPE: 2
};

const DISCOUNT_LOOKUP = {
  DISCOUNT_TYPE: 3,
  PERCENTAGE: 11,
  JOURNEY_TYPE: 4,
  DIRECTION_TYPE: 5
};

module.exports = {
  CONTRACT,
  PRICING_TERM,
  DISCOUNT,
  TARGET_TERM,
  TARGET_LEVEL,
  NOTE,
  CONTRACT_LOOKUP,
  DISCOUNT_LOOKUP
};
