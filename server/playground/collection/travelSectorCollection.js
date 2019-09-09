export const travelSectorCollection = {
  name: 'Travel Sector Collection Mutations',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'MY^PR3TTYP0NY' },
  query: `
    mutation {
      createTravelSectorCollection(id: 1, name: "Collection 1", description: "description") {
        id
        name
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
        description
        dateUpdated
        active
      }
      editTravelSectorCollection(id: 2, name: "Updated Collection", description: "new description") {
        id
        name
        description
        dateUpdated
      }
      deleteLocationCollection(id: 2)
      addTravelSector(id: 1, name: "USMA", shortName: "US (USA)", geographyList: [
        {
          origin: 1,
          destination: 2,
          exclude: false
        }
      ]) {
        id
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
      }
      editTravelSector(id: 1, collectionId: 1, name: "USMA", shortName: "US (USA)", geographyList: [
        {
          origin: 1,
          destination: 2,
          exclude: false
        }
      ]) {
        id
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
      }
      deleteTravelSector(id: 1, collectionId: 1) {
        id
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
      }
      deleteBidirection(id: 1, collectionId: 1, index: 1) {
        id
        sectorList {
          id
          name
          shortName
          geographyList {
            origin {
              id
              name
            }
            destination {
              id
              name
            }
            exclude
          }
        }
      }
    }
    `
};
