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
        note {
          important
          noteList {
            id
            author {
              id
              name
            }
            date
            message
            assignee {
              id
              name
            }
          }
        }
        ignore
        discountTotal`;

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
          important
          noteList {
            id
            author {
              id
              name
            }
            date
            message
            assignee {
              id
              name
            }
          }
        }`;

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

module.exports = {
  CONTRACT,
  PRICING_TERM,
  DISCOUNT,
  NOTE
};
