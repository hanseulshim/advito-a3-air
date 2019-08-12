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

const PREFERRED_AIRLINE_LOOKUP = {
  PREFERENCE_LEVEL_TYPE: 15,
  PRIMARY: 88,
  SECONDARY: 89,
  TERTIARY: 90,
  NONE: 91
};

module.exports = {
  LOCATION_COLLECTION,
  TRAVEL_SECTOR_COLLECTION,
  AIRLINE_GROUP_COLLECTION,
  PREFERRED_AIRLINE_COLLECTION,
  PREFERRED_AIRLINE_LOOKUP
};
