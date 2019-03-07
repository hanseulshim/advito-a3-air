<template>
  <div>
    <LocationCollections />
    <TravelSectorCollections />
  </div>
</template>

<script>
import LocationCollections from './LocationCollections';
import TravelSectorCollections from './TravelSectorCollections';
export default {
  name: 'ProjectSettings',
  components: {
    LocationCollections,
    TravelSectorCollections
  }
};
</script>
