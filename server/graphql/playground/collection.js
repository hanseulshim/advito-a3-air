exports.collection = {
  name: 'Collection Queries',
  endpoint: 'http://localhost:8085/graphql',
  headers: { sessiontoken: 'advitoValidToken' },
  query: `
  {
    locationCollectionList {
      id
      name
      description
      dateUpdated
      active
      regionList {
        name
        countryList
      }
    }
    travelSectorCollectionList {
      id
      name
      description
      dateUpdated
      active
      sectorList {
        id
        name
        shortName
        geographyList {
          origin
          destination
          exclude
        }
      }
    }
    airlineGroupCollectionList {
      id
      name
      description
      dateUpdated
      active
      airlineGroupList {
        id
        name
        effectiveStartDate
        effectiveEndDate
        airlineList {
          name
          effectiveStartDate
          effectiveEndDate
        }
      }
    }
  }`
};
