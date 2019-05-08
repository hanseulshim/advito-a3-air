const CONTRACT = `id
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

const NOTE = `important
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

const PRICING_TERM = `id
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

const TARGET_TERM = `id
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
      order
      internalTarget
      targetAmount
      levelTotal
      ruleTotal
      note {
        ${NOTE}
      }
  `;

const DISCOUNT = `id
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

module.exports = {
  CONTRACT,
  PRICING_TERM,
  DISCOUNT,
  TARGET_TERM,
  NOTE
};
