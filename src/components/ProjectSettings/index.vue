<template>
  <div>
    <div style="margin-bottom: 3em">
      <button
        style="margin-right: 1em"
        class="button"
        @click="toggleAirportListing"
      >
        Airport Listing
      </button>
      <button class="button" @click="toggleBookingClass">
        Booking Class Mappings
      </button>
    </div>
    <LocationCollections />
    <TravelSectorCollections />
    <AirlineGroupCollections />
    <PreferredAirlineCollections />
    <AirportListingModal />
    <BookingClassModal />
  </div>
</template>

<script>
import LocationCollections from './LocationCollections';
import TravelSectorCollections from './TravelSectorCollections';
import AirlineGroupCollections from './AirlineGroupCollections';
import PreferredAirlineCollections from './PreferredAirlineCollections';
import AirportListingModal from '@/components/Library/AirportListingModal';
import BookingClassModal from '@/components/Library/BookingClassModal';
export default {
  name: 'ProjectSettings',
  components: {
    LocationCollections,
    TravelSectorCollections,
    AirlineGroupCollections,
    PreferredAirlineCollections,
    AirportListingModal,
    BookingClassModal
  },
  methods: {
    toggleAirportListing() {
      this.$modal.show('airport-listing');
    },
    toggleBookingClass() {
      this.$modal.show('booking-class');
    }
  }
};
</script>
