<template>
  <div>
    <LocationCollections />
    <TravelSectorCollections />
    <AirlineGroupCollections />
    <!-- <PreferredAirlineCollections @check-status="checkStatus" /> -->
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
import { UPDATE_PROJECT_STATUS } from '@/graphql/mutations';
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
    },
    checkStatus(status) {
      this.$apollo.mutate({
        mutation: UPDATE_PROJECT_STATUS,
        variables: {
          id: 1,
          status
        }
      });
    }
  }
};
</script>
