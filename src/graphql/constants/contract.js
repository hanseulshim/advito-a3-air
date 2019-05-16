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
        airlineList`;

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
