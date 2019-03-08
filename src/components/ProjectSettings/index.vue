<template>
  <div>
    <LocationCollections />
    <TravelSectorCollections />
    <AirlineGroupCollections />
    <PreferredAirlineCollections />
  </div>
</template>

<script>
import LocationCollections from './LocationCollections';
import TravelSectorCollections from './TravelSectorCollections';
import AirlineGroupCollections from './AirlineGroupCollections';
import PreferredAirlineCollections from './PreferredAirlineCollections';
export default {
  name: 'ProjectSettings',
  components: {
    LocationCollections,
    TravelSectorCollections,
    AirlineGroupCollections,
    PreferredAirlineCollections
  }
};
</script>
