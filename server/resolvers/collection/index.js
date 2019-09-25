import merge from 'lodash/merge';
import { locationCollection } from './locationCollection';
import { travelSectorCollection } from './travelSectorCollection';
import { airlineGroupCollection } from './airlineGroupCollection';
import { preferredAirlineCollection } from './preferredAirlineCollection';

export const collection = {
  ...merge(
    locationCollection,
    travelSectorCollection,
    airlineGroupCollection,
    preferredAirlineCollection
  )
};
