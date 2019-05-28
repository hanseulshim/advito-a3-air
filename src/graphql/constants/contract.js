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
        discountTotal`;

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
        effectiveStartDate
        effectiveEndDate
        discountType {
          id
          name
        }
        discountValue
        journeyType {
          id
          name
        }
        directionType {
          id
          name
        }
        normalizationList
        noteImportant
        noteContent`;

export const NOTE = `id
        text
        lastUpdate
        assigneeId
        assigneeName
        assignedToId
        assignedToName`;
