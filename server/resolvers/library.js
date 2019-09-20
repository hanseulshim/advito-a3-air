import {
  LIBRARY_LOOKUP,
  LOCATION_LOOKUP,
  ADVITO_GEOSET_ID
} from '../constants';
import { Market, MarketCalculated } from '../models';
import { raw } from 'objection';
import merge from 'lodash/merge';
import sum from 'lodash/sum';
import sumBy from 'lodash/sumBy';
import numeral from 'numeral';

export const library = {
  Query: {
    airlineList: async (_, __, { db }) =>
      await db('carrier')
        .select({
          id: 'id',
          code: 'code',
          name: db.raw(`CONCAT(code, ' ', name)`)
        })
        .where('isdeleted', false)
        .orderBy('name'),
    airportList: async (_, __, { db }) =>
      await db('allstandardlocation')
        .select({
          id: 'airportid',
          countryName: 'countryname',
          cityCode: 'citycode',
          cityName: 'cityname',
          airportCode: 'airportcode',
          airportName: 'airportname'
        })
        .distinct('airportid')
        .orderBy('airportid'),
    bookingClassList: async (_, __, { db }) =>
      await db('bookingclass as b')
        .select({
          id: 'b.id',
          code: 'b.code',
          name: 'f.name',
          mappingCount: db.raw(
            `(SELECT COUNT(*) FROM bcexception WHERE bookingclassid = b.id)`
          )
        })
        .leftJoin('farecategory as f', 'b.farecategoryid', 'f.id'),
    airlineMappingList: async (_, { bookingClassId }, { db }) =>
      await db('bcexception as b')
        .select({
          id: 'b.id',
          code: 'c.code',
          name: 'c.name',
          ticketingDate: 'b.ticketstartdate',
          travelDate: 'b.travelstartdate',
          exceptionCount: db.raw(
            `(SELECT COUNT(*) FROM bcexceptionmember WHERE bcexceptionid = b.id)`
          )
        })
        .leftJoin('carrier as c', 'b.carrierid', 'c.id')
        .where('b.bookingclassid', bookingClassId),
    exceptionList: async (_, { exceptionId }, { db }) =>
      await db('bcexceptionmember as b')
        .select({
          id: 'b.id',
          order: 'b.iorder',
          originCode: db.raw(
            `CONCAT(l1.code, ' ', (SELECT location_gettypename(l1.locationtype)))`
          ),
          destinationCode: db.raw(
            `CONCAT(l2.code, ' ', (SELECT location_gettypename(l2.locationtype)))`
          ),
          overrideFareCategory: 'f.name'
        })
        .leftJoin('location as l1', 'l1.id', 'b.fromlocation')
        .leftJoin('location as l2', 'l2.id', 'b.tolocation')
        .leftJoin('farecategory as f', 'f.code', 'b.farecategorycode')
        .where('b.bcexceptionid', exceptionId)
        .orderBy('b.iorder'),
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
      await db('blops.currency')
        .select({
          id: 'id',
          name: db.raw(`(SELECT * FROM currency_getname(id))`),
          code: 'currency_code'
        })
        .orderBy('currency_code'),
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
        .orWhere(function() {
          this.where('locationtype', LOCATION_LOOKUP.SUBREGION).andWhere(
            'geosetid',
            ADVITO_GEOSET_ID
          );
        })
        .orWhere('locationtype', LOCATION_LOOKUP.COUNTRY)
        .orWhere('locationtype', LOCATION_LOOKUP.CITY)
        .orWhere('locationtype', LOCATION_LOOKUP.AIRPORT)
        .andWhere('isdeleted', false)
        .orderBy('code'),
    marketGeoList: async (_, __, { db }) =>
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
        .orderBy('code'),
    marketList: async (_, { clientGcn = null }) => {
      const marketList = await Market.query()
        .select(
          'odoriginmarket as originMarket',
          'oddestmarket as destMarket',
          'travelsector as marketSector',
          raw(`ARRAY_AGG(id)`).as('idList')
        )
        .where('deleted', false)
        .andWhere('clientgcn', clientGcn)
        .groupBy('odoriginmarket', 'oddestmarket', 'travelsector')
        .havingNotNull('odoriginmarket')
        .havingNotNull('oddestmarket');
      const marketCalcRequests = marketList.map((market, index) => {
        market.id = index;
        return MarketCalculated.query()
          .select('farepaidinusd as farePaidInUsd')
          .whereIn('id', market.idList);
      });
      const marketCalcResults = await Promise.all(marketCalcRequests);
      const marketCalculated = marketCalcResults.map((market, index) => ({
        id: index,
        farePaid: sum(
          market.map(({ farePaidInUsd }) => parseInt(farePaidInUsd))
        )
      }));
      merge(marketList, marketCalculated);
      const totalSum = sumBy(marketList, 'farePaid');
      return marketList.map(
        ({ originMarket, destMarket, farePaid, marketSector }) => ({
          marketNorm: `${originMarket} - ${destMarket} ${numeral(
            farePaid
          ).format('0,0')} (${numeral(farePaid / totalSum).format('0.00%')})`,
          marketScenario: `${originMarket} - ${destMarket}`,
          marketSector
        })
      );
    }
  }
};
