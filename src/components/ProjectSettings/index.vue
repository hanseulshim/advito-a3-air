<template>
  <div>
    <LocationCollections />
    <TravelSectorCollections />
    <AirlineGroupCollections />
  </div>
</template>

<script>
import LocationCollections from './LocationCollections';
import TravelSectorCollections from './TravelSectorCollections';
import AirlineGroupCollections from './AirlineGroupCollections';
export default {
  name: 'ProjectSettings',
  components: {
    LocationCollections,
    TravelSectorCollections,
    AirlineGroupCollections
  }
};
</script>
