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
        discountTotal`;

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

const NOTE = `id
        text
        lastUpdate
        assigneeId
        assigneeName
        assignedToId
        assignedToName`;

module.exports = {
  CONTRACT,
  PRICING_TERM,
  DISCOUNT,
  TARGET_TERM,
  TARGET_LEVEL,
  NOTE
};
