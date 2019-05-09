export const CONTRACT = `id
        name
        type {
          id
          name
        }
        description
        round
        effectiveStartDate
        effectiveEndDate
        qc
        pricingTermTotal
        targetTermTotal
        pointOfSaleList
        pointOfOriginList
        airlineList`;

export const NOTE = `important
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
        }`;

export const PRICING_TERM = `id
        contractOrder
        appliedOrder
        name
        effectiveStartDate
        effectiveEndDate
        qc
        pointOfSaleList
        pointOfOriginList
        airlineList
        note {
          ${NOTE}
        }
        ignore
        discountTotal`;

export const TARGET_TERM = `id
      name
      effectiveStartDate
      effectiveEndDate
      timeframe
      qc
      targetType
      cabinF
      cabinB
      cabinP
      cabinE
      qsi
      incentiveType
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
        note {
          ${NOTE}
        }`;
