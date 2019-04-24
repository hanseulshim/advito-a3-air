exports.contract = {
  queries: {
    name: 'Contract Queries',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    {
      contractList {
        id
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
        airlineList
      }
      contractTypeList {
        id
        name
      }
      userList {
        id
        name
        email
      }
      pricingTermList {
        id
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
        discountList {
          id
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
          note
        }
      }
    }`
  },
  mutations: {
    name: 'Contract Mutations',
    endpoint: 'http://localhost:8085/graphql',
    headers: { sessiontoken: 'advitoValidToken' },
    query: `
    mutation {
      createContract(name: "test", typeId: 2, round: 5, effectiveStartDate: 2534032400000, effectiveEndDate: null, description: "description", division: "division 1") {
        id
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
        airlineList
      }
      copyContract(id: 1, name: "copy contract") {
        id
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
        airlineList
      }
      editContract(id: 1, name: "test", typeId: 2, round: 5, effectiveStartDate: 2534032400000, effectiveEndDate: null, description: "description", division: "division 1") {
        id
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
        airlineList
      }
      createPricingTerm(name: "term 1", ignore: false) {
        id
        contractOrder
        appliedOrder
        name
        effectiveStartDate
        effectiveEndDate
        qc
        discountList {
          id
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
          note
        }
        pointOfSaleList
        pointOfOriginList
        airlineList
        note {
          important
          noteList {
            author {
              id
              name
            }
            date
            assignee {
              id
              name
            }
          }
        }
        ignore
      }
      copyPricingTerm(id: 1, name: "copy term", ignore: false) {
        id
        contractOrder
        appliedOrder
        name
        effectiveStartDate
        effectiveEndDate
        qc
        discountList {
          id
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
          note
        }
        pointOfSaleList
        pointOfOriginList
        airlineList
        note {
          important
          noteList {
            author {
              id
              name
            }
            date
            assignee {
              id
              name
            }
          }
        }
        ignore
      }
      editPricingTerm(id: 1, name: "term edit", ignore: true) {
        id
        contractOrder
        appliedOrder
        name
        effectiveStartDate
        effectiveEndDate
        qc
        discountList {
          id
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
          note
        }
        pointOfSaleList
        pointOfOriginList
        airlineList
        note {
          important
          noteList {
            author {
              id
              name
            }
            date
            assignee {
              id
              name
            }
          }
        }
        ignore
      }
      togglePricingTermQC(id: 1) {
        id
        contractOrder
        appliedOrder
        name
        effectiveStartDate
        effectiveEndDate
        qc
        discountList {
          id
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
          note
        }
        pointOfSaleList
        pointOfOriginList
        airlineList
        note {
          important
          noteList {
            author {
              id
              name
            }
            date
            assignee {
              id
              name
            }
          }
        }
        ignore
      }
      deletePricingTerms(idList: [1, 2, 3])

      createDiscount(id: 1, name: "new discount", discountTypeId: 1, discountValue: 10.2, journeyTypeId: 3, directionTypeId: 1) {
        id
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
        note
      }
      copyDiscount(pricingTermId: 1, id: 1  name: "new discount", discountTypeId: 1, discountValue: 10.2, journeyTypeId: 3, directionTypeId: 1) {
        id
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
        note
      }
      editDiscount(pricingTermId: 1, id: 1  name: "edit discount", discountTypeId: 1, discountValue: 10.2, journeyTypeId: 3, directionTypeId: 1) {
        id
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
        note
      }
      deleteDiscounts(pricingTermId: 1, idList: [1, 2, 3])

      saveNote(pricingTermId: 1, important: true, message: "this is my first note", assigneeId: 2) {
        important
        noteList {
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
    }
    `
  }
};
