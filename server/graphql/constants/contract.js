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
