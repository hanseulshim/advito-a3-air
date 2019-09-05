export const LOCATION_COLLECTION = `id
        name
        description
        dateUpdated
        regionCount
        standard
        active
`;

export const TRAVEL_SECTOR_COLLECTION = `id
        name
        description
        dateUpdated
        sectorCount
        standard
        active
        `;

export const AIRLINE_GROUP_COLLECTION = `id
        name
        description
        dateUpdated
        effectiveStartDate
        effectiveEndDate
        active
        standard
        airlineGroupCount
`;

export const PREFERRED_AIRLINE_COLLECTION = `id
        name
        description
        dateUpdated
        active
        airlineCount
        `;

export const PREFERRED_AIRLINE_LOOKUP = {
  PREFERENCE_LEVEL_TYPE: 15,
  PRIMARY: 88,
  SECONDARY: 89,
  TERTIARY: 90,
  NONE: 91
};
