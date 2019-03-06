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
  }`
};
