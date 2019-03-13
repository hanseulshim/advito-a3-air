<template>
  <div>
    <ErrorModal />
    <InfoModal />
    <SuccessModal />
  </div>
</template>

<script>
import ErrorModal from './ErrorModal';
import InfoModal from './InfoModal';
import SuccessModal from './SuccessModal';
export default {
  name: 'Modals',
  components: {
    ErrorModal,
    InfoModal,
    SuccessModal
  }
};
</script>
