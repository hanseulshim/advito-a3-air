const LOCATION_COLLECTION = `id
        name
        description
        dateUpdated
        regionCount
        standard
        active
`;

const TRAVEL_SECTOR_COLLECTION = `id
        name
        description
        dateUpdated
        sectorCount
        standard
        active
        `;

const AIRLINE_GROUP_COLLECTION = `id
        name
        description
        dateUpdated
        effectiveStartDate
        effectiveEndDate
        active
        standard
        airlineGroupCount
`;

module.exports = {
  LOCATION_COLLECTION,
  TRAVEL_SECTOR_COLLECTION,
  AIRLINE_GROUP_COLLECTION
};
