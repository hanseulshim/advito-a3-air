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

const PREFERRED_AIRLINE_COLLECTION = `id
        name
        description
        dateUpdated
        active
        airlineCount
        `;

module.exports = {
  LOCATION_COLLECTION,
  TRAVEL_SECTOR_COLLECTION,
  AIRLINE_GROUP_COLLECTION,
  PREFERRED_AIRLINE_COLLECTION
};
