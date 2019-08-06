const { airportList, bookingClassList } = require('../../data');
const {
  LIBRARY_LOOKUP,
  LOCATION_LOOKUP,
  ADVITO_GEOSET_ID
} = require('../constants');

exports.library = {
  Query: {
    airlineList: async (_, __, { db }) =>
      await db('carrier')
        .select({
          id: 'id',
          code: 'code',
          name: 'name'
        })
        .where('isdeleted', false)
        .orderBy('code'),
    airportList: () => airportList,
    bookingClassLibraryList: () => bookingClassList,
    countryList: async (_, __, { db }) =>
      await db('location')
        .select({
          id: 'id',
          name: db.raw(
            `CONCAT(code, ' [', (SELECT location_gettypename(locationtype)), '] ', name)`
          ),
          code: 'code',
          locationType: 'locationtype'
        })
        .orWhere('locationtype', LOCATION_LOOKUP.COUNTRY)
        .andWhere('isdeleted', false)
        .orderBy('code'),
    currencyList: async (_, __, { db }) =>
      await db('blops.currency as c')
        .select({
          id: 'id',
          name: 'c.currency_name',
          code: 'c.currency_code'
        })
        .orderBy('c.currency_code'),
    distanceUnitList: async (_, __, { db }) =>
      await db('lov_lookup')
        .select({
          id: 'id',
          name: 'name_val'
        })
        .where('type', LIBRARY_LOOKUP.DISTANCE_TYPE),
    geographyList: async (_, __, { db }) =>
      await db('location')
        .select({
          id: 'id',
          name: db.raw(
            `CONCAT(code, ' [', (SELECT location_gettypename(locationtype)), '] ', name)`
          ),
          code: 'code',
          locationType: 'locationtype'
        })
        .where(function() {
          this.where('locationtype', LOCATION_LOOKUP.REGION).andWhere(
            'geosetid',
            ADVITO_GEOSET_ID
          );
        })
        .orWhere('locationtype', LOCATION_LOOKUP.COUNTRY)
        .orWhere('locationtype', LOCATION_LOOKUP.CITY)
        .orWhere('locationtype', LOCATION_LOOKUP.AIRPORT)
        .andWhere('isdeleted', false)
        .orderBy('code'),
    marketList: async (_, __, { db }) =>
      await db('location')
        .select({
          id: 'id',
          name: db.raw(
            `CONCAT(code, ' [', (SELECT location_gettypename(locationtype)), '] ', name)`
          ),
          code: 'code',
          locationType: 'locationtype'
        })
        .orWhere('locationtype', LOCATION_LOOKUP.AIRPORT)
        .orWhere('locationtype', LOCATION_LOOKUP.CITY)
        .andWhere('isdeleted', false)
        .orderBy('code')
  }
};
